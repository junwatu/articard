import http from "node:http";
import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const SRV_PORT = process.env.TELP_PORT || 3003;

app.use((req, res) => {
  console.log(`request: ${req.url}`);
  res.end(`${process.versions?.node}`);
});

http
  .createServer(app)
  .listen(SRV_PORT, () => console.log(`srv ok port: ${SRV_PORT}`));
