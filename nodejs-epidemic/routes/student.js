const express = require('express');
const router = express.Router();
// 导入数据库操作模块
const db = require('../db/index');

// $route   GET /student  [需要进行身份验证]
// @desc    查询管理的学生信息
// @access  public
router.get('/student', (req, res) => {
    // 接收表单数据
    const className = req.query.className;
    const sql1 = `select * from user where userType = '学生' and className='${className}' order by uid asc`;
    const sql2 = `select * from classes where classes = '${className}'`;
    db.query(sql1+';'+sql2, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取学生信息失败！' });
        }
        // console.log(results,'-------');
        res.send({
            status: 0,
            student: results[0],
            classInfo: results[1][0]
        })
    });
});

// $route   GET /applyResult  [需要进行身份验证]
// @desc    获取返校外出申请记录
// @access  public
router.get('/applyResult', (req, res) => {
    const sql1 = `select * from btsApply where uid = '${req.user.uid}' and backDate = '${req.query.date}' and state = '审核通过'`;
    const sql2 = `select * from outApply where uid = '${req.user.uid}' and outTime = '${req.query.date}' and state = '审核通过'`;
    // console.log(sql1, sql2);
    db.query(sql1+';'+sql2, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取返校外出申请记录失败！' });
        }
        // console.log(results,'-------');
        res.send({
            status: 0,
            btsApply: results[0],
            outApply: results[1]
        })
    });
});

module.exports = router;