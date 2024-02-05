import express from 'express';
import { isAuth } from '../middlewares/auth.middleware.js';
import {
    createVideoControllers,
    deleteVideosControllers,
    getTopRankingVideosControllers,
    getVideosByUserIdControllers,
    getVideosControllers,
    updateVideosControllers,
    commentVideoControllers,
    likeVideosControllers
} from '../controllers/videos.controllers.js';
import { validateFieldsVideo } from '../middlewares/validations.middleware.js';

const router = express.Router();

router.use(isAuth);

router.post('/create', validateFieldsVideo, createVideoControllers);

router.get('/get-videos', getVideosControllers);

router.get('/videos-by-user', getVideosByUserIdControllers);

router.get('/top-ranking-videos', getTopRankingVideosControllers);

router.patch('/update/:videoId', validateFieldsVideo, updateVideosControllers);

router.delete('/delete/:videoId', deleteVideosControllers);

router.post('/:videoId/comment', commentVideoControllers);

router.post('/:videoId/like', likeVideosControllers);

export default router;
