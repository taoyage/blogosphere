/*
 * @Author: taoyage
 * @FileName: index.js 						   
 * @Date:   2016-12-20 16:45:50 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-22 21:30:58 	   
 */

'use strict';

import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {

    res.send('index');
    
});

export default router;
