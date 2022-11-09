/**
 * TELP Server
 */

import http from 'node:http';
import express from 'express';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

import { config } from './config.js';
import * as telpCore from './lib.js';
import { telpLog } from './log.js';

const telpAPIReqLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: '100 API request every 15 minute only!',
    handler: (req, res, next, options) => {
        telpLog.info(options.message);
        res.status(options.statusCode).send(options.message);
    },
});

const app = express();
const SRV_PORT = config.app.port;

telpCore
    .connTelpDB()
    .then(() => telpLog.info(`mongodb database ok`))
    .catch((err) => telpLog.error(err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    telpLog.info(`request: ${req.url}`);
    next();
});

/**
 * Admin API
 */
app.get('/admin/api/data', telpCore.isLoggedIn, telpCore.getAPIData);
app.get(
    '/admin/api/data/delete/:id',
    telpCore.isLoggedIn,
    telpCore.deleteArtObjectByID
);

// User API
app.get('/', telpCore.getRandomArt);
app.use('/api/data', telpAPIReqLimit);
app.get('/api/data/:id', telpCore.getArtObjectByID);
app.get('/api/data/image/:id', telpCore.getImageByID);
app.get('/api/data/collection/:artObjectNumber', telpCore.getArtDetails);

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
