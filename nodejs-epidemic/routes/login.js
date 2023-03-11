const express = require('express');
const router = express.Router();
const db = require('../db/index'); // 导入数据库连接对象
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken');

// $route   POST api/login
// @desc    登录
// @access  public
router.post('/login', (req, res) => {
    // 接收表单数据
    const userInfo = req.body;
    // console.log(userInfo);
    // 判断数据是否合法
    // 判断账号和密码是否为空
    if (!userInfo.uid || !userInfo.upwd) {
        return res.send({ status: 1, message: '账号或密码不能为空！' })
    }
    // 判断账号是否为10位数字
    if (!(/^\d{10}$/.test(userInfo.uid))) {
        return res.send({ status: 1, message: '账号格式不正确！' })
    }
    // 判断账号对应用户是否存在
    const sql = `select * from user where uid='${userInfo.uid}'`;
    // 执行 SQL 语句，查询用户的数据
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err){
            console.log(err.message);
            return res.send({ status: 1, message: '登录失败！' });
        }
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.send({ status: 1, message: '账号对应用户不存在！' })
        // 判断用户输入的登录密码是否和数据库中的密码一致
        if (results[0].upwd !== userInfo.upwd) return res.send({ status: 1, message: '密码不正确！' })

        // 登录成功，在服务器端生成 Token 的字符串
        const user = { ...results[0], upwd: '' };
        // 对用户的信息进行加密，生成 Token 字符串, 后两个参数分别是：加密和还原Token的jwtSecretKey字符串 和 token有效期为 24 个小时
        const tokenStr = jwt.sign(user, 'cheng try @_@', { expiresIn: '24h' });
        // 调用 res.send() 将 Token 响应给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
            userInfo: user,
        })
    })
})

module.exports = router;