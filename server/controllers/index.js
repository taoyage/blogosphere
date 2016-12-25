/*
 * @Author: taoyage
 * @FileName: index.js 						   
 * @Date:   2016-12-20 16:45:50 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-24 18:01:55 	   
 */

'use strict';

import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        user: req.session.user
    });
});

export default router;
