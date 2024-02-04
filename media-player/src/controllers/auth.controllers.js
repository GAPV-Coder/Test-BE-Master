import {
    loginUserServices,
    registerUserServices,
} from '../services/auth.services.js';

export const registerUserController = async (req, res) => {
    try {
        const { full_name, nickname, email, password, isActive, role } =
            req.body;

        const result = await registerUserServices(
            full_name,
            nickname,
            email,
            password,
            isActive,
            role,
        );

        res.status(200).json({
            message: 'User registered successfully',
            data: result,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { user, token } = await loginUserServices(email, password);

        res.status(200).json({
            message: 'Session successfully started',
            data: { user, token },
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};
