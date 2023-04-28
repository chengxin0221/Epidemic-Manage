const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db/index'); // 导入数据库连接对象

// $route   POST /addNotice  [需要进行身份验证]
// @desc    向数据库添加公告信息
// @access  public
router.post('/addNotice', (req, res) => {
    // 接收表单数据
    const noticeData = req.body;
    // 添加公告信息
    var sql = `insert into notice(title,content,imgList,date,author,editor) values('${noticeData.title}','${noticeData.content}','${noticeData.imgList}','${noticeData.date}','${noticeData.author}','${noticeData.editor}')`;
    // 返回的信息
    var message = '发布公告成功！';
    if(noticeData.id && noticeData.id !== '-1'){
        sql = `update notice set title = '${noticeData.title}', content = '${noticeData.content}', imgList = '${noticeData.imgList}', date = '${noticeData.date}', author = '${noticeData.author}', editor = '${noticeData.editor}' where id = '${noticeData.id}'`;
        message = '编辑公告内容成功！';
    }
    // console.log('-------------sql',sql);
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err){
            console.log(err.message)
            return res.send({ status: 1, message: '上传公告失败！' });
        }
        res.send({
            status: 0,
            message: message
        })
    });
});

// $route   GET /api/notice [不需要进行身份验证]
// @desc    获取所有公告信息
// @access  public
router.get('/api/notice', (req, res) => {
    const id = req.query.id;
    // 获取所有公告信息
    var sql = `select * from notice order by date desc`;
    if (id) {
        sql = `select * from notice where id='${id}'`;
    }
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err){
            console.log(err.message)
            return res.send({ status: 1, message: '获取公告信息失败！' });
        }
        var noticeData = results;
        // 获取最新的5条数据
        if (req.query.num) noticeData = results.slice(0, 5);
        res.send({
            status: 0,
            noticeData: noticeData
        })
    });
});

// $route   GET /delnotice [需要进行身份验证]
// @desc    删除数据库中的某条公告信息并删除其中的图片文件
// @access  public
router.get('/delnotice', (req, res) => {
    const id = req.query.id;
    const sql1 = `select * from notice where id='${id}'`;
    const sql2 = `delete from notice where id='${id}'`;
    var imgUrlList = [];
    db.query(sql1, function (err, results) {
        // 执行 SQL 语句失败
        if (err){
            console.log(err.message)
            return res.send({ status: 1, message: '删除公告失败！' });
        }
        if (results[0].imgList) {
            // 获取一条公告中包含的图片路径
            var list = results[0].imgList.split(',');
            // http://192.168.43.206:5000/api/
            list.forEach(item => imgUrlList.push('static/' + item.slice(31)));
            // console.log("即将删除的公告信息：", results[0],"即将删除的公告图片路径：",imgUrlList);
        }
        db.query(sql2, function (err, results) {
            // 执行 SQL 语句失败
            if (err){
                console.log(err.message)
                return res.send({ status: 1, message: '删除公告失败！' });
            }
            try {
                // 删除公告时删除其中用到的图片
                imgUrlList.forEach(item => fs.unlinkSync(item));
            } catch (error) {
                console.log("删除公告成功，但删除图片失败！", error.message);
                return res.send({
                    status: 0,
                    message: '删除公告成功，但删除图片失败！'
                });
            }
            res.send({
                status: 0,
                message: '删除公告成功！'
            });
        });
    });
});

module.exports = router;