/**
 * TELP Server
 */

import http from 'node:http';
import express from 'express';
import bodyParser from 'body-parser';

import { config } from './config.js';
import {
    getAPIData,
    getRandomData,
    getArtDetails,
    connTelpDB,
    getImageByID,
    deleteArtObjectByID,
    getArtObjectByID,
    getRandomArt,
} from './lib.js';
import { telpLog } from './log.js';

connTelpDB()
    .then(() => telpLog.info(`mongodb database ok`))
    .catch((err) => telpLog.error(err));

const app = express();
const SRV_PORT = config.app.port;

app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    telpLog.info(`request: ${req.url}`);
    next();
});

app.get('/', getRandomArt);
app.get('/api/data/:id', getArtObjectByID);
app.get('/api/data/image/:id', getImageByID);
app.get('/api/data/collection/:artObjectNumber', getArtDetails);

/**
 * Admin API
 */
app.get('/admin/api/data', getAPIData);
app.get('/admin/api/data/delete/:id', deleteArtObjectByID);

/** 🔒🛅🔑 */

app.use((req, res) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    const errorObj = { code: 404, error: 'route not found' };
    telpLog.error(errorObj);
    res.end(JSON.stringify(errorObj));
});

http.createServer(app).listen(SRV_PORT, () =>
    telpLog.info(`server port: ${SRV_PORT}`)
);

export { app as telpServer };
