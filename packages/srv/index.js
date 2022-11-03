/**
 * TELP Server
 */

import http from 'node:http';
import express from 'express';
import bodyParser from 'body-parser';
import { config } from './config.js';
import * as telpCore from './lib.js';
import { telpLog } from './log.js';

const app = express();
const SRV_PORT = config.app.port

telpCore
    .connTelpDB()
    .then(() => telpLog.info(`mongodb database ok`))
    .catch((err) => telpLog.error(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    telpLog.info(`request: ${req.url}`);
    next();
});

app.get('/', telpCore.getRandomArt);
app.get('/api/data/:id', telpCore.getArtObjectByID);
app.get('/api/data/image/:id', telpCore.getImageByID);
app.get('/api/data/collection/:artObjectNumber', telpCore.getArtDetails);

/**
 * Admin API
 */
app.get('/admin/api/data', telpCore.getAPIData);
app.get('/admin/api/data/delete/:id', telpCore.deleteArtObjectByID);

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
