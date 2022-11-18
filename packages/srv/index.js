/**
 * TELP Server
 */
import http from 'node:http';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'node:path';
import cors from 'cors';

import { __dirname } from './utils/fs.js';
import { config } from './config.js';
import { telpLog } from './log.js';
import { userRouter } from './routes/user.js';
import { adminRouter } from './routes/admin.js';
import { telpAPIReqLimit } from './utils/ratelimit.js';

const app = express();
const SRV_PORT = config.app.port;

app.use(cors());
app.use(express.static(path.join(__dirname, '../publik')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    telpLog.info(`request: ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/publik/index.html'));
});
app.use('/user/api/v1', telpAPIReqLimit);
app.use('/user/api/v1', userRouter);
app.use('/admin/api/v1', adminRouter);

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
