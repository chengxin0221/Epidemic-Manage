const express = require('express');
const app = express();

// 导入路由模块
const home = require("./routes/home");
const login = require("./routes/login");
const upload = require("./routes/upload");
const notice = require("./routes/notice");
const epidemicInfo = require("./routes/epidemicInfo");
const daka = require('./routes/daka');
const userInfo = require("./routes/userInfo");
const btsApply = require('./routes/btsApply');
const outApply = require('./routes/outApply');
const student = require('./routes/student');
const school = require('./routes/school');
const userManage = require('./routes/userManage');

/* 全局中间件 */
//一定要在注册路由之前，配置cors这个中间件，从而解决接口跨域的问题
const cors = require('cors');
// 将cors注册为全局可用的中间件
app.use(cors());
// 配置解析表单数据的全局内置中间件，这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }));
// 在 server.js 中注册路由之前，配置解析 Token 的中间件：
// 解析 token 的中间件
const expressJWT = require('express-jwt');
// 可使用 .unless({ path: [/^\/api\//] }) 指定以/api/开头的接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: 'cheng try @_@' }).unless({ path: [/^\/api\//] }));

/* 局部中间件 */
app.get('/', (req, res) => {
    // 进行身份验证
    res.send("Hello World!");
});

/* 注册路由模块 */
// 把路由模块，注册到app上
//添加统一的访问前缀 /api
app.use('/api', home);
app.use('/api', login);
app.use('/api', upload);
app.use(notice); // 没有/api开头，需要进行身份验证
app.use(epidemicInfo);
app.use(daka);
app.use(userInfo);
app.use(btsApply);
app.use(outApply);
app.use(student);
app.use(school);
app.use(userManage);

// 对外提供静态资源，路径前缀为 /api/icons
app.use('/api/icons', express.static('./static/icons'));
app.use('/api/images', express.static('./static/images'));
// 对外提供上传的图片资源
app.use('/api/uploads', express.static('./static/uploads'));

/* 错误中间件 */
// 在server.js 中的 错误级别中间件 里面，捕获并处理 Token 认证失败后的错误：
app.use(function (err, req, res, next) {
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.send({ status: 1, message: '身份认证失败！' })
    // 未知错误...
})

// 端口号 （process.env.port的作用：读取当前目录下环境变量port的值）
const port = process.env.port || 5000;
//调用app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})