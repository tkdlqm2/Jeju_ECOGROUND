require('dotenv').config();

import jwt  from 'jsonwebtoken';
const models = require('../../../db/models');

const { User } = models.default;

/**
 * 회원 가입
 *
 * @author Dong-Min Seol
 * @since  2019.11.09
 * @url    POST /api/auth/register
 */
exports.register = (req, res) => {
    const { email, name, password} = req.body;
    let newUser = null;

    // [1] 이메일 중복 체크
    const create = (user) => {
        if(user) {
            throw new Error('useremail exists')
        } else {
            return User.create(email, name, password)
        }
    };

    // 유저 숫자 카운트
    const count = (user) => {
        newUser = user;
        return User.count({});
    };

    // 최초 유저이면 관리자
    const assign = (count) => {
        if(count === 1) {
            return User.assignAdmin(newUser)
        } else {
            // if not, return a promise that returns false
            return Promise.resolve(false)
        }
    };

    // 응답
    const respond = (isAdmin) => {
        res.json({
            message: '회원 가입 완료',
            admin: isAdmin ? true : false
        })
    };

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    };

    // check username duplication
    User.findOneByUserEmail(email)
        .then(create)
        .then(count)
        .then(assign)
        .then(respond)
        .catch(onError)
};

/**
 * 로그인 로직
 * @author Dong-Min Seol
 * @since  2019.11.09
 * @url    POST /api/auth/login
 */
exports.login = (req, res) => {
    const { email, password } = req.body;
    const secret = req.app.get('jwt-secret');

    // check the user info & generate the jwt
    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            if(User.verify(user, password)) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user.id,
                            email: user.email,
                            admin: user.admin
                        },
                        secret, 
                        {
                            expiresIn: '7d',
                            issuer: process.env.JWT_USER_ISSUER,
                            subject: user.name

                        }, (err, token) => {
                            if (err) reject(err);
                            resolve(token) 
                        }, process.env.JWT_USER_KEY)
                });
                return p
            } else {
                throw new Error('login failed')
            }
        }
    };

    // respond the token 
    const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    };

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    };

    // find the user
    User.findOneByUserEmail(email)
        .then(check)
        .then(respond)
        .catch(onError)
};

/**
 * 로그인 확인
 * @author Dong-Min Seol
 * @since  2019.11.09
 * @url    GET /api/auth/check
 */
exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
};
