import http from "node:http";
import express from "express";
import logger from "pino";
import axios from "axios";
import { config } from "./config.js";

const telpLog = logger();
const app = express();

const SRV_PORT = config.app.port;
const USERSET_URL = config.sources.rijksmuseum.usersets[0].url;

app.use((req, res, next) => {
  telpLog.info(`request: ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("root");
});

app.get("/admin/api/data", (req, res) => {
  axios({
    method: "get",
    url: USERSET_URL,
    responseType: "json",
  }).then((response) => {
    const dataUser = response.data;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dataUser));
  });
});

app.use((req, res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  const errorObj = { code: 404, error: "route not found" };
  telpLog.error(errorObj);
  res.end(JSON.stringify(errorObj));
});

http
  .createServer(app)
  .listen(SRV_PORT, () => telpLog.info(`server_port:${SRV_PORT}`));

export { app as telpServer };
