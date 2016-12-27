/*
 * @Author: taoyage
 * @FileName: article.js                           
 * @Date:   2016-12-25 22:40:07                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-27 23:37:44        
 * @discription 文章相关操作对象       
 */

'use strict';

import db from './db';


class Article {
    /**
     * 数据初始化
     * @param  {object} 文章发布内容
     */
    constructor(article) {
        this.title = article.title;
        this.content = article.content;
        this.time = article.time;
        this.uid = article.uid;
    };

    /**
     * 插入数据库操作
     * @param  {Function} callback
     * @return {[Function]} callback
     */
    insertArticle(callback) {
        db.query(`INSERT INTO articles VALUES(NULL,?,?,?,?)`, [this.title, this.content, this.time, this.uid], (err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    };
};

Article.query = (id, callback) => {
    db.query(`SELECT * FROM articles WHERE id=?`, [id], (err, rows) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, rows[0]);
        }
    });
};

export default Article;
