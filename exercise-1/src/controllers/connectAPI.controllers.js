import { getMostPopularReposService } from '../services/connectAPI.services.js';

const getMostPopularReposController = async (req, res) => {
    const { username } = req.params;
    const limit = req.query.limit || 10;

    try {
        const repos = await getMostPopularReposService(username, limit);
        res.status(200).json({
            message: 'Repositories successfully obtained',
            data: repos,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getMostPopularReposController };
