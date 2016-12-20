/*
 * @Author: taoyage
 * @FileName: app.js 						   
 * @Date:   2016-12-20 14:32:28 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-20 20:37:32 	   
 */

'use strict';

import path from 'path';
import express from 'express';
const app = express();

//===============设置静态文件目录================
app.use('/www', express.static(path.join(__dirname, 'www')));

//================设置模版引擎==================
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'xtpl');

//==============解析cookie=====================
import cookieParser from 'cookie-parser';
app.use(cookieParser());

//================请求体解析====================
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: false }))

//=================加载路由=====================
import router from './server/Router';
router(app);

// =========================================================================== //
// ============================== 启动应用 开始 ============================== //
// =========================================================================== //

app.listen(3000, () => {
    console.log('server run in port 3000');
});

// =========================================================================== //
// ============================== 启动应用 结束 ============================== //
// =========================================================================== //
