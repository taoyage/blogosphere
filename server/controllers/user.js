/*
 * @Author: taoyage
 * @FileName: user.js 						   
 * @Date:   2016-12-20 16:45:44 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-20 21:23:39 	   
 */

'use strict';

import express from 'express';
const router = express.Router();


router.get('/login', (req, res, next) => {
    res.send('showlogin');
});

router.post('/login', (req, res, next) => {
    res.send('dologin');
});

router.get('/register', (req, res, next) => {
    res.send('showregister');
});

router.post('/register', (req, res, next) => {
    res.send('doregister');
});

export default router;
