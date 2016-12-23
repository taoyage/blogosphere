/*
 * @Author: taoyage
 * @FileName: user.js                          
 * @Date:   2016-12-20 16:45:44                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-23 18:00:35        
 */

'use strict';

import express from 'express';
import ccap from 'ccap';
import db from '../models/db';

const router = express.Router();
const captcha = ccap();

router.get('/login', (req, res, next) => {
    res.render('test');
});

router.post('/login', (req, res, next) => {
    res.send('dologin');
});

router.get('/register', (req, res, next) => {
    res.render('register');
});

router.post('/register', (req, res, next) => {
    let [username, password, email, vcode] = [
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.vcode
    ];
    db.query(`SELECT * FROM users WHERE username=?`, [username], (err, rows) => {
        if (err) {
            return next(err);
        }
        if (rows[0]) {
            return res.json({
                code: '0',
                msg: '用户名已存在'
            });
        }
        db.query(`INSERT INTO users VALUES(NULL,?,?,?)`, [username, password, email], function(err, result) {
            if (err) {
                return res.send(err);
            } else {
                res.send(result);
            }
        });
    });
});

router.get('/captcha', (req, res, next) => {
    let ary = captcha.get();
    let [txt, buf] = [ary[0], ary[1]];
    res.send(buf);
});

export default router;
