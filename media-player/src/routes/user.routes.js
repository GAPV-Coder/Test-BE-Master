import express from 'express';
import { isAuth, restrictTo } from '../middlewares/auth.middleware.js';
import {
    deleteUserControllers,
    getUserByIdControllers,
    getUsersControllers,
    updateUserControllers,
} from '../controllers/user.controllers.js';

const router = express.Router();

router.use(isAuth);

router.get('/get-users', restrictTo('admin'), getUsersControllers);

router.get('/:userId', restrictTo('admin'), getUserByIdControllers);

router.patch('/:userId', restrictTo('admin', 'user'), updateUserControllers);

router.delete('/:userId', restrictTo('admin'), deleteUserControllers);

export default router;
