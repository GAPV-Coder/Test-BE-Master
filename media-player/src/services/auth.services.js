import AppError from '../helpers/appError.js';
import bcryptHelper from '../helpers/bcrypt.js';
import jwtHelper from '../helpers/jwt.js';
import UserModel from '../models/user.model.js';

export const registerUserServices = async (
    full_name,
    nickname,
    email,
    password,
    isActive,
    role,
) => {
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new AppError('User with this email already exist', 400);
        }

        const hashedPassword = await bcryptHelper.encryptPassword(password);

        const newUser = await UserModel.create({
            full_name,
            nickname,
            email,
            password: hashedPassword,
            isActive,
            role,
        });

        const token = jwtHelper.generateToken({
            id: newUser.id,
            email: newUser.email,
        });

        return {
            user: { ...newUser._doc, password: undefined },
            token,
        };
    } catch (error) {
        throw new AppError(
            `Error registering user: ${error.message}`,
            500,
            error,
        );
    }
};

export const loginUserServices = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new AppError('Email not found', 404);
        }

        const isMatch = await bcryptHelper.comparePassword(password, user.password);
        if (!isMatch) {
            throw new AppError('Password is incorrect', 400);
        }

        const token = jwtHelper.generateToken({
            id: user.id,
            email: user.email,
        });

        return { user: { _id: user.id, email: user.email }, token };
    } catch (error) {
        throw new AppError(`Login failed ${error.message}`, 403);
    }
};
