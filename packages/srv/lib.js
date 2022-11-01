import axios from 'axios';
import redis from 'redis';
import mongoose from 'mongoose';

import { config } from './config.js';
import { telpLog } from './log.js';
import { ArtObjectSchema } from './schema.js';

let redisClient;

(async () => {
    redisClient = await redis.createClient();
    redisClient.on('error', (error) => telpLog.error(error));
    redisClient.on('connect', () => telpLog.info('redis cache ok'));
    await redisClient.connect();
})();

const USERSET_URL = config.sources.rijksmuseum.usersets[0].url;
const ArtObject = mongoose.model('artobject', ArtObjectSchema);

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

async function connectTelpDatabase() {
    await mongoose.connect(config.database.url);
}

function saveData(data) {
    const arrayArtObjects = data?.userSet?.setItems;

    arrayArtObjects.map((item) => {
        const artObject = new ArtObject(item);
        artObject.save();
    });
}

async function getRandomData() {
    return await ArtObject.findOne();
}

async function getDataByID(artObjectId) {
    const yourData = await ArtObject.find({ id: artObjectId });
    return yourData;
}

async function getArtImage(artObjectId) {
    const artData = await getDataByID(artObjectId);
    return artData[0]?.image?.cdnUrl;
}

async function deleteArtObject(artObjectId) {
    const isDeleted = await ArtObject.deleteOne({ id: artObjectId });
    return isDeleted;
}

export {
    deleteArtObject,
    getAPIData,
    getDataByID,
    getArtImage,
    ArtObject,
    getRandomData,
    connectTelpDatabase as connTelpDB,
};
