import * as dotenv from "dotenv";

dotenv.config();

const telpConfig = {
  app: {
    port: process.env.TELP_PORT || 3003,
  },
};

export { telpConfig as config };
