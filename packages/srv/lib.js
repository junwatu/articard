import axios from 'axios';
import redis from 'redis';
import mongoose from 'mongoose';
import fs from 'node:fs/promises';
import * as stream from 'node:stream';
import { promisify } from 'node:util';

import { config } from './config.js';
import { telpLog } from './log.js';
import { ArtObjectSchema } from './schema.js';

let redisClient;

const db = await connectTelpDatabase();
const bucket = initBucket(db.connections[0].db);

(async () => {
    redisClient = await redis.createClient();
    redisClient.on('error', (error) => telpLog.error(error));
    redisClient.on('connect', () => telpLog.info('redis cache ok'));
    await redisClient.connect();
})();

const USERSET_URL = config.sources.rijksmuseum.usersets[0].url;
const ARTCOLLDETAILS_URL = config.sources.rijksmuseum.collectionDetails.base;
const APP_KEY = config.app.key;

const ArtObject = mongoose.model('artobject', ArtObjectSchema);

async function connectTelpDatabase() {
    try {
        const mongodbConn = await mongoose.connect(config.database.url);
        return mongodbConn;
    } catch (error) {
        telpLog.error(error);
    }
}

function initBucket(db) {
    const bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'artobject',
    });
    return bucket;
}

function saveData(data) {
    const arrayArtObjects = data?.userSet?.setItems;

    arrayArtObjects.map((item) => {
        const artObject = new ArtObject(item);
        artObject.save();
    });
}

async function getRandomData() {
    //get random data from mongodb collection
    const count = await ArtObject.countDocuments();
    const random = Math.floor(Math.random() * count);
    const artObject = await ArtObject.findOne().skip(random);
    return artObject;
}

async function getDataByID(artObjectNumber) {
    const yourData = await ArtObject.find({ objectNumber: artObjectNumber });
    return yourData;
}

async function getRandomArtImage(req, res) {
    const rData = await getRandomData();
    const artObjectNumber = rData.objectNumber;

    //const yourData = await getDataByID(artObjectNumber);
    const artDataDetails = await getArtDetailsByID(artObjectNumber);

    res.setHeader('Content-Type', 'application/json');
    res.end(artDataDetails);
}

async function getArtDetailsByID(artObjectNumber) {
    const artDetailsURL = `${ARTCOLLDETAILS_URL}/${artObjectNumber}?key=${APP_KEY}`;
    const artDetailsDataCached = await redisClient.get(artObjectNumber);
    if (artDetailsDataCached) {
        telpLog.info('art details from cache');
        return artDetailsDataCached;
    } else {
        try {
            const response = await axios({
                method: 'get',
                url: artDetailsURL,
                responseType: 'json',
            });

            telpLog.info('art details from server');

            const cachedImageUrlData = await saveArtImageToDB(
                artObjectNumber,
                response.data.artObject.webImage.url
            );

            /**
             * create cached url for image
             */
            response.data.artObject.webImage.cachedImageUrl =
                cachedImageUrlData;

            redisClient.set(artObjectNumber, JSON.stringify(response.data));
            return JSON.stringify(response.data);
        } catch (error) {
            telpLog.error(error);
        }
    }
}

/**
 * Save image to database
 * @param {*} imageURL
 * @returns
 */

async function saveArtImageToDB(artObjectNumber, imageURL) {
    const finishedDownload = promisify(stream.finished);

    const imageBin = await axios({
        method: 'get',
        url: imageURL,
        responseType: 'stream',
    });

    /**
     * distributed worker?
     */
    const writer = bucket.openUploadStream(artObjectNumber, {
        chunkSizeBytes: 1048576,
        metadata: { field: artObjectNumber, value: Date.now() },
    });

    imageBin.data.pipe(writer);
    await finishedDownload(writer);

    /**
     * Should get URL from env.dev or env production
     */
    const imageCacheURL = `${config.cache.image}${artObjectNumber}`;
    return imageCacheURL;
}

function readArtImageFromDB(req, res) {
    const artObjectId = req.params.id;

    try {
        const readStream = bucket.openDownloadStreamByName(artObjectId);
        readStream.pipe(res);

        readStream.on('error', (error) => {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(
                    JSON.stringify({
                        api: 'TELP API',
                        error: 'Image not found',
                    })
                );
            } else {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ api: 'TELP API', error: 'Error' }));
            }
        });
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ api: `TELP API`, error: 'Image not found' }));
    }
}

async function getArtObjectByID(req, res) {
    telpLog.info(req.params.id);
    res.statusCode = 200;

    const yourData = await getDataByID(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(yourData));
}

async function getArtImage(artObjectId) {
    const artData = await getDataByID(artObjectId);
    return artData[0]?.image?.cdnUrl;
}

async function getArtDetails(req, res) {
    const artObjectNumber = req.params.artObjectNumber;
    const artDetailsURL = `${ARTCOLLDETAILS_URL}/${artObjectNumber}?key=${APP_KEY}`;

    const artDetailsDataCached = await redisClient.get(artObjectNumber);
    if (artDetailsDataCached) {
        telpLog.info('Data from cache');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(artDetailsDataCached);
    } else {
        await axios({
            method: 'get',
            url: artDetailsURL,
            responseType: 'json',
        }).then((response) => {
            redisClient.set(artObjectNumber, JSON.stringify(response.data));
            telpLog.info('Data from server');

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response.data));
        });
    }
}

async function getImageByID(req, res) {
    const imageUrl = await getArtImage(req.params.id);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<img src="${imageUrl}" width="50%"/>`);
}

async function deleteArtObjectByID(req, res) {
    const isDeleted = await deleteArtObject(req.params.id);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(isDeleted));
}

async function getRandomArt(req, res) {
    const rData = await getRandomData();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(rData));
}

const isLoggedIn = async (req, res, next) => {
    if (req.headers.authorization) {
        let auth = req.headers.authorization.split(' ');
        if (auth[0] === 'Basic') {
            let decode = new Buffer.from(auth[1], 'base64').toString('utf-8');
            let sep = decode.indexOf(':');

            const authFlag = await authUser(
                decode.substr(0, sep),
                decode.substr(sep + 1)
            );

            if (authFlag) {
                next();
            } else {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ api: 'Invalid Authorization' }));
            }
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Unknown Authentication');
        }
    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify({ api: 'You need authorization to access this API' })
        );
    }
};

async function authUser(username, password) {
    const data = await fs.readFile('secret.json', { encoding: 'utf-8' });
    let datar = JSON.parse(data).users;
    for (const iterator of datar) {
        if (
            iterator?.username === username &&
            iterator?.password === password
        ) {
            return true;
        } else {
            return false;
        }
    }
}

// Admin API
async function getAPIData(req, res) {
    try {
        const dataCached = await redisClient.get('telpAPIDataCached');
        if (dataCached) {
            telpLog.info('Data from cache');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(dataCached);
        } else {
            await axios({
                method: 'get',
                url: USERSET_URL,
                responseType: 'json',
            }).then((response) => {
                const dataArtObject = response.data;
                redisClient.set(
                    'telpAPIDataCached',
                    JSON.stringify(dataArtObject)
                );
                telpLog.info('Data from server');
                res.writeHead(200, { 'Content-Type': 'application/json' });

                saveData(dataArtObject);

                res.end(JSON.stringify(dataArtObject));
            });
        }
    } catch (error) {
        telpLog.error(error);
        res.status(404).send('Data Unavailable');
    }
}

async function deleteArtObject(artObjectNumber) {
    const isDeleted = await ArtObject.deleteOne({
        objectNumber: artObjectNumber,
    });
    return isDeleted;
}

export {
    initBucket,
    getRandomArt,
    deleteArtObject,
    getAPIData,
    getDataByID,
    getArtImage,
    ArtObject,
    getRandomData,
    getArtDetails,
    getImageByID,
    getArtObjectByID,
    getRandomArtImage,
    readArtImageFromDB as streamArtImage,
    deleteArtObjectByID,
    connectTelpDatabase as connTelpDB,
    isLoggedIn,
};
