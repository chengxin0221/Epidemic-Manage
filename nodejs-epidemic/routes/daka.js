const express = require('express');
const router = express.Router();
const db = require('../db/index'); // 导入数据库连接对象

// $route   POST /addDaka  [需要进行身份验证]
// @desc    向数据库添加打卡信息
// @access  public
router.post('/addDaka', (req, res) => {
    // 接收表单数据
    const daka = req.body;
    // 手机号码 
    if(!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(daka.phone))
    return res.send({
        status: 1,
        message: '电话号码格式错误！'
    });
    if(daka.sickness === '否') {
        daka.confirm = '';
        daka.rescure = '';
    }
    // 添加公告信息
    const sql = `insert into daka(uid,uname,className,date,temperature,vaccine,sickness,confirm,rescure,address,residence,phone) values('${daka.uid}','${daka.uname}','${daka.className}','${daka.date}','${daka.temperature}','${daka.vaccine}','${daka.sickness}','${daka.confirm}','${daka.rescure}','${daka.address}','${daka.residence}','${daka.phone}')`;
    // console.log(sql)
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '出错了，请重新打卡！' });
        }
        res.send({
            status: 0,
            message: '打卡成功！'
        })
    });
});

// $route   GET /daka  [需要进行身份验证]
// @desc    查询打卡信息
// @access  public
router.get('/daka', (req, res) => {
    // 接收表单数据
    const uid = req.query.uid;
    const sql = `select * from daka where uid='${uid}' order by date desc`;
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取打卡记录失败！' });
        }
        res.send({
            status: 0,
            daka: results
        })
    });
});

// $route   GET /dakaSituation  [需要进行身份验证]
// @desc    查询学生打卡情况
// @access  public
router.get('/dakaSituation', (req, res) => {
    // 接收表单数据
    const classList = req.query.className.split(',');
    let str = '';
    classList.forEach(item => {
        str += '\'' + item + '\','
    });
    // 查询未打卡学生
    const sql1 = `select user.uid, user.uname, user.className from user where userType = '学生' and className in (${str.slice(0, -1)}) and not exists (select date from daka where user.uid = daka.uid and date = '${req.query.today}') order by uid asc`;
    // 查询管理班级所有学生
    const sql2 = `select * from user where userType = '学生' and className in (${str.slice(0, -1)})`;
    // 查询已打卡学生
    const sql3 = `select * from daka where className in (${str.slice(0, -1)}) and date = '${req.query.today}' order by uid asc`;
    db.query(sql1+';'+sql2+';'+sql3, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取学生打卡情况失败！' });
        }
        // console.log(results);
        res.send({
            status: 0,
            studentList: results[0],
            studentCount: results[1].length,
            haddaka: results[2]
        })
    });
});

// $route   GET /allDakaSituation  [需要进行身份验证]
// @desc    查询全校以及学院学生打卡情况
// @access  public
router.get('/allDakaSituation', (req, res) => {
    // console.log(req.query,'========q==');
    // 查询全校已打卡学生
    const sql1 = `select count(uid) as hadDaka from daka where date = '${req.query.today}'`;
    // 查询全校所有学生
    const sql2 = `select count(uid) as allStuCount from user where userType = '学生'`;
    // 查询某学院学生人数
    const sql3 = `select college, count(uid) as stuCount from user where userType = '学生' and college = '${req.query.college}'`;
    // 查询某学院已打卡学生
    const sql4 = `select daka.className, daka.uname, classes.college from daka inner join classes on daka.date = '${req.query.today}' and daka.className = classes.classes and classes.college = '${req.query.college}' order by uid asc`;
    db.query(sql1+';'+sql2+';'+sql3+';'+sql4, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取学生打卡情况失败！' });
        }
        // console.log(results,'==========');
        let allDakaRate = results[0][0].hadDaka !== 0 ? (results[0][0].hadDaka / results[1][0].allStuCount).toFixed(2) : 0;
        let colDakaRate = results[3].length !== 0 ? (results[3].length / results[2][0].stuCount).toFixed(2) : 0;
        // console.log(allDakaRate,'====', colDakaRate);
        res.send({
            status: 0,
            hadDaka: results[0][0].hadDaka,
            allStuCount: results[1][0].allStuCount,
            colStuCount: results[2][0].stuCount,
            colHadDaka: results[3].length,
            allDakaRate: allDakaRate,
            colDakaRate: colDakaRate
        })
    });
});

// $route   GET /schoolDakaReport  [需要进行身份验证]
// @desc    查询全校学生打卡详细情况报告
// @access  public
router.get('/schoolDakaReport', (req, res) => {
    // console.log(req.query,'========sc==');
    // 查询全校发热学生名单
    const sql1 = `select * from daka where date = '${req.query.date}' and temperature = '发热' order by uid asc`;
    // 查询全校未完成3针疫苗接种学生名单
    const sql2 = `select * from daka where date = '${req.query.date}' and vaccine not in ('已完成') order by uid asc`;
    // 查询全校曾经或当前确诊或疑似感染新冠学生名单
    const sql3 = `select * from daka where date = '${req.query.date}' and sickness = '是' order by uid asc`;
    // 查询全校经检测确诊学生名单
    const sql4 = `select * from daka where date = '${req.query.date}' and confirm = '是' order by uid asc`;
    // 查询全校已康复学生名单
    const sql5 = `select * from daka where date = '${req.query.date}' and rescure = '已康复' order by uid asc`;
    // 查询全校未康复学生名单
    const sql6 = `select * from daka where date = '${req.query.date}' and rescure = '未康复' order by uid asc`;
    db.query(sql1+';'+sql2+';'+sql3+';'+sql4+';'+sql5+';'+sql6, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取学生打卡详细情况报告失败！' });
        }
        // console.log(results,'==========');
        res.send({
            status: 0,
            hot: results[0],
            vaccine: results[1],
            sickness: results[2],
            confirmSick: results[3],
            rescure: results[4],
            notRescure: results[5]
        })
    });
});

// $route   GET /collegeDakaReport  [需要进行身份验证]
// @desc    查询某学院学生打卡详细情况报告
// @access  public
router.get('/collegeDakaReport', (req, res) => {
    // console.log(req.query,'========col==');
    // 查询某学院发热学生名单
    const sql1 = `select daka.*, classes.college from daka inner join classes on daka.date = '${req.query.date}' and daka.temperature = '发热' and daka.className = classes.classes and classes.college = '${req.query.college}' order by uid asc`;
    // 查询某学院未完成3针疫苗接种学生名单
    const sql2 = `select daka.*, classes.college from daka inner join classes on daka.date = '${req.query.date}' and daka.vaccine not in ('已完成') and daka.className = classes.classes and classes.college = '${req.query.college}' order by uid asc`;
    // 查询某学院曾经或当前确诊或疑似感染新冠学生名单
    const sql3 = `select daka.*, classes.college from daka inner join classes on daka.date = '${req.query.date}' and daka.sickness = '是' and daka.className = classes.classes and classes.college = '${req.query.college}' order by uid asc`;
    // 查询某学院经检测确诊学生名单
    const sql4 =`select daka.*, classes.college from daka inner join classes on daka.date = '${req.query.date}' and daka.confirm = '是' and daka.className = classes.classes and classes.college = '${req.query.college}' order by uid asc`;
    // 查询某学院已康复学生名单
    const sql5 = `select daka.*, classes.college from daka inner join classes on daka.date = '${req.query.date}' and daka.rescure = '已康复' and daka.className = classes.classes and classes.college = '${req.query.college}' order by uid asc`;
    // 查询某学院未康复学生名单
    const sql6 = `select daka.*, classes.college from daka inner join classes on daka.date = '${req.query.date}' and daka.rescure = '未康复' and daka.className = classes.classes and classes.college = '${req.query.college}' order by uid asc`;
    db.query(sql1+';'+sql2+';'+sql3+';'+sql4+';'+sql5+';'+sql6, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取学生打卡详细情况报告失败！' });
        }
        // console.log(results,'==========');
        res.send({
            status: 0,
            hot: results[0],
            vaccine: results[1],
            sickness: results[2],
            confirmSick: results[3],
            rescure: results[4],
            notRescure: results[5]
        })
    });
});

// $route   GET /classDakaReport  [需要进行身份验证]
// @desc    查询某班级学生打卡详细情况报告
// @access  public
router.get('/classDakaReport', (req, res) => {
    // console.log(req.query,'========cla==');
    let str = req.query.classList.slice(1,-1);
    // 查询某学院发热学生名单
    const sql1 = `select * from daka where date = '${req.query.date}' and temperature = '发热' and className in (${str}) order by uid asc`;
    // 查询某学院未完成3针疫苗接种学生名单
    const sql2 = `select * from daka where date = '${req.query.date}' and vaccine not in ('已完成') and className in (${str}) order by uid asc`;
    // 查询某学院曾经或当前确诊或疑似感染新冠学生名单
    const sql3 = `select * from daka where date = '${req.query.date}' and sickness = '是' and className in (${str}) order by uid asc`;
    // 查询某学院经检测确诊学生名单
    const sql4 =`select * from daka where date = '${req.query.date}' and confirm = '是' and className in (${str}) order by uid asc`;
    // 查询某学院已康复学生名单
    const sql5 = `select * from daka where date = '${req.query.date}' and rescure = '已康复' and className in (${str}) order by uid asc`;
    // 查询某学院未康复学生名单
    const sql6 = `select * from daka where date = '${req.query.date}' and rescure = '未康复' and className in (${str}) order by uid asc`;
    db.query(sql1+';'+sql2+';'+sql3+';'+sql4+';'+sql5+';'+sql6, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: '获取学生打卡详细情况报告失败！' });
        }
        // console.log(results,'==========');
        res.send({
            status: 0,
            hot: results[0],
            vaccine: results[1],
            sickness: results[2],
            confirmSick: results[3],
            rescure: results[4],
            notRescure: results[5]
        })
    });
});

module.exports = router;