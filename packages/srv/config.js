import * as dotenv from "dotenv";

dotenv.config();

const telpConfig = {
  app: {
    port: process.env.TELP_PORT || 3003,
  },
  sources: {
    rijksmuseum: {
      user: process.env.TELP_RIJKSMUSEUM_USER_ID,
      key: process.env.TELP_RIJKSMUSEUM_API_KEY,
      usersets: [
        {
          base: process.env.TELP_RIJKSMUSEUM_BASE_USERSETS_URL,
          name: process.env.TELP_RIJKSMUSEUM_USERSET_NAME,
          url: `${process.env.TELP_RIJKSMUSEUM_BASE_USERSETS_URL}/${process.env.TELP_RIJKSMUSEUM_USER_ID}-${process.env.TELP_RIJKSMUSEUM_USERSET_NAME}?key=${process.env.TELP_RIJKSMUSEUM_API_KEY}&format=json`,
        },
      ],
    },
  },
};

export { telpConfig as config };
