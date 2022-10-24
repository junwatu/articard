import axios from "axios";
import redis from "redis";
import { config } from "./config.js";
import { telpLog } from "./log.js";

const USERSET_URL = config.sources.rijksmuseum.usersets[0].url;

let redisClient

(async () => {
    redisClient = await redis.createClient()
    redisClient.on("error", (error) => telpLog.error(error))
    await redisClient.connect()
})()

async function getAPIData(req, res) {
    try {
        const dataCached = await redisClient.get("telpAPIDataCached")
        if (dataCached) {
            telpLog.info("Data from cache")
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(dataCached);
        } else {
            await axios({
                method: "get",
                url: USERSET_URL,
                responseType: "json",
            }).then((response) => {
                const dataUser = response.data;
                redisClient.set("telpAPIDataCached", JSON.stringify(dataUser))
                telpLog.info("Data from server")
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(dataUser));
            });
        }
    } catch (error) {
        telpLog.error(error)
        res.status(404).send("Data Unavailable")
    }
}

export { getAPIData }
