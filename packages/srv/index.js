import http from "node:http";
import express from "express";
import bodyParser from "body-parser";

import { config } from "./config.js";
import { getAPIData, getRandomData, getDataByID, getArtImage, deleteArtObject, connTelpDB } from "./lib.js"
import { telpLog } from "./log.js"

connTelpDB()
  .then(() => telpLog.info(`mongodb database ok`))
  .catch(err => telpLog.error(err))

const app = express();

const SRV_PORT = config.app.port;

app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  telpLog.info(`request: ${req.url}`);
  next();
});

app.get("/", async (req, res) => {
  const rData = await getRandomData()
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(rData));
});

app.get("/api/data/:id", async (req, res) => {
  telpLog.info(req.params.id)
  res.statusCode = 200;

  const yourData = await getDataByID(req.params.id)
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(yourData));
})

app.get("/api/data/image/:id", async (req, res) => {
  const imageUrl = await getArtImage(req.params.id)
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`<img src="${imageUrl}" width="50%"/>`);
})


// admin
app.get("/admin/api/data/delete/:id", async (req, res) => {
  const isDeleted = await deleteArtObject(req.params.id)
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(isDeleted);
})

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
