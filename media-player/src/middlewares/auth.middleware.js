import AppError from '../helpers/appError.js';
import jwtHelper from '../helpers/jwt.js';
import config from '../config.js';
import UserModel from '../models/user.model.js';

const { jwtSecretKey } = config;

export const isAuth = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new AppError(
                'Authentication failed. Token not provided.',
                401,
            );
        }

        const decoded = jwtHelper.verifyToken(token, jwtSecretKey);

        if (!decoded) {
            throw new AppError('Invalid token.', 401);
        }

        const user = await UserModel.findOne(decoded.id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                console.log('REQ.USER.ROLE', req.user.role);
                throw new AppError(
                    'Permission denied. You do not have access to this resource.',
                    403,
                );
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
