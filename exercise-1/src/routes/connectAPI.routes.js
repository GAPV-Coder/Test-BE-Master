import express from 'express';
import { getMostPopularReposController } from '../controllers/connectAPI.controllers.js';

const router = express.Router();

router.get('/:username', getMostPopularReposController);

export default router;
