import {
    createVideoServices,
    deleteVideosServices,
    getTopRankingVideosServices,
    getVideosByUserIdServices,
    getVideosServices,
    updateVideosServices,
    commentVideoServices,
    likeVideosServices
} from '../services/videos.services.js';

export const createVideoControllers = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        console.log('User ID: ', userId);
        const videoData = req.body;

        const video = await createVideoServices(userId, videoData);

        res.status(200).json({
            message: 'Successfully created video',
            data: video,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const getVideosControllers = async (req, res) => {
    try {
        const videos = await getVideosServices();

        res.status(200).json({
            message: 'Videos obtained with success',
            data: videos,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const getVideosByUserIdControllers = async (req, res) => {
    try {
        const { userId } = req.user;
        const videos = await getVideosByUserIdServices(userId);

        res.status(200).json({
            message: 'Videos obtained with success',
            data: videos,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const getTopRankingVideosControllers = async (req, res) => {
    try {
        const videos = await getTopRankingVideosServices();

        res.status(200).json({
            message: `Video's ranking obtained with success`,
            data: videos,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const updateVideosControllers = async (req, res) => {
    try {
        const { userId } = req.user;
        const { videoId } = req.params;
        const videoData = req.body;

        const updatedVideo = await updateVideosServices(
            userId,
            videoId,
            videoData,
        );

        res.status(200).json({
            message: 'Successfully updated video',
            data: updatedVideo,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const deleteVideosControllers = async (req, res) => {
    try {
        const { userId } = req.user;
        const { videoId } = req.params;

        const deletedVideo = await deleteVideosServices(userId, videoId);

        res.status(200).json({
            message: 'Successfully deleted video',
            data: deletedVideo,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const commentVideoControllers = async (req, res) => {
    try {
        const { videoId } = req.params;
        const { _id: userId } = req.user;
        const { commentText } = req.body;

        const comment = await commentVideoServices(videoId, userId, commentText);

        res.status(200).json({
            message: 'Comment added successfully',
            data: comment
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const likeVideosControllers = async (req, res) => {
    try {
        const { userId } = req.user;
        const { videoId } = req.params;

        const video = await likeVideosServices(userId, videoId);

        res.status(200).json({
            message: 'Successfully liked the video',
            data: video
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};