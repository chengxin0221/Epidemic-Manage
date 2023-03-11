const express = require('express');
const router = express.Router();
const fs = require('fs');
// 导入数据库操作模块
const db = require('../db/index');

// $route   GET /userInfo [需要进行身份验证]
// @desc    返回个人信息数据
// @access  public
router.get('/userInfo', (req, res) => {
    // 根据用户的 id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    const sql = `select uid, uname, upwd, userType, college, professional, className, phone, residence, img from user where uid=?`
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, req.user.uid, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({
                status: 1,
                message: '获取个人信息失败！'
            });
        }
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.send({
            status: 1,
            message: '获取个人信息失败！'
        })
        // 3. 将用户信息响应给客户端
        return res.send({
            status: 0,
            message: '获取个人信息成功！',
            userInfo: results[0],
        })
    })
});

// $route   POST /editUserInfo [需要进行身份验证]
// @desc    编辑个人信息
// @access  public
router.post('/editUserInfo', (req, res) => {
    const userInfo = req.body;
    // 手机号码 
    if (userInfo.phone && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(userInfo.phone))
        return res.send({
            status: 1,
            message: '电话号码格式错误！'
        });
    // 修改后要删除的班级
    let delClass = [];
    // 修改后要添加的班级
    let addClass = [];
    if (userInfo.img === 'null') userInfo.img = '';
    // console.log(userInfo, '------------userInfo');
    // 登录用户修改自己的个人信息
    let sql = `update user set uname = '${userInfo.uname}', phone = '${userInfo.phone}', residence = '${userInfo.residence}', img = '${userInfo.img}' where uid = '${userInfo.uid}'`;
    // 班主任修改学生信息
    if (userInfo.editor === '教师') sql = `update user set upwd='${userInfo.upwd}', uname = '${userInfo.uname}', className = '${userInfo.className}', phone = '${userInfo.phone}', residence = '${userInfo.residence}' where uid = '${userInfo.uid}'`;
    // 管理员修改用户信息
    if (userInfo.editor === '管理员') {
        if (userInfo.userType === '教师') {
            sql = `update user set upwd='${userInfo.upwd}',uname='${userInfo.uname}',className='${userInfo.newClassName}',college='${userInfo.college}',phone='${userInfo.phone}',residence='${userInfo.residence}' where uid = '${userInfo.uid}'`;
        } else {
            sql = `update user set upwd='${userInfo.upwd}',uname='${userInfo.uname}',className='${userInfo.className}',professional='${userInfo.professional}',college='${userInfo.college}',phone='${userInfo.phone}',residence='${userInfo.residence}' where uid = '${userInfo.uid}'`;
        }
    }
    // console.log(sql,'-----------');
    db.query(sql, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({
                status: 1,
                message: '编辑个人信息失败！'
            });
        }
        if (userInfo.editor === '管理员' && userInfo.userType === '教师') {
            // 原来的班级
            let oldlist = userInfo.className ? userInfo.className.split(',') : [];
            // 修改后的班级
            let newlist = userInfo.newClassName ? userInfo.newClassName.split(',') : [];
            // 教师没有管理的班级
            if (oldlist.length === 0 && newlist.length === 0) {
                return res.send({
                    status: 0,
                    message: '编辑个人信息成功！'
                })
            } else {
                // 原班级有的，新班级没有的
                delClass = [...new Set([...oldlist].filter(x => !newlist.includes(x)))];
                // 新班级有的，原班级没有的
                addClass = [...new Set([...newlist].filter(x => !oldlist.includes(x)))];
                let del = '';
                let add = '';
                delClass.forEach(item => {
                    del += '\'' + item + '\','
                });
                addClass.forEach(item => {
                    add += '\'' + item + '\','
                });
                // delClass和addClass为空，则原班级和新班级相等
                if (delClass.length === 0 && addClass.length === 0) {
                    return res.send({
                        status: 0,
                        message: '编辑个人信息成功！'
                    })
                }
                // console.log(delClass, addClass, '---------------change');
                if (delClass.length === 0) {
                    // 要删除的班级为空
                    sql = `update classes set teacher = '${userInfo.uid}' where classes in (${add.slice(0, -1)})`;
                } else if (addClass.length === 0) {
                    // 要添加的班级为空
                    sql = `update classes set teacher = '' where classes in (${del.slice(0, -1)})`;
                } else {
                    // 既有要删除的又有要添加的班级
                    sql = `update classes set teacher = '' where classes in (${del.slice(0, -1)})` + ';' + `update classes set teacher = '${userInfo.uid}' where classes in (${add.slice(0, -1)})`;
                }
                // console.log(sql, '----------update class');
                db.query(sql, (err, results) => {
                    // 执行 SQL 语句失败
                    if (err) {
                        console.log(err.message);
                        return res.send({
                            status: 1,
                            message: '编辑个人信息失败！'
                        });
                    }
                    return res.send({
                        status: 0,
                        message: '编辑个人信息成功！'
                    })
                })
            }
        } else {
            // 登录用户的个人信息
            // 如果要删除的图片不为空
            if (userInfo.delImg) {
                try {
                    // console.log(userInfo.delImg.replace(/http:\/\/([^\/]*)\/api\//g,'static/'),'---');
                    fs.unlinkSync(userInfo.delImg.replace(/http:\/\/([^\/]*)\/api\//g, 'static/'))
                } catch (error) {
                    console.log('编辑个人信息成功，但删除内存中原头像图片失败！')
                }
                return res.send({
                    status: 0,
                    message: '编辑个人信息成功！'
                })
            } else {
                return res.send({
                    status: 0,
                    message: '编辑个人信息成功！'
                })
            }
        }
    })
});

// $route   GET /editAdminClass [需要进行身份验证]
// @desc    编辑教师管理的班级
// @access  public
router.get('/editAdminClass', (req, res) => {
    const userInfo = req.query;
    // console.log(userInfo, '------------');
    let adminClass = userInfo.className.split(',');
    // 是最后一个
    if (userInfo.delClass === adminClass[adminClass.length - 1]) adminClass.pop()
    // 不是最后一个
    else {
        for (let i = 1; i < adminClass.length; i++) {
            if (userInfo.delClass === adminClass[i - 1]) {
                adminClass[i - 1] = adminClass[i]
            }
        }
        adminClass.pop()
    }
    let sql = `update user set className = '${adminClass.toString()}' where uid = '${userInfo.uid}'`;
    db.query(sql, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({
                status: 1,
                message: '删除管理班级失败！'
            });
        }
        sql = `update classes set teacher = '' where teacher = '${userInfo.uid}' and classes = '${userInfo.delClass}'`;
        db.query(sql, (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                console.log(err.message);
                return res.send({
                    status: 1,
                    message: '删除管理班级成功，但修改班级的班主任标签失败！'
                });
            }
            return res.send({
                status: 0,
                message: '删除管理班级成功！',
                classList: adminClass
            })
        })
    })
});

// $route   GET /modifypwd [需要进行身份验证]
// @desc    修改密码
// @access  public
router.post('/modifypwd', (req, res) => {
    const data = req.body;
    const sql1 = `select * from user where uid = '${data.uid}' and upwd = '${data.pwd}'`;
    const sql2 = `update user set upwd = '${data.pwd1}' where uid = '${data.uid}'`;
    db.query(sql1, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({
                status: 1,
                message: '修改密码失败！'
            });
        }
        if (results.length !== 1) return res.send({
            status: 1,
            message: '账号或原密码不正确！'
        })
        // console.log(results[0]);
        db.query(sql2, (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                console.log(err.message);
                return res.send({
                    status: 1,
                    message: '修改密码失败！'
                });
            }
            return res.send({
                status: 0,
                message: '修改密码成功！'
            })
        })
    })
});

module.exports = router;