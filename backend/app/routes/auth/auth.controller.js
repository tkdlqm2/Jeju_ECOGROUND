require('dotenv').config();

import jwt  from 'jsonwebtoken';
const models = require('../../../db/models');

const { User } = models.default;
/*
    POST /api/auth/register
    {
        username,
        password
    }
*/
exports.register = (req, res) => {
    const { email, username, password} = req.body;
    let newUser = null;

    // create a new user if does not exist
    const create = (user) => {
        if(user) {
            throw new Error('username exists')
        } else {
            return User.create(email, username, password)
        }
    };

    // count the number of the user
    const count = (user) => {
        newUser = user;
        return User.count({});
    };

    // assign admin if count is 1
    const assign = (count) => {
        if(count === 1) {
            return User.assignAdmin(newUser)
        } else {
            // if not, return a promise that returns false
            return Promise.resolve(false)
        }
    };

    // respond to the client
    const respond = (isAdmin) => {
        res.json({
            message: 'registered successfully',
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

/*
    POST /api/auth/login
    {
        username,
        password
    }
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

/*
    GET /api/auth/check
*/

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
};
