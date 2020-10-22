import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth';
import config from '../../config/index';
const { JWT_SECRET } = config;
//model
import User from '../../models/user';

const router = express.Router();

//@라우터 post api/auth
//@desc Auth user
//@access public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: ' 모든 필드를 채워주세요' });
    }
    User.findOne(
        { email }.then((user) => {
            if (!user) return res.status(400).json({ msg: '유저가없습니다' });
            //비빌번호 확인
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (!isMatch) return res.status(400).json({ msg: '비밀번호가 일치하지않습니다' });
                jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2days' }, (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role, //글을 쓸수 있는 권한이 있는지 없는지 권한에 대한 내용
                        },
                    });
                });
            });
        })
    );
});

router.post('/logout', (req, res) => {
    res.json('로그아웃 성공');
});
router.get('/user', auth, async (req, res) => {
    try {
        const user = await (await User.findById(req.user.id)).select('-password');
        if (!user) throw Error('유저가 존재하지 않습니다');
        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
});
export default auth;
