import AppError from '../helpers/appError.js';
import UserModel from '../models/user.model.js';
import VideoModel from '../models/video.model.js';
import CommentModel from '../models/comment.model.js';

export const createVideoServices = async (userId, videoData) => {
    try {
        
        const video = await VideoModel.create({
            ...videoData,
            user_id: userId,
        });

        const videoId = video._id;

        const user = await UserModel.findById(userId);

        if (!user) {
            throw new AppError('User not found', 401);
        }

        if (!user.videos) {
            user.videos = [];
        }
        
        user.videos.push(videoId);
        await user.save();

        return video;
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        throw new AppError(`Error creating video: ${error.message}`, 500);
    }
};

export const getVideosServices = async () => {
    try {
        const videos = await VideoModel.find({});
        return videos;
    } catch (error) {
        throw new AppError(`Error getting videos: ${error.message}`, 500);
    }
};

export const getVideosByUserIdServices = async (userId) => {
    try {
        const videos = await VideoModel.find({ user_id: userId }).populate(
            'user_id',
            ['nickname', 'email'],
        );

        if (!videos) {
            throw new AppError('No videos found for this user', 404);
        }

        return videos;
    } catch (error) {
        throw new AppError(
            `Error getting videos by user ID: ${error.message}`,
            500,
        );
    }
};

export const getTopRankingVideosServices = async (userId) => {
    try {
        const videos = await VideoModel.find({ ranking: { $gte: 4 } });
        return videos;
    } catch (error) {
        throw new AppError(
            `Error getting top ranking videos: ${error.message}`,
            500,
        );
    }
};

export const updateVideosServices = async (userId, videoId, videoData) => {
    try {
        const video = await VideoModel.findByIdAndUpdate(
            { _id: videoId, user_id: userId },
            videoData,
            { new: true },
        );

        if (!video) {
            throw new AppError(
                `Video not found or you don't have permission to edit it.`,
                404,
            );
        }

        return video;
    } catch (error) {
        throw new AppError(`Error updating video: ${error.message}`, 500);
    }
};

export const deleteVideosServices = async (userId, videoId) => {
    try {
        const video = await VideoModel.findOneAndDelete({
            _id: videoId,
            user_id: userId,
        });

        if (!video) {
            throw new AppError(
                'Video not found or you do not have permissions',
                404,
            );
        }

        return video;
    } catch (error) {
        throw new AppError(`Error deleting the video: ${error.message}`, 500);
    }
};

export const commentVideoServices = async (videoId, userId, commentText) => {
    try {
        const comment = await CommentModel.create({
            text: commentText,
            user_id: userId
        });

        await VideoModel.findByIdAndUpdate(
            videoId,
            { $push: { comments: comment._id }},
            { new: true }
        );

        return comment;
    } catch (error) {
        throw new AppError(`Failed to add a comment on video: ${error.message}`, 500);
    }
};

export const likeVideosServices = async (userId, videoId) => {
    try {
        const video = await VideoModel.findById(videoId);

        if (!video) {
            throw new AppError('Video does not exist', 404);
        }

        const alreadyLiked = video.likes.some((like) => like.equals(userId));

        if (alreadyLiked) {
            throw new AppError('You already liked this video', 404);
        }

        video.likes.push(userId);
        await video.save();

        return video;
    } catch (error) {
        throw new AppError(`Failed to like the video: ${error.message}`);
    }
};