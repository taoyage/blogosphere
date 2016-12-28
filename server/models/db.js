/*
 * @Author: taoyage
 * @FileName: db.js                            
 * @Date:   2016-12-23 15:33:42                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-28 16:19:48        
 */

'use strict';

/**
 * 数据库操作模块
 */

import mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool(config.db);

export const query = (sql, params) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return reject(err)
        }
        connection.query(sql, params, (err, rows) => {
            connection.release();
            if (err) {
                return reject(err)
            }
            resolve(rows);
        });
    });
});
