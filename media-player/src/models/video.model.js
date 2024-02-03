import mongoose, { mongo } from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    credits: { type: String, required: true },
    ranking: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    publication_date_video: {
        type: Date,
        default: Date.now,
    },
    categories: {
        type: String,
        enum: [
            'Science',
            'Technology',
            'Art',
            'History',
            'Sports',
            'Business',
            'Finance',
        ],
        default: 'Technology'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Likes',
        }
    ]
});

const VideoModel = mongoose.model('Video', videoSchema);

export default VideoModel;
