import express from 'express';
import * as telpCore from '../lib.js';

const userRouter = express.Router();

/**
 * app.use('/user/api/v1', userRouter);
 */

userRouter.get('/data/random', telpCore.getRandomArt);
userRouter.get('/data/image/random', telpCore.getRandomArtImage);
userRouter.get('/data/:id', telpCore.getArtObjectByID);
userRouter.get('/data/image/:id', telpCore.getImageByID);
userRouter.get('/data/image/s/:id', telpCore.streamArtImage);
userRouter.get('/data/collection/:artObjectNumber', telpCore.getArtDetails);

// process login data from client express
userRouter.post('/login', telpCore.loginUser);

export { userRouter };
