/*
 * @Author: taoyage
 * @FileName: router.js 						   
 * @Date:   2016-12-20 15:49:04 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-27 20:23:43 	   
 * @discription : Routing configuration	   
 */

'use strict';

import article from './controllers/article';
import index from './controllers/index';
import user from './controllers/user';



export default (router) => {

    //================首页路由=================
    router.use('/home', index);

    //===============登陆,注册路由==============
    router.use('/account', user);

    //===============文章页面路由==============
    router.use('/article', article);

};
