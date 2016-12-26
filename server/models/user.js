/*
 * @Author: taoyage
 * @FileName: user.js                          
 * @Date:   2016-12-23 18:18:35                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-26 19:33:29        
 */

'use strict';

import db from './db';


/**
 * 封装一个登陆和注册业务,操作数据库的对象
 */
class User {
    constructor(user) {
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
    };

    /**
     * 插入数据库
     * @param  {Function} 回调函数
     * @return {[type]}  callback
     */
    insertUser(callback) {
        db.query(`INSERT INTO users VALUES(NULL,?,?,?)`, [this.username, this.password, this.email], function(err, result) {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    };
};

/**
 * 从数据库查询用户名是否存在
 * @param  {[string]} 用户名
 * @param  {Function} 回调函数
 * @return {[type]} callback
 */
User.queryUser = (username, callback) => {

    db.query(`SELECT * FROM users WHERE username=?`, [username], (err, rows) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, rows[0]);
        }
    });
};

export default User;
