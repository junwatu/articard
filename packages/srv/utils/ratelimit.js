import rateLimit from 'express-rate-limit';
import { telpLog } from '../log.js';

const telpAPIReqLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: '100 API request every 15 minute only!',
    handler: (req, res, next, options) => {
        telpLog.info(options.message);
        res.status(options.statusCode).send(options.message);
    },
});

export { telpAPIReqLimit };
