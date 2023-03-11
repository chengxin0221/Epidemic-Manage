# 校园疫情防控管理微信小程序
该项目是基于`uniapp`开发的微信小程序，前端使用了uniapp框架，使用了`vuex`进行状态管理、使用`@escook/request-miniprogram`第三方包发起网络请求，后端使用了`nodejs`进行开发，数据库使用的是`MySQL`。

### 项目描述：
该项目设置了3个类型的用户：`学生`、`教师`、`管理员`。
包含的功能：
1. 学生用户的健康填报、返校或外出申请、返校或外出二维码、查看申请记录的功能。
2. 教师用户的班级学生管理功能、所管理班级学生健康填报情况查看功能、审批学生的返校或外出申请的功能。
3. 管理员的用户管理功能、学院专业班级管理功能、发布和管理公告和资讯功能、查看全校学生健康填报情况以及申请记录。
4. 登录用户可编辑个人信息、更换头像、查看公告和资讯，未登录用户只能查看公告和资讯。

### 说明
前端项目`uni-epidemic`的main.js文件中配置请求根路径
`$http.baseUrl = 'http://xxx.xxx.xx.xxx:5000'`中的ip为电脑的网络ip，需根据实际情况进行更改。

### 项目展示
1. 小程序不同用户登录显示不同功能选项
未登录用户首页、个人中心页面：
![图 1](images/c299fdb43a6433bb3ec3914f45ef46080ddbf40139f74695d622813a2d2658a5.png)![图 2](images/a4a313aeea32347feff2ebf91f5ce508d232aca1dd4a700245d74b1f7ce73858.png)  
点击个人中心页面的一键登录按钮进入登录页面：
![图 3](images/1c5775e045b25172006dfb493f7a37dd142e44c81add71777876d5f46753c47a.png)  
学生用户登录后首页、个人中心页面：
![图 4](images/7db44a74f37f982683429c75fa417260b52159bd16c033416997096b045119c0.png) ![图 5](images/66579c3e527c0e54d01713afa4d8e392d033a4682df313ea14976bba4478abfc.png)  
教师用户登录后首页、管理员登录后首页：
![图 6](images/2a9194db13dc579eb72fd23ac301975f099cff24052316bba85e19f98fcb1005.png)  ![图 7](images/a3b7c2326a34bfffe058a8e5f578c3d3cba5272dcde908ea4fd38fcd08e4ecdf.png)  
2. 登录用户编辑个人信息、更换头像、修改密码
![图 8](images/530f043fc24074c9fc8488376d48a5699b4e3014dd39b6487af6a4d344a8ce3e.png)  ![图 9](images/f222cba7936cd99aa96eebfe07c95c259a54f6dde6a43928039fe956f05126bd.png)  
3. 学生健康打卡记录显示功能和打卡页面
![图 10](images/622411b4ff38b6d4491d76bb2f763be490098b132e6381c67afa4008b2e57f48.png)  ![图 11](images/4ed6288410a8568f32a5819db56486be281cf64720fe78208993e7bb5123e983.png)  
4. 学生返校外出申请功能、显示申请记录页面、查看或删除申请记录功能、生成返校/外出申请审批通过的二维码
![图 12](images/d51886b05722358f41859e230027ae5437eb6a034522be40da65d6a98a983b0b.png)  ![图 13](images/fd58d91c415934630d03ee964f1b961c9d0dce1de2d44e4ff9b085c427556de2.png)  
![图 14](images/5d3d79162ea9707cb794322f25a79ded247356955a385f93ed564d28e227e218.png)  ![图 15](images/bff9d5fd329b48d2e3f942529c11e50864c6c397130282e367b8375e18865d5a.png)  
5. 教师用户审批申请页面
![图 18](images/65b6716c56dae523378edc2de930edcc627fd737a09dc59c63e598f220964778.png)  ![图 19](images/0aac582aa58e6241aeb09d592fe35d1e46545b2d66ac3950acc4c5c93cef2ebf.png)  
6. 教师用户管理的班级学生打卡情况页面、打卡情况详细报告页面
![图 20](images/a94661d3b86ba8a1dad8af8432849b0b185ebc240940abdb84b488fb875d2f01.png)  ![图 21](images/d9180c34e1720b8c1b36d29b7883863b26d3f8d3ee77aa9be1446e9074380199.png)  
7. 教师用户增、删、搜索管理班级学生
![图 22](images/308c868a22dc7e0343352c2cda3567c751b293d4610d9fc2ddf8c441aacf7cd3.png)  ![图 23](images/0a06858a32c6a861cd8c3bb684fb148d4760330060e964942cc29c0e1f830f6d.png)  
8. 管理员发布、删除、修改、搜索公告和资讯
![图 24](images/5534ee7ad9d62e4eac5aed4ac8bffaef9da83ed5fc8830145e7e94606098b2d8.png)  ![图 25](images/b3c3d4f36be0e77d1cbd98f6d7e4b681db67aa89db3e3b51045c6bc621b8dbc6.png)  
![图 26](images/89e4015b3a5778fbcd7a7692f61d76784fd7c501d7ae137a15b7d834ed3c9c96.png)  ![图 27](images/78b366af7a67dcfd09daa24b2b6a08d7f68edb0d83d2ec02f3ceb9baa0227283.png)  
9. 管理员查看全校或某个学院打卡完成情况页面、各学院的申请审批记录页面
![图 28](images/add092525b6f48db217549f1b6d4a2682db36464ff923ba1968145cfd74e27dc.png)  ![图 29](images/e2dfa1f1c45c3b223f329758f5bbcb3831296ba8cc18390cf485f9642e5cebbd.png)  
10. 管理员增、删、搜索用户、编辑用户信息功能、增删学院专业班级页面
![图 30](images/90415da73fb1989ffd21e0d5cc9b5d9f616bb569245abd3e84287e4e61020bb1.png)  ![图 31](images/985fde66f0bdf1e63867b440ad9b1eb1e0778f5606cf257b06a8010d9e8a8fcd.png)  
