import {
    deleteUserServices,
    getUserByIdServices,
    getUsersServices,
    updateUserServices,
} from '../services/user.services.js';

export const getUsersControllers = async (req, res) => {
    try {
        const users = await getUsersServices(req.user._id);

        res.status(200).json({
            message: 'Users successfully obtained',
            data: users,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const getUserByIdControllers = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await getUserByIdServices(req.user._id, userId);

        res.status(200).json({
            message: 'User successfully obtained',
            data: user,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const updateUserControllers = async (req, res) => {
    try {
        const { userId } = req.params;
        const data = req.body;
        const updatedUser = await updateUserServices(
            req.user._id,
            userId,
            data,
        );

        res.status(200).json({
            message: 'User successfully updated',
            data: updatedUser,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const deleteUserControllers = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await deleteUserServices(req.user._id, userId);

        res.status(200).json({
            message: 'User successfully deleted',
            data: deletedUser,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};
