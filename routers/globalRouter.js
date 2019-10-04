import express from 'express';
import routes from '../routes';
import { videoHome, searchVideos } from '../controllers/videoController';
import { join, login, logout } from '../controllers/userController';

const globalRouter = express.Router()

globalRouter.get(routes.home, videoHome);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, searchVideos);

export default globalRouter;
