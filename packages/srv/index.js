import http from "node:http";
import express from "express";
import * as dotenv from "dotenv";
import logger from "pino";

dotenv.config();

const telpLog = logger();
const app = express();
const SRV_PORT = process.env.TELP_PORT || 3003;

app.use((req, res, next) => {
  telpLog.info(`request: ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("root");
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
