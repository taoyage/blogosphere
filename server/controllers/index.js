/*
 * @Author: taoyage
 * @FileName: index.js 						   
 * @Date:   2016-12-20 16:45:50 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-20 21:15:04 	   
 */

'use strict';

import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
	console.log('index');
    res.send('index');
});

export default router;
