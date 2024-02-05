import express from 'express';
import {
    loginUserController,
    registerUserController,
} from '../controllers/auth.controllers.js';
import {
    validateLoginUser,
    validateRegisterUser,
} from '../middlewares/validations.middleware.js';

const router = express.Router();

router.post('/register', validateRegisterUser, registerUserController);

router.post('/login', validateLoginUser, loginUserController);

export default router;
