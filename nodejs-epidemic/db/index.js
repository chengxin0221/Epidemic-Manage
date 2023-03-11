const mysql = require('mysql');  //引用mysql

// 创建连接对象
const db = mysql.createPool({
    host:"127.0.0.1",//如果是操作本地数据库，填写127.0.0.1；如果是远程服务器上的数据库填服务公网ip
    user:"root",//通常为root
    password:"root",//密码
    database:"epidemic",//你所要操作的数据库的名称（是你在mysql中建立的数据库）
    timezone: "08:00",  // 数据库服务器的时区与本地不同，因此需要手动设定时区
    multipleStatements: true, // 设置可以同时查询多条语句
})

// 向外共享 db 数据库连接对象
module.exports = db;