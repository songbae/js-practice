import mongoose from 'mongoose';
import moment from 'moment';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true, //검색기능에 이용할 예정
    },
    contents: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: -2, //처음 작성한 사람도 조회수에 카운트 되기 때문에 빼준다
    },
    fileUrl: {
        type: String,
        default: 'http://source.unsplash.com/random/301x201', //일단은 빈화면을 대체하기위해 랜덤파일을 보여준다
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
    date: {
        type: String,
        default: moment().format('YYYY-MM-DD hh:mm:ss'),
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',
        },
    ],
    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
});
const Post = mongoose.model('post', PostSchema);

export default Post;
