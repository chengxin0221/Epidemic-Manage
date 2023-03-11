const express = require('express');
const router = express.Router();
// 导入数据库操作模块
const db = require('../db/index');

// $route   GET /api/college  [不需要进行身份验证]
// @desc    查询学院信息
// @access  public
router.get('/api/college', (req, res) => {
    const sql = `select college from college`;
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取信息失败！' });
        }
        // console.log(results, '----college');
        let college = [];
        results.forEach(item => {
            college.push(item.college)
        })
        return res.send({
            status: 0,
            college: college
        })
    });
});

// $route   GET /api/professional  [不需要进行身份验证]
// @desc    查询某学院所有专业信息
// @access  public
router.get('/api/professional', (req, res) => {
    const sql = `select professional from professional where college = '${req.query.college}'`;
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取信息失败！' });
        }
        // console.log(results, '----professional');
        let professional = [];
        results.forEach(item => {
            professional.push(item.professional)
        })
        return res.send({
            status: 0,
            professional: professional
        })
    });
});

// $route   GET /api/classes  [不需要进行身份验证]
// @desc    查询某学院某专业所有班级信息
// @access  public
router.get('/api/classes', (req, res) => {
    // console.log(req.query,'--------')
    // 请求参数带有 professional 搜索该专业的所有班级
    let sql = `select classes from classes where college = '${req.query.college}' and professional = '${req.query.professional}'`;
    if (!req.query.professional) {
        // 请求参数不带 professional 搜索该学院没有班主任的班级
        sql = `select classes from classes where college = '${req.query.college}' and teacher = ''`;
    }
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取信息失败！' });
        }
        // console.log(results, '------classes');
        let classes = [];
        results.forEach(item => {
            classes.push(item.classes)
        })
        return res.send({
            status: 0,
            classes: classes
        })
    });
});

// $route   POST /addcollege  [需要进行身份验证]
// @desc    添加学院信息
// @access  public
router.post('/addcollege', (req, res) => {
    // 接收表单数据
    const data = req.body;
    // 获取数据库中最大的一个学院id
    let sql = `select id from college order by id desc limit 1`;
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '添加失败！' });
        }
        // console.log(results, '----------addcollege');
        let id = parseInt(results[0].id) + 1;
        sql = `insert into college(id,college) value('${id}', '${data.college}')`;
        db.query(sql, function (err, results) {
            // 执行 SQL 语句失败
            if (err) {
                console.log(err.message);
                return res.send({ status: 1, message: '添加失败！' });
            }
            return res.send({
                status: 0,
                message: '添加学院成功！'
            })
        });
    });
});

// $route   POST /addprofessional  [需要进行身份验证]
// @desc    添加专业信息
// @access  public
router.post('/addprofessional', (req, res) => {
    // 接收表单数据
    const data = req.body;
    // 获取数据库中该学院最大的一个专业id
    let sql = `select id from professional where college = '${data.college}' order by id desc limit 1`;
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '添加失败！' });
        }
        // console.log(results, '--------addprofessional');
        // 该学院还没有专业
        if (results.length === 0) {
            sql = `select id from college where college = '${data.college}'`;
            db.query(sql, function (err, results) {
                // 执行 SQL 语句失败
                if (err) {
                    console.log(err.message);
                    return res.send({ status: 1, message: '添加失败！' });
                }
                if (results.length === 0) return res.send({ status: 1, message: '出错了，该学院不存在！' });
                let id = results[0].id + 1;
                sql = `insert into professional(id,professional,college) value('${id}', '${data.professional}' , '${data.college}')`;
                db.query(sql, function (err, results) {
                    // 执行 SQL 语句失败
                    if (err) {
                        console.log(err.message);
                        return res.send({ status: 1, message: '添加失败！' });
                    }
                    return res.send({
                        status: 0,
                        message: '添加专业成功！'
                    })
                });
            })
        } else {
            // 该学院存在专业
            let id = parseInt(results[0].id) + 1;
            sql = `insert into professional(id,professional,college) value('${id}', '${data.professional}' , '${data.college}')`;
            db.query(sql, function (err, results) {
                // 执行 SQL 语句失败
                if (err) {
                    console.log(err.message);
                    return res.send({ status: 1, message: '添加失败！' });
                }
                return res.send({
                    status: 0,
                    message: '添加专业成功！'
                })
            });
        }
    });
});

// $route   POST /addclass  [需要进行身份验证]
// @desc    添加班级信息
// @access  public
router.post('/addclass', (req, res) => {
    // 接收表单数据
    const data = req.body;
    // 获取数据库中该学院该专业的班级的id和班级名称
    let sql = `select id,classes from classes where college = '${data.college}' and professional = '${data.professional}' order by id desc`;
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '添加失败！' });
        }
        // console.log(results, '--------addclass');
        // 该学院该专业还没有班级
        if (results.length === 0) {
            sql = `select id from professional where college = '${data.college}' and professional = '${data.professional}'`;
            db.query(sql, function (err, results) {
                // 执行 SQL 语句失败
                if (err) {
                    console.log(err.message);
                    return res.send({ status: 1, message: '添加失败！' });
                }
                // console.log(results,'---------addclass');
                if (results.length === 0) return res.send({ status: 1, message: '出错了，该专业不存在！' });
                let id = data.year + results[0].id + 1;
                let className = data.year.slice(-2,) + data.professional + '1班';
                sql = `insert into classes(id,classes,professional,college) value('${id}', '${className}', '${data.professional}' , '${data.college}')`;
                db.query(sql, function (err, results) {
                    // 执行 SQL 语句失败
                    if (err) {
                        console.log(err.message);
                        return res.send({ status: 1, message: '添加失败！' });
                    }
                    return res.send({
                        status: 0,
                        className: className,
                        message: '添加专业成功！'
                    })
                });
            })
        } else {
            // 该学院该专业存在班级
            let id = '';
            let className = '';
            for (let i = 0; i < results.length; i++) {
                if (results[i].id.slice(0, 4) === data.year) {
                    id = results[i].id;
                    break;
                }
            }
            // id为空表示没有该年份的班级
            if (!id) {
                id = data.year + results[results.length - 1].id.slice(4,);
                className = data.year.slice(-2,) + results[0].classes.slice(2, -2) + '1班';
            } else {
                // 有该年份的班级
                id = parseInt(id) + 1;
                className = data.year.slice(-2,) + results[0].classes.slice(2, -2) + id.toString().slice(-1,) + '班';
            }
            sql = `insert into classes(id, classes, professional,college) value('${id}', '${className}', '${data.professional}' , '${data.college}')`;
            db.query(sql, function (err, results) {
                // 执行 SQL 语句失败
                if (err) {
                    console.log(err.message);
                    return res.send({ status: 1, message: '添加失败！' });
                }
                return res.send({
                    status: 0,
                    className: className,
                    message: '添加专业成功！'
                })
            });
        }
    });
});

// $route   GET /delcollege  [需要进行身份验证]
// @desc    删除学院信息
// @access  public
router.get('/delcollege', (req, res) => {
    let sql = `select * from professional where college = '${req.query.college}'`;
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '删除失败！' });
        }
        if (results.length !== 0) return res.send({ status: 1, message: '删除失败，该学院下存在专业请先将专业删除！' });
        sql = `delete from college where college = '${req.query.college}'`;
        db.query(sql, function (err, results) {
            // 执行 SQL 语句失败
            if (err) {
                console.log(err.message);
                return res.send({ status: 1, message: '删除失败！' });
            }
            return res.send({
                status: 0,
                message: '删除学院成功！'
            })
        });
    });
});

// $route   GET /delprofessional  [需要进行身份验证]
// @desc    删除专业信息
// @access  public
router.get('/delprofessional', (req, res) => {
    let sql = `select * from classes where college = '${req.query.college}' and professional = '${req.query.professional}'`;
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '删除失败！' });
        }
        if (results.length !== 0) return res.send({ status: 1, message: '删除失败，该专业下存在班级请先将班级删除！' });
        sql = `delete from professional where college = '${req.query.college}' and professional = '${req.query.professional}'`;
        db.query(sql, function (err, results) {
            // 执行 SQL 语句失败
            if (err) {
                console.log(err.message);
                return res.send({ status: 1, message: '删除失败！' });
            }
            return res.send({
                status: 0,
                message: '删除专业成功！'
            })
        });
    });
});

// $route   GET /delclass  [需要进行身份验证]
// @desc    删除班级信息
// @access  public
router.get('/delclass', (req, res) => {
    let sql = `select * from user where college = '${req.query.college}' and professional = '${req.query.professional}' and className = '${req.query.classes}'`;
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '删除失败！' });
        }
        if (results.length !== 0) return res.send({ status: 1, message: '删除失败，还有学生在该班级中请先将学生移出该班级！' });
        sql = `delete from classes where college = '${req.query.college}' and professional = '${req.query.professional}' and classes = '${req.query.classes}'`;
        db.query(sql, function (err, results) {
            // 执行 SQL 语句失败
            if (err) {
                console.log(err.message);
                return res.send({ status: 1, message: '删除失败！' });
            }
            return res.send({
                status: 0,
                message: '删除班级成功！'
            })
        });
    });
});

module.exports = router;