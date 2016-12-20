/*
 * @Author: taoyage
 * @FileName: router.js 						   
 * @Date:   2016-12-20 15:49:04 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-20 21:20:27 	   
 */

'use strict';

import express from 'express';
import article from './controllers/article';

const router = express();

//================首页路由=================
import index from './controllers/index';
router.use('/home',index);

//===============登陆,注册路由==============
import user from './controllers/user';
router.use('/account',user);


export default (app) => app.use(router);

