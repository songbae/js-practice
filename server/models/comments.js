import mongoose from 'mongoose';
import moment from 'moment';
const CommentSchema = new mongoose.Schema({
    contents: {
        type: String,
        required: true, //내용이있어야하기때문에 반드시 필요하다
    },
    data: {
        type: String,
        default: moment().format('YYYY-MM-DD hh:mm:ss'),
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post', //포스트를 참조하자
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', //만든사람의 아이디를 참조하자
    },
    creatorName: { type: String },
});
const Comment = mongoose.model('comment', CommentSchema);
export default Comment;
