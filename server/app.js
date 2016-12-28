/*
 * @Author: taoyage
 * @FileName: app.js 						   
 * @Date:   2016-12-20 14:32:28 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-28 17:23:58 	   
 */

'use strict';

import path from 'path';
import express from 'express';
const app = express();


// ===== 注入配置信息 =====
import config from './config'
app.locals.config = config;


//===============设置静态文件目录================
app.use('/www', express.static(path.join(__dirname, '../www')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));


//================设置模版引擎==================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'xtpl');


//==============session配置=====================
import session from 'express-session';
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))


//================请求体解析====================
import bodyParser from 'body-parser';
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


//=================加载路由=====================
import router from './Router';
router(app);


// =========================================================================== //
// ============================== 启动应用 开始 ============================== //
// =========================================================================== //

app.listen(3000, () => {
    console.log(`server running in http://localhost:${config.port}/`);
});

// =========================================================================== //
// ============================== 启动应用 结束 ============================== //
// =========================================================================== //
