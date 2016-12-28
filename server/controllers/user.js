/*
 * @Author: taoyage
 * @FileName: user.js                          
 * @Date:   2016-12-20 16:45:44                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-28 22:51:41        
 */

'use strict';

import express from 'express';
import ccap from 'ccap';
import utils from 'utility';
import User from '../models/user';


const router = express.Router();
const captcha = ccap();

/**
 * 登陆页面渲染
 */
router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('login');
});

/**
 * 注册页面渲染
 */
router.get('/register', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('register');
});

/**
 * 登陆模块业务处理
 */
router.post('/login', (req, res) => {
    let [username, password] = [req.body.username, utils.md5(req.body.password)];
    User.queryUser(username)
        .then(result => {
            if (!result) {      
                return res.json({
                    code: '0',
                    msg: 'username not exists'
                })
            }
            if (password != result.password) {
                return res.json({
                    code: '0',
                    msg: 'password err'
                })
            }
            req.session.user = result;
            return res.json({
                code: '1',
                msg: 'login success'
            })
        })
        .catch(err => {
            res.json({
                code: '1',
                msg: err.message
            })
        })
});

router.get('/logout', (req, res, next) => {
    req.session.user = null;
});


/**
 * 注册模块业务处理
 */
router.post('/register', (req, res, next) => {
    let [username, password, email, vcode] = [
        req.body.username,
        utils.md5(req.body.password),
        req.body.email,
        req.body.vcode
    ];

    if (vcode !== req.session.vcode) {
        return res.json({
            code: '0',
            msg: 'vcode invalid error'
        });
    }

    let user = new User(username, password, email);

    User.queryUser(username)
        .then(result => {
            if (result) {
                return res.json({
                    code: '0',
                    msg: 'username already exists'
                })
            }
            return user.insertUser();
        })
        .then(rows => {
            if (rows.affectedRows === 0) {
                return res.json({
                    code: '0',
                    msg: 'failed'
                })
            }
            user.id = rows.insertId;
            req.session.user = user;
            res.json({
                code: '1',
                msg: 'success'
            })
        })
        .catch(err => {
            res.json({
                code: '0',
                msg: err.message
            })
        })
});

/**
 * 生成验证码
 */
router.get('/captcha', (req, res, next) => {
    let ary = captcha.get();
    let [txt, buf] = [ary[0], ary[1]];
    req.session.vcode = txt;
    res.send(buf);
});

router.get('/setting', (req, res, next) => {
    res.render('setting');
});

export default router;
