/*
 * @Author: taoyage
 * @FileName: config.js 						   
 * @Date:   2016-12-26 21:07:40 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-26 21:36:39 	   
 */

'use strict';

import path from 'path';

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    development: {
        app: {
            name: 'blogosphere'
        },
        port: process.env.PORT || 3000,
        db: {
            connectionLimit: 50,
            host: 'localhost',
            user: 'root',
            password: '130578',
            database: 'blogosphere'
        },
        uploadDir: path.join(__dirname, 'uploads')
    },
    production: {
        app: {
            name: 'blogosphere'
        },
        port: process.env.PORT || 3000,
        db: {
            connectionLimit: 100,
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'blogosphere',
        },
        uploadDir: path.join(__dirname, 'uploads')
    }
};

export default config[env];
