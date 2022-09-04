import http from "node:http";
import express from "express";

const app = express();
const PORT = 3003;

app.use((req, res) => {
  console.log(`request: ${req.url}`);
  res.end(`${process.versions?.node}`);
});

http.createServer(app).listen(PORT, () => console.log(`srv ok port: ${PORT}`));
