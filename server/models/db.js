/*
 * @Author: taoyage
 * @FileName: db.js                            
 * @Date:   2016-12-23 15:33:42                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-23 17:51:27        
 */

'use strict';

/**
 * 数据库操作模块
 */

import mysql from 'mysql';


const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '130578',
    database: 'blogosphere'
});

exports.query = (...params) => {
    let sql;
    let column;
    let callback;

    if (params.length === 3) {
        sql = params[0];
        column = params[1];
        callback = params[2];
    } else if (param === 2) {
        sql = params[0];
        column = [];
        callback = params[1];
    }

    pool.getConnection((err, connection) => {
        connection.query(sql, column, (...param) => {
            connection.release();
            callback(...param);
        });
    });
};
