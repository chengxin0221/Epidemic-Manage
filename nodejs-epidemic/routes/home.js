const express = require('express');
const router = express.Router();
const db = require('../db/index'); // 导入数据库连接对象
const baseUrl = require('../tools/getBaseUrl'); //获取根路径

// 首页最上方图片
var topImg = baseUrl + "/images/fk1.jpg";

// 服务图片信息和服务名称
// 学生服务
var studentService = [{
    name: "疫情资讯",
    img: baseUrl + "/icons/epidemic2.png"
},
{
    name: "公告",
    img: baseUrl + "/icons/news.png"
},
{
    name: "健康打卡",
    img: baseUrl + "/icons/health1.png"
},
{
    name: "返校/外出",
    img: baseUrl + "/icons/school1.png"
},
{
    name: "申请记录",
    img: baseUrl + "/icons/application1.png"
},
{
    name: "二维码",
    img: baseUrl + "/icons/qrcode.png"
}
];
// 教师服务
var teacherService = [{
    name: "疫情资讯",
    img: baseUrl + "/icons/epidemic2.png"
},
{
    name: "公告",
    img: baseUrl + "/icons/news.png"
},
{
    name: "申请审批",
    img: baseUrl + "/icons/examination1.png"
},
{
    name: "健康日报",
    img: baseUrl + "/icons/daily.png"
},
{
    name: "管理班级",
    img: baseUrl + "/icons/class1.png"
}];
// 管理员服务
var adminService = [{
    name: "疫情资讯",
    img: baseUrl + "/icons/epidemic2.png"
},
{
    name: "公告",
    img: baseUrl + "/icons/news.png"
},
{
    name: "审批记录",
    img: baseUrl + "/icons/examination1.png"
},
{
    name: "健康情况",
    img: baseUrl + "/icons/daily.png"
},
{
    name: "用户管理",
    img: baseUrl + "/icons/user.png"
},
{
    name: "发布公告",
    img: baseUrl + "/icons/notice1.png"
},
{
    name: "发布资讯",
    img: baseUrl + "/icons/information.png"
}];
// 未登录
var commonService = [{
    name: "疫情资讯",
    img: baseUrl + "/icons/epidemic2.png"
},
{
    name: "公告",
    img: baseUrl + "/icons/news.png"
}];
// 最新公告内容
var noticeData = [];

// $route   GET api/home
// @desc    获取最新的5条公告信息以及首页顶图和服务数据
// @access  public
router.get('/home', (req, res) => {
    // 获取最新添加的5条公告数据
    const sql = `select * from notice order by id desc limit 5`;
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err){
            console.log(err.message);
            return res.send({ status: 1, message: '获取数据失败！' });
        }
        noticeData = results
        // console.log(noticeData,'---------------x')
        let serviceData;
        if(req.query.userType === '学生') serviceData = studentService;
        else if(req.query.userType === '教师') serviceData = teacherService;
        else if(req.query.userType === '管理员') serviceData = adminService;
        else serviceData = commonService;
        res.send({
            status: 0,
            topImg: topImg,
            serviceData: serviceData,
            commonService: commonService,
            noticeData: noticeData
        })
    });
});

module.exports = router;