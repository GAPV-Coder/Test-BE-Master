import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
        },
    ],
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
