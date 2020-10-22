import express from 'express';
//model
import Post from '../../models/post';
import auth from '../../middleware/auth';

const router = express.Router();
// api.post
router.get('/', async (req, res) => {
    const postFindResult = await Post.find();
    console.log(postFindResult, 'ALL POST GET');
    res.json(postFindResult); //찾은 결과를 json파일형식으로 보내준다
});
router.post('/', auth, async (req, res, next) => {
    try {
        console.log(req, 'req');
        const { title, contents, fileUrl, creator } = req.body;
        const newPost = await Post.create({
            title,
            contents,
            fileUrl,
            creator,
        });
        res.json(newPost);
    } catch (e) {
        console.log(e);
    }
});
export default router;
