import moment from 'moment';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    role: {
        type: String,
        enum: ['MainJuin', 'SubJuin', 'User'],
        default: 'User',
    },
    register_date: {
        type: Date,
        default: moment().format('YYYY-MM-DD hh:mm:ss'),
    },
    comments: [
        {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'posts',
            },
            commnet_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comments',
            },
        },
    ],
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts',
        },
    ],
});
const User = mongoose.model('user', UserSchema);
export default User;
