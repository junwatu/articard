/**
 * TELP Server
 * Author By Equan P. (@junwatu)
 * 2022
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
import { errorResponse, runNote, staticRoot } from './utils/srv.js';

const app = express();
const SRV_PORT = config.app.port;

app.use(cors());
app.use(express.static(path.join(__dirname, '../publik')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    telpLog.info(`request: ${req.url}`);
    next();
});

app.get('/', staticRoot);

app.use('/user/api/v1', telpAPIReqLimit);
app.use('/user/api/v1', userRouter);
app.use('/admin/api/v1', adminRouter);

app.use(errorResponse);
http.createServer(app).listen(SRV_PORT, runNote(SRV_PORT));

export { app as telpServer };
