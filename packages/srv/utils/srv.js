import { telpLog } from '../log.js';
import path from 'node:path';
import { __dirname } from './fs.js';

function staticRoot(req, res) {
    res.sendFile(path.join(__dirname, '/publik/index.html'));
}

function errorResponse(req, res) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    const errorObj = { code: 404, error: 'route not found' };
    telpLog.error(errorObj);
    res.end(JSON.stringify(errorObj));
}

function runNote(SRV_PORT) {
    telpLog.info(`server port: ${SRV_PORT}`);
}

export { errorResponse, runNote, staticRoot };
