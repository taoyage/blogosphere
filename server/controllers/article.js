/*
 * @Author: taoyage
 * @FileName: article.js                           
 * @Date:   2016-12-20 16:45:59                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-31 20:28:49        
 * @description 文章相关路由模块       
 */

'use strict';

import express from 'express';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import moment from 'moment';
import MarkdownIt from 'markdown-it';
import Article from '../models/article.js';

const router = express.Router();
const md = new MarkdownIt();
moment.locale("zh-cn");

/**
 * Get article details page
 */
router.get('/details/:id', (req, res) => {
    Article.getArticleDetail(req.params.id)
        .then(article => {
            if (!article) {
                return res.end(`not exsit number ${req.params.id} article`);
            }
            article.content = md.render(article.content);
            res.render('article', {
                user: req.session.user,
                article: article
            })
        })
        .catch(err => {
            return res.end(`${err.message}`);
        })
});


/**
 * Get publish page
 */
router.get('/publish', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.render('publish', {
        user: req.session.user
    });
});

/**
 * Post publish
 */
router.post('/publish', (req, res) => {

    /*这里做数据验证,以后再说吧*/

    let [title, content, time, uid] = [
        req.body.title,
        req.body.content,
        moment().format('YYYY-MM-DD HH:mm:ss'),
        req.session.user.id
    ];

    let article = new Article(title, content, time, uid);

    article.insertArticle()
        .then(rows => {
            if (rows.affectedRows === 0) {
                return res.json({
                    code: '0',
                    msg: 'failed'
                })
            }
            res.json({
                code: '1',
                id: rows.insertId,
                msg: 'publish article sucesss'
            })
        })
        .catch(err => {
            res.json({
                code: '0',
                msg: err.message
            })
        })
});

/**
 * Get article list
 */
router.get('/page/:pageNum/:postAmount', (req, res) => {
    let pageNum = Number.parseInt(req.params.pageNum);
    let postAmount = Number.parseInt(req.params.postAmount);
    Article.getArticleList(pageNum, postAmount)
        .then(rows => {
            rows.forEach((posts) => posts.time = moment(posts.time).startOf('second').fromNow());
            res.json({
                posts: rows
            });
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
});

/**
 * Post file
 */
router.post('/upload', (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.uploadDir = req.app.locals.config.uploadDir;
    form.parse(req, function(err, fields, files) {
        if (err) {
            return res.json({
                code: '0',
                msg: '文件上传失败'
            });
        }
        let oldPath = files.pic.path;
        let newPath = oldPath + path.extname(files.pic.name);
        fs.rename(oldPath, newPath, () => {
            res.json({
                code: '1',
                msg: `/uploads/${path.basename(newPath)}`
            });
        });
    });
});

export default router;
