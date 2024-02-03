import mongoose from 'mongoose';

const likesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    video_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }
});

const LikesModel = mongoose.model('Likes', likesSchema);

export default LikesModel;