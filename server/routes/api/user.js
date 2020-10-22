import express from 'express';
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/index';
const { JWT_SECRET } = config;

//model
import User from '../../models/user';
const router = express.Router();
//@routes Get api/user
//@desc Get all user
//@access pulbic
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        if (!users) throw Error('유저가 없습니당');
        res.status(200).json(users);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
});
// @routes Post api/user
// @desc Register user
router.post('/', (req, res) => {
    console.log(req);
    const { name, email, password } = req.body;
    //simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: '모든 값을 입력하세용!!가리~' });
    }
    User.findOne({ email }).then((user) => {
        if (user) return res.status(400).json({ msg: '이미 가입된 유저가 존재합니다' });
        const newUser = new User({
            name,
            email,
            password,
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then((user) => {
                    jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                            },
                        });
                    });
                });
            });
        });
    });
});
export default router;
