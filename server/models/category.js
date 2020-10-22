import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        default: '미분류',
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post', //포스트스키마를 표시하겟다// 참조하겟다
        },
    ],
});
const Category = mongoose.model('category', CategorySchema);
export default Category;
