import mongoose from 'mongoose';

const responseCommentSchema = new mongoose.Schema({
    response: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
});

const ResponseCommentModel = mongoose.model(
    'ResponseComment',
    responseCommentSchema,
);

export default ResponseCommentModel;
