/*
 * @Author: taoyage
 * @FileName: user.js                          
 * @Date:   2016-12-23 18:18:35                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-28 17:24:59        
 * discription : 登陆和注册业务相关操作数据库对象       
 */

'use strict';

import * as db from './db';

export default class User {
    constructor(username, password, email, avatar = 'avatar.png') {
        this.username = username
        this.password = password
        this.email = email
        this.avatar = avatar
    };

    insertUser() {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO `users`(`username`,`password`,`email`,`avatar`) VALUES(?,?,?,?);', [
                    this.username,
                    this.password,
                    this.email,
                    this.avatar,
                ])
                .then(rows => {
                    resolve(rows);
                })
                .catch(err => {
                    reject(err);
                })
        });
    };

    static queryUser(username) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `users` WHERE `username`=?', [username])
                .then(rows => {
                    resolve(rows[0]);
                })
                .catch(err => {
                    reject(err);
                })
        });
    };
};
