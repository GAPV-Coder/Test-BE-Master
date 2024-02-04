import AppError from '../helpers/appError.js';
import UserModel from '../models/user.model.js';

export const getUsersServices = async (loggedInUserId) => {
    try {
        const loggedInUser = await UserModel.findById(loggedInUserId);

        if (
            !loggedInUser ||
            loggedInUser.role !== 'admin' &&
            loggedInUser.role !== 'user'
        ) {
            throw new AppError(
                'Permission denied. You do not have access to this resource',
                403,
            );
        }

        const users = await UserModel.find({ isActive: true }).select('-password');

        return users;
    } catch (error) {
        throw new AppError(`Error getting users: ${error.message}`, 500);
    }
};

export const getUserByIdServices = async (loggedInUserId, userId) => {
    try {
        const loggedInUser = await UserModel.findById(loggedInUserId);

        if (!loggedInUser || loggedInUser.role !== 'admin') {
            throw new AppError(
                'Permission denied. You do not have access to this resource',
                403,
            );
        }

        const user = await UserModel.findById(userId).select('-password');

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    } catch (error) {
        throw new AppError(`Error getting user by ID: ${error.message}`, 500);
    }
};

export const updateUserServices = async (loggedInUserId, userId, data) => {
    try {
        const loggedInUser = await UserModel.findById(loggedInUserId);

        if (
            !loggedInUser ||
            (loggedInUser.role !== 'admin' &&
                loggedInUser._id.toString() !== userId)
        ) {
            throw new AppError(
                'Permission denied. You do not have access to this resource',
                403,
            );
        }

        const user = await UserModel.findByIdAndUpdate(userId, data, {
            new: true,
        }).select('-password');

        if (!user) {
            throw new AppError('User not found', 500);
        }

        return user;
    } catch (error) {
        throw new AppError(`Error updating user: ${error.message}`, 500);
    }
};

export const deleteUserServices = async (loggedInUserId, userId) => {
    try {
        const loggedInUser = await UserModel.findById(loggedInUserId);

        if (
            !loggedInUser ||
            (loggedInUser.role !== 'admin' &&
                loggedInUser._id.toString() !== userId)
        ) {
            throw new AppError(
                'Permission denied. You do not have access to this resource',
                403,
            );
        }

        const user = await UserModel.findByIdAndUpdate(
            userId,
            { isActive: false },
            { new: true },
        );

        if (!user) {
            throw new AppError('User not found', 500);
        }

        return user;
    } catch (error) {
        throw new AppError(`Error deleting user: ${error.message}`, 500);
    }
};
