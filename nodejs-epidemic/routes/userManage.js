const express = require('express');
const router = express.Router();
// 导入数据库操作模块
const db = require('../db/index');

// $route   GET /api/teacher  [不需要进行身份验证]
// @desc    查询班级班主任信息
// @access  public
router.get('/api/teacher', (req, res) => {
    const sql = `select * from user where userType = '教师' and className like '%${req.query.classes}%'`;
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取信息失败！' });
        }
        // console.log(results, '----teacher');
        if (results.length === 0) return res.send({ status: 1, message: '该班级暂未有班主任！' });
        return res.send({
            status: 0,
            teacher: results[0]
        })
    });
});

// $route   GET /api/teacherlist  [不需要进行身份验证]
// @desc    查询学院教师列表
// @access  public
router.get('/api/teacherlist', (req, res) => {
    const sql = `select * from user where userType = '教师' and college = '${req.query.college}'`;
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取信息失败！' });
        }
        // console.log(results, '----teacherlist');
        if (results.length === 0) return res.send({ status: 1, message: '该学院暂未有教师信息！' });
        return res.send({
            status: 0,
            teacherList: results
        })
    });
});

// $route   GET /addteacher [需要进行身份验证]
// @desc    添加教师用户
// @access  public
router.post('/addteacher', (req, res) => {
    const userInfo = req.body;
    // console.log(userInfo,'------------');
    let sql = `select uid from user where userType='${userInfo.userType}' and college = '${userInfo.college}' order by uid desc`;
    db.query(sql, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({
                status: 1,
                message: '添加用户失败！'
            });
        }
        // console.log(results, '-------user--');
        // 该学院还没有教师
        if (results.length === 0) {
            // 查询学院信息
            sql = `select * from college where college = '${userInfo.college}'`;
            db.query(sql, (err, results) => {
                // 执行 SQL 语句失败
                if (err) {
                    console.log(err.message);
                    return res.send({
                        status: 1,
                        message: '添加用户失败！'
                    });
                }
                // console.log(results, '-------col--');
                if (results.length !== 1) return res.send({ status: 1, message: '出错了，添加用户失败！' });
                // 学院下还没有教师，则账号 等于 入职年份+学院id+0001
                let id = userInfo.year + results[0].id + '0001';
                sql = `insert into user(uid,uname,upwd,userType,className,college) value('${id}','${userInfo.name}','${userInfo.pwd}','${userInfo.userType}','${userInfo.classes}','${userInfo.college}')`;
                // console.log(sql,'-------1');
                db.query(sql, (err, results) => {
                    // 执行 SQL 语句失败
                    if (err) {
                        console.log(err.message);
                        return res.send({
                            status: 1,
                            message: '添加用户失败！'
                        });
                    }
                    if (userInfo.classes !== undefined) {
                        const classList = userInfo.classes.split(',');
                        let str = '';
                        classList.forEach(item => {
                            str += '\'' + item + '\','
                        });
                        sql = `update classes set teacher = '${id}' where classes in (${str.slice(0, -1)})`;
                        // console.log(sql, '-------3');
                        db.query(sql, (err, results) => {
                            // 执行 SQL 语句失败
                            if (err) {
                                console.log(err.message);
                                return res.send({
                                    status: 1,
                                    message: '添加用户成功，但为班级标记班主任失败！'
                                });
                            }
                            return res.send({
                                status: 0,
                                message: '添加用户成功！'
                            })
                        })
                    } else {
                        return res.send({
                            status: 0,
                            message: '添加用户成功！'
                        })
                    }
                })
            });
        } else {
            // 学院下已经有教师了
            let id = '';
            for (let i = 0; i < results.length; i++) {
                // 已有教师中是否有与要添加的教师的入职年份一致的
                if (results[i].uid.slice(0, 4) === userInfo.year) {
                    // 有一致的则 账号 等于 该入职年份中id最大的一个+1
                    id = (parseInt(results[0].uid) + 1).toString();
                    break;
                }
            }
            // 没有一致的则 账号 等于 入职年份 + 学院id + 001
            if (id === '') id = userInfo.year + results[0].uid.slice(4, -3) + '001';
            sql = `insert into user(uid,uname,upwd,userType,className,college) value('${id}','${userInfo.name}','${userInfo.pwd}','${userInfo.userType}','${userInfo.classes}','${userInfo.college}')`;
            // console.log(sql, '------2');
            db.query(sql, (err, results) => {
                // 执行 SQL 语句失败
                if (err) {
                    console.log(err.message);
                    return res.send({
                        status: 1,
                        message: '添加用户失败！'
                    });
                }
                if (userInfo.classes !== undefined) {
                    const classList = userInfo.classes.split(',');
                    let str = '';
                    classList.forEach(item => {
                        str += '\'' + item + '\','
                    });
                    sql = `update classes set teacher = '${id}' where classes in (${str.slice(0, -1)})`;
                    // console.log(sql, '-------3');
                    db.query(sql, (err, results) => {
                        // 执行 SQL 语句失败
                        if (err) {
                            console.log(err.message);
                            return res.send({
                                status: 1,
                                message: '添加用户成功，但为班级标记班主任失败！'
                            });
                        }
                        return res.send({
                            status: 0,
                            message: '添加用户成功！'
                        })
                    })
                } else {
                    return res.send({
                        status: 0,
                        message: '添加用户成功！'
                    })
                }
            })
        }
    })
});

// $route   GET /addstudent [需要进行身份验证]
// @desc    添加学生用户
// @access  public
router.post('/addstudent', (req, res) => {
    const userInfo = req.body;
    // console.log(userInfo,'------------');
    let sql = `select uid from user where userType='${userInfo.userType}' and className = '${userInfo.className}' order by uid desc limit 1`;
    db.query(sql, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({
                status: 1,
                message: '添加用户失败！'
            });
        }
        // console.log(results, '-------user--');
        // 该班级还没有学生
        if (results.length === 0) {
            sql = `select * from classes where classes = '${userInfo.className}'`;
            db.query(sql, (err, results) => {
                // 执行 SQL 语句失败
                if (err) {
                    console.log(err.message);
                    return res.send({
                        status: 1,
                        message: '添加用户失败！'
                    });
                }
                // console.log(results, '---------');
                if (results.length !== 1) return res.send({ status: 1, message: '出错了，添加用户失败！' });
                let id = results[0].id + '01';
                sql = `insert into user(uid,uname,upwd,userType,className,professional,college) value('${id}','${userInfo.name}','${userInfo.pwd}','${userInfo.userType}','${userInfo.className}','${userInfo.professional}','${userInfo.college}')`;
                // console.log(sql,'-------1');
                db.query(sql, (err, results) => {
                    // 执行 SQL 语句失败
                    if (err) {
                        console.log(err.message);
                        return res.send({
                            status: 1,
                            message: '添加用户失败！'
                        });
                    }
                    return res.send({
                        status: 0,
                        message: '添加用户成功！'
                    })
                })
            });
        } else {
            let id = (parseInt(results[0].uid) + 1).toString();
            sql = `insert into user(uid,uname,upwd,userType,className,professional,college) value('${id}','${userInfo.name}','${userInfo.pwd}','${userInfo.userType}','${userInfo.className}','${userInfo.professional}','${userInfo.college}')`;
            // console.log(sql, '------2');
            db.query(sql, (err, results) => {
                // 执行 SQL 语句失败
                if (err) {
                    console.log(err.message);
                    return res.send({
                        status: 1,
                        message: '添加用户失败！'
                    });
                }
                return res.send({
                    status: 0,
                    message: '添加用户成功！'
                })
            })
        }
    })
});

// $route   GET /deluser  [需要进行身份验证]
// @desc    删除用户信息
// @access  public
router.get('/deluser', (req, res) => {
    let sql = '';
    let str = req.query.delList.slice(1, -1);
    if (req.query.dataType === '教师') {
        sql = `update classes set teacher = '' where teacher in (${str})`;
        sql += ';' + `delete from user where uid in (${str})`;
        // console.log(sql, '-----delteacher');
    } else {
        sql = `delete from user where uid in (${str})`;
        sql += ';' + `delete from btsapply where uid in (${str})`;
        sql += ';' + `delete from outapply where uid in (${str})`;
        sql += ';' + `delete from daka where uid in (${str})`;
        // console.log(sql, '-------delstudent');
    }
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '删除失败！' });
        }
        return res.send({
            status: 0,
            message: '删除用户成功！'
        })
    });
});

// $route   GET /searchuser  [需要进行身份验证]
// @desc    搜索用户信息
// @access  public
router.get('/searchuser', (req, res) => {
    let sql = '';
    if (req.query.userType === '教师') {
        sql = `select * from user where userType = '教师' and college = '${req.query.college}' and (uid like '%${req.query.search}%' or uname like '%${req.query.search}%') order by uid asc`;
    } else {
        sql = `select * from user where userType = '学生' and className = '${req.query.classes}' and (uid like '%${req.query.search}%' or uname like '%${req.query.search}%') order by uid asc`;
    }
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '搜索失败！' });
        }
        // 本院或本班搜索结果
        return res.send({
            status: 0,
            dataList: results,
            message: '搜索成功！'
        })
    });
});

module.exports = router;