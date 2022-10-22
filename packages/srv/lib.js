import axios from "axios";
import { config } from "./config.js";

const USERSET_URL = config.sources.rijksmuseum.usersets[0].url;

async function getAPIData(req, res) {
    await axios({
        method: "get",
        url: USERSET_URL,
        responseType: "json",
    }).then((response) => {
        const dataUser = response.data;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(dataUser));
    });
}

export { getAPIData }