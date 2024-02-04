import jwt from 'jsonwebtoken';
import config from '../config.js';

const { expirationToken, jwtSecretKey } = config;

const generateToken = (user) => {
    if (!user.id || !user.email) {
        throw new Error(
            'The user object must contain a user id and an email to generate a token.',
        );
    }

    const payload = {
        id: user.id,
        email: user.email,
    };

    const token = jwt.sign(payload, jwtSecretKey, { expiresIn: expirationToken });

    return token;
};

const verifyToken = (token) => {
    if (!token) {
        throw new Error('Token not provided in Authorization header')
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey);

        if (decoded.id && decoded.email) {
            return true;
        } else {
            throw new Error('Invalid token: missing required information.');
        }
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return undefined;
    }
};

export default { generateToken, verifyToken };