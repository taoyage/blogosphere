/*
 * @Author: taoyage
 * @FileName: article.js                           
 * @Date:   2016-12-25 22:40:07                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-29 00:02:36        
 */

'use strict';

import * as db from './db'

/**
 * 查询文章模型
 */
class Article {
    /**
     * @param  {[string]}   title       文章题目
     * @param  {[string]}   content     文章内容
     * @param  {[string]}   time        发布时间
     * @param  {[number]}   uid         标识
     * @return {[Object]}   Article     文章对象   
     */
    constructor(title, content, time, uid) {
        console.log(typeof uid);
        this.title = title;
        this.content = content;
        this.time = time;
        this.uid = uid;
    };

    /**
     * [添加文章到数据库]
     * @return {[Object]}   Promise     异步操作处理结果   
     */
    insertArticle() {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO `articles`(`title`,`content`,`time`,`uid`) VALUES(?,?,?,?);', [
                    this.title,
                    this.content,
                    this.time,
                    this.uid,
                ])
                .then(rows => {
                    resolve(rows);
                })
                .catch(err => {
                    reject(err);
                })
        });
    };

    /**
     * [获取一篇文章详情]
     * @param  {[number]}   id          文章标识
     * @return {[Object]}   Promise     异步操作处理结果
     */
    static getArticleDetail(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `articles` WHERE `id`=?', [id])
                .then(rows => {
                    resolve(rows[0]);
                })
                .catch(err => {
                    reject(err);
                })
        });
    };

    /**
     * [获取文章列表,跳过pageNum条,获取postAmount条,按时间排序]
     * @param  {[number]}   pageNum         skip数量
     * @param  {[number]}   postAmount      获取数据数量
     * @return {[Object]}   Promise         异步操作处理结果     
     */
    static getArticleList(pageNum, postAmount) {
        return new Promise((resolve, reject) => {
            db.query('SELECT a.id,a.title,a.content,a.time,u.username,u.avatar FROM articles as a INNER JOIN users as u ON a.uid=u.id ORDER BY a.time DESC LIMIT ?,?', [
                    (pageNum - 1) * postAmount,
                    postAmount
                ])
                .then(rows => {
                    resolve(rows);
                })
                .catch(err => {
                    console.log(11);
                    reject(err);
                })
        });
    };
};

export default Article;
