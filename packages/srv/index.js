import http from "node:http";
import express from "express";

import { config } from "./config.js";
import { getAPIData, connTelpDB } from "./lib.js"
import { telpLog } from "./log.js"

connTelpDB()
  .then(() => telpLog.info(`mongodb database ok`))
  .catch(err => telpLog.error(err))

const app = express();

const SRV_PORT = config.app.port;

app.use((req, res, next) => {
  telpLog.info(`request: ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("TELP");
});

app.get("/admin/api/data", getAPIData);

app.use((req, res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  const errorObj = { code: 404, error: "route not found" };
  telpLog.error(errorObj);
  res.end(JSON.stringify(errorObj));
});

http
  .createServer(app)
  .listen(SRV_PORT, () => telpLog.info(`server port: ${SRV_PORT}`));

export { app as telpServer };
