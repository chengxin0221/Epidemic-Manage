const express = require('express');
const router = express.Router();
// 导入数据库操作模块
const db = require('../db/index');

// $route   POST /addoutApply  [需要进行身份验证]
// @desc    向数据库添加外出申请信息
// @access  public
router.post('/addoutApply', (req, res) => {
    // 接收表单数据
    const outApply = req.body;
    // 添加外出申请信息
    const sql = `insert into outapply(uid,uname,className,reason,destination,placeType,outTime,backTime,travelRecords,traffic,applyTime) values('${outApply.uid}','${outApply.uname}','${outApply.className}','${outApply.reason}','${outApply.destination}','${outApply.placeType}','${outApply.outTime}','${outApply.backTime}','${outApply.travelRecords}','${outApply.traffic}','${outApply.applyTime}')`;
    // console.log(sql)
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

// $route   GET /outApply  [需要进行身份验证]
// @desc    获取外出申请记录
// @access  public
router.get('/outApply', (req, res) => {
    // 查询外出申请记录
    let sql = `select * from outapply where uid = '${req.user.uid}' order by applyTime desc`;
    // 查询某一条记录的信息加上申请人的个人信息
    if(req.query.id) sql = `select outapply.*, user.professional, user.college from outapply inner join user on outapply.id = '${req.query.id}' and outapply.uid = user.uid`;
    // 查询某一班级学生的记录
    if(req.query.className){
        sql = `select * from outapply where className = '${req.query.className}' order by applyTime desc`;
    }
    // 查询某个学院学生的记录
    if(req.query.college){
        sql = `select outapply.*, user.professional, user.college from outapply inner join user on outapply.applyTime like '${req.query.applyDate}%' and outapply.uid = user.uid and user.college = '${req.query.college}' order by applyTime,uid asc`;
    }
    // console.log(sql);
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err){
            console.log(err.message);
            return res.send({ status: 1, message: '获取外出申请记录失败！' });
        }
        // console.log('--------',results);
        res.send({
            status: 0,
            outApply: results
        })
    });
});

// $route   GET /deloutApply  [需要进行身份验证]
// @desc    删除外出申请记录
// @access  public
router.get('/deloutApply', (req, res) => {
    // 删除外出申请记录
    const sql = `delete from outapply where id = '${req.query.id}'`;
    // console.log(sql)
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err){
            console.log(err.message);
            return res.send({ status: 1, message: '删除外出申请失败！' });
        }
        res.send({
            status: 0,
            message: '删除外出申请成功！'
        })
    });
});

// $route   POST /outReview  [需要进行身份验证]
// @desc    进行外出申请信息的审核，即更新信息
// @access  public
router.post('/outReview', (req, res) => {
    // 接收表单数据
    const outReview = req.body;
    // 添加返校申请信息
    const sql = `update outapply set state = '${outReview.state}', opinion = '${outReview.opinion}', reviewBy = '${outReview.reviewBy}', reviewTime = '${outReview.reviewTime}' where id = '${outReview.id}'`;
    // console.log(sql)
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