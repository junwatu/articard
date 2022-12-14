import * as dotenv from 'dotenv';

dotenv.config();

const telpConfig = {
    app: {
        port: process.env.TELP_PORT || 3003,
        key: process.env.TELP_RIJKSMUSEUM_API_KEY,
    },
    database: {
        url: process.env.TELP_DATABASE_URL,
    },
    cache: {
        url: process.env.TELP_REDIS_URL,
        image: `${process.env.TELP_HOST}/user/api/v1/data/image/s/`,
    },
    sources: {
        rijksmuseum: {
            user: process.env.TELP_RIJKSMUSEUM_USER_ID,
            key: process.env.TELP_RIJKSMUSEUM_API_KEY,
            collection: {
                base: process.env.TELP_RIJKSMUSEUM_BASE_COLLECTION_URL,
            },
            usersets: [
                {
                    base: process.env.TELP_RIJKSMUSEUM_BASE_USERSETS_URL,
                    name: process.env.TELP_RIJKSMUSEUM_USERSET_NAME,
                    url: `${process.env.TELP_RIJKSMUSEUM_BASE_USERSETS_URL}/${process.env.TELP_RIJKSMUSEUM_USER_ID}-${process.env.TELP_RIJKSMUSEUM_USERSET_NAME}?key=${process.env.TELP_RIJKSMUSEUM_API_KEY}&format=json&pageSize=100`,
                },
            ],
            collectionDetails: {
                base: process.env.TELP_RIJKSMUSEUM_BASE_COLLECTION_URL,
            },
        },
    },
};

export { telpConfig as config };
