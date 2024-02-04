import jwt from 'jsonwebtoken';
import config from '../config.js';

const generateToken = (user) => {
    if (!user.user_id || !user.email) {
        throw new Error(
            'The user object must contain a user id and an email to generate a token.',
        );
    }

    const payload = {
        id: user.user_id,
        email: user.email,
    };

    const token = jwt.sign(payload, config.jwtSecretKey, { expiresIn: config.expirationToken });

    return token;
};

const verifyToken = (token) => {
    if (!token) {
        throw new Error('Token not provided in Authorization header')
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecretKey);

        if (decoded.user_id && decoded.email) {
            return true;
        } else {
            throw new Error('Invalid token: missing required information.');
        }
    } catch (error) {
        throw new Error('Invalid token.');
    }
};

export default { generateToken, verifyToken };