/*
 * @Author: taoyage
 * @FileName: article.js 						   
 * @Date:   2016-12-20 16:45:59 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-26 22:14:12 	   
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

/**
 * 渲染文章页面
 */
router.get('/details/:id', (req, res, next) => {
    Article.query(req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }
        result.content = md.render(result.content);
        res.render('article', {
            article: result,
            user: req.session.user
        });
    });
});

/**
 * 渲染发布文章页面
 */
router.get('/publish', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/home');
    }
    res.render('publish', {
        user: req.session.user
    });
});

/**
 * 处理发布文章业务模块
 */
router.post('/publish', (req, res, next) => {

    /*这里做数据验证,以后再说吧*/

    let [title, content, time, uid] = [
        req.body.title,
        req.body.content,
        moment().format('YYYY-MM-DD HH:mm:ss'),
        req.session.user.id
    ];

    let article = new Article({ title, content, time, uid });

    article.insertArticle((err, result) => {
        if (err) {
            return next(err);
        } else if (result.insertId <= 0) {
            return res.json({
                code: '1',
                msg: '文章发布失败'
            });
        }
        return res.json({
            code: '1',
            msg: result.insertId
        });
    });
});

/**
 * 处理文件上传
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
