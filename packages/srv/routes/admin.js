import express from 'express';
import * as telpCore from '../lib.js';

const adminRouter = express.Router();

/**
 * app.use('/admin/api/v1', adminRouter);
 */
adminRouter.get('/data', telpCore.isLoggedIn, telpCore.getAPIData);
adminRouter.get(
    '/data/delete/:id',
    telpCore.isLoggedIn,
    telpCore.deleteArtObjectByID
);

export { adminRouter };
