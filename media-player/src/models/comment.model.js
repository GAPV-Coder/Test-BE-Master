import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    publication_date_comment: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    video_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    },
    responses_id: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ResponseComment',
            },
        ],
    },
});

const CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel;
