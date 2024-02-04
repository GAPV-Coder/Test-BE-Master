import AppError from '../helpers/appError.js';
import jwtHelper from '../helpers/jwt.js';
import config from '../config.js';
import UserModel from '../models/user.model.js';

export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError('Authentication failed. Token not provided.', 401)
        }

        const decoded = jwtHelper.verifyToken(token, config.jwtSecretKey);

        const user = UserModel.findById(decoded.user_id);

        if (!user) {
            throw new AppError('User not found', 404)
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const restrictTo = async (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                throw new AppError('Permission denied. You do not have access to this resource.', 403);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};