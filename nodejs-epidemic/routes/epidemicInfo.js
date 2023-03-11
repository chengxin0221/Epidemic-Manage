const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db/index'); // 导入数据库连接对象
const { getUrlList } = require('../tools/getImgUrlList'); // 获取一条资讯中包含的图片路径的函数

// $route   POST /addEpidemicInfo  [需要进行身份验证]
// @desc    向数据库添加资讯信息
// @access  public
router.post('/addEpidemicInfo', (req, res) => {
    // 接收表单数据
    const epidemicInfo = req.body;
    // console.log(epidemicInfo);
    // 添加资讯信息
    var sql = `insert into epidemicInfo(title,coverImg,content,date,author,editor) values('${epidemicInfo.title}','${epidemicInfo.coverImg}','${epidemicInfo.content}','${epidemicInfo.date}','${epidemicInfo.author}','${epidemicInfo.editor}')`;
    // 返回的信息
    var message = '发布资讯成功！';
    if (epidemicInfo.id && epidemicInfo.id !== '-1') {
        sql = `update epidemicInfo set title = '${epidemicInfo.title}', coverImg = '${epidemicInfo.coverImg}', content = '${epidemicInfo.content}', date = '${epidemicInfo.date}', author = '${epidemicInfo.author}', editor = '${epidemicInfo.editor}' where id = '${epidemicInfo.id}'`;
        message = '编辑资讯内容成功！';
    }
    // console.log('-------------sql',sql);
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message)
            return res.send({ status: 1, message: '上传资讯失败！' });
        }
        res.send({
            status: 0,
            message: message
        })
    });
});

// $route   GET /api/epidemicInfo
// @desc    获取所有资讯信息
// @access  public
router.get('/api/epidemicInfo', (req, res) => {
    const id = req.query.id;
    // 获取所有资讯信息
    var sql = `select * from epidemicInfo order by id desc`;
    if (id) {
        sql = `select * from epidemicInfo where id='${id}'`;
    }
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message)
            return res.send({ status: 1, message: '获取资讯信息失败！' });
        }
        res.send({
            status: 0,
            epidemicInfo: results
        });
    });
});

// $route   GET /delEpidemicInfo [需要进行身份验证]
// @desc    删除数据库中的某条资讯信息
// @access  public
router.get('/delEpidemicInfo', (req, res) => {
    const id = req.query.id;
    const sql1 = `select * from epidemicInfo where id='${id}'`;
    const sql2 = `delete from epidemicInfo where id='${id}'`;
    var imgUrlList = [];
    db.query(sql1, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message)
            return res.send({ status: 1, message: '删除资讯失败！' });
        }
        // 获取一条资讯中包含的图片路径
        imgUrlList = getUrlList(results[0]);
        // console.log("即将删除的资讯图片路径：",imgUrlList);
        db.query(sql2, function (err, results) {
            // 执行 SQL 语句失败
            if (err) {
                console.log(err.message)
                return res.send({ status: 1, message: '删除资讯失败！' });
            }
            try {
                // 删除资讯时删除其中用到的图片
                imgUrlList.forEach(item => fs.unlinkSync(item));
            } catch (error) {
                console.log("删除资讯成功，但删除图片失败！", error.message);
                return res.send({
                    status: 0,
                    message: '删除资讯成功，但删除图片失败！'
                });
            }
            res.send({
                status: 0,
                message: '删除资讯成功！'
            });
        });
    });
});

module.exports = router;