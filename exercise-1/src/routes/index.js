import { Router } from 'express';
import popularReposRoutes from './connectAPI.routes.js';


const routerApi = Router();

routerApi.use('/most-popular-repos', popularReposRoutes);

export default routerApi;