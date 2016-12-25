/*
 * @Author: taoyage
 * @FileName: user.js                          
 * @Date:   2016-12-20 16:45:44                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-26 00:00:51        
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
router.get('/login', (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/home');
    }
    res.render('login');
});

/**
 * 登陆模块业务处理
 */
router.post('/login', (req, res, next) => {
    let [username, password] = [req.body.username, utils.md5(req.body.password)];
    User.queryUser(username, (err, result) => {
        if (err) {
            return next(err);
        } else if (!result) {
            return req.json({
                code: '0',
                msg: '此用户名不存在'
            })
        }
        if (password != result.password) {
            return res.json({
                code: '0',
                msg: '密码错误'
            })
        }
        req.session.user = result;
        return res.json({
            code: '1',
            msg: '登陆成功'
        });
    });
});


/**
 * 注册页面渲染
 */
router.get('/register', (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/home');
    }
    res.render('register');
});


/**
 * 注册模块业务处理
 */
router.post('/register', (req, res, next) => {
    let [username, password, email, vcode, session_vcode] = [
        req.body.username,
        utils.md5(req.body.password),
        req.body.email,
        req.body.vcode,
        req.session.vcode
    ];

    if (vcode.toLowerCase() !== session_vcode.toLowerCase()) {
        return res.json({
            code: '0',
            msg: '验证码不正确'
        });
    }

    User.queryUser(username, (err, result) => {
        if (err) {
            return next(err);
        } else if (result) {
            return res.json({
                code: '0',
                msg: '用户名已存在'
            });
        }
        let user = new User({ username, password, email });
        user.insertUser((err, result) => {
            if (err) {
                return next(err);
            }
            if (result.insertId === 0) {
                return res.json({
                    code: 0,
                    msg: 'failed'
                });
            }
            req.session.user = user;
            return res.json({
                code: '1',
                msg: '注册成功'
            })
        });
    });
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

export default router;
