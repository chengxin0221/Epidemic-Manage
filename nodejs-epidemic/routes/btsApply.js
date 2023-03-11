const express = require('express');
const router = express.Router();
// 导入数据库操作模块
const db = require('../db/index');

// $route   POST /addbtsApply  [需要进行身份验证]
// @desc    向数据库添加返校申请信息
// @access  public
router.post('/addbtsApply', (req, res) => {
    // 接收表单数据
    const btsApply = req.body;
    // 添加返校申请信息
    const sql = `insert into btsapply(uid,uname,className,sickness,address,backDate,arriveTime,traffic,applyTime) values('${btsApply.uid}','${btsApply.uname}','${btsApply.className}','${btsApply.sickness}','${btsApply.address}','${btsApply.backDate}','${btsApply.arriveTime}','${btsApply.traffic}','${btsApply.applyTime}')`;
    // console.log(sql);
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err){
            console.log(err.message);
            return res.send({ status: 1, message: '出错了，请重新申请！' });
        }
        res.send({
            status: 0,
            message: '已提交申请！'
        })
    });
});

// $route   GET /btsApply  [需要进行身份验证]
// @desc    获取返校申请记录
// @access  public
router.get('/btsApply', (req, res) => {
    // 查询登录用户的返校申请记录
    let sql = `select * from btsapply where uid = '${req.user.uid}' order by applyTime desc`;
    // 查询某一条记录的信息加上申请人的个人信息
    if(req.query.id) sql = `select btsapply.*, user.professional, user.college from btsapply inner join user on btsapply.id = '${req.query.id}' and btsapply.uid = user.uid`;
    // 查询某一班级学生的记录
    if(req.query.className){
        sql = `select * from btsapply where className = '${req.query.className}' order by applyTime desc`;
    }
    // 查询某个学院学生的记录
    if(req.query.college){
        sql = `select btsapply.*, user.professional, user.college from btsapply inner join user on btsapply.applyTime like '${req.query.applyDate}%' and btsapply.uid = user.uid and user.college = '${req.query.college}' order by applyTime,uid asc`;
    }
    // console.log(sql);
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err){
            console.log(err.message);
            return res.send({ status: 1, message: '获取返校申请记录失败！' });
        }
        // console.log('--------',results);
        res.send({
            status: 0,
            btsApply: results
        })
    });
});


// $route   GET /delbtsApply  [需要进行身份验证]
// @desc    删除返校申请记录
// @access  public
router.get('/delbtsApply', (req, res) => {
    // 删除返校申请记录
    const sql = `delete from btsapply where id = '${req.query.id}'`;
    // console.log(sql);
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err){
            console.log(err.message);
            return res.send({ status: 1, message: '删除返校申请失败！' });
        }
        res.send({
            status: 0,
            message: '删除返校申请成功！'
        })
    });
});

// $route   POST /btsReview  [需要进行身份验证]
// @desc    进行返校申请信息的审核，即更新信息
// @access  public
router.post('/btsReview', (req, res) => {
    // 接收表单数据
    const btsReview = req.body;
    // 添加返校申请信息
    const sql = `update btsapply set state = '${btsReview.state}', opinion = '${btsReview.opinion}', reviewBy = '${btsReview.reviewBy}', reviewTime = '${btsReview.reviewTime}' where id = '${btsReview.id}'`;
    // console.log(sql);
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err){
            console.log(err.message);
            return res.send({ status: 1, message: '出错了，请重新审核！' });
        }
        res.send({
            status: 0,
            message: '审核完成！'
        })
    });
});

module.exports = router;