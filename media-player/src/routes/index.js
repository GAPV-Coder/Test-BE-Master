import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import videosRoutes from './videos.routes.js';


const routerApi = Router();

routerApi.use('/auth', authRoutes);

routerApi.use('/user', userRoutes);

routerApi.use('/videos', videosRoutes);

export default routerApi;