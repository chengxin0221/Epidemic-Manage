/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : epidemic

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 11/03/2023 14:08:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for btsapply
-- ----------------------------
DROP TABLE IF EXISTS `btsapply`;
CREATE TABLE `btsapply`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `className` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sickness` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `backDate` date NULL DEFAULT NULL,
  `arriveTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `traffic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `applyTime` datetime NULL DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '待审核',
  `opinion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `reviewBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reviewTime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of btsapply
-- ----------------------------
INSERT INTO `btsapply` VALUES (11, '2019111202', '林北星', '19科技2班', '否', '上海市上海市浦东新区申迪西路753号', '2023-03-08', '14时', '飞机', '2023-03-05 20:10:00', '审核通过', '同意！', '李科', '2023-03-08 18:49:00');
INSERT INTO `btsapply` VALUES (14, '2019111103', '林大海', '19科技1班', '否', '上海市黄浦区人民大道185号', '2023-03-09', '14时', '飞机', '2023-03-09 13:46:00', '待审核', '', NULL, NULL);

-- ----------------------------
-- Table structure for classes
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes`  (
  `id` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `classes` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `professional` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `college` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `teacher` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classes
-- ----------------------------
INSERT INTO `classes` VALUES ('20190111', '19国贸1班', '国际经济与贸易', '经济与管理学院', '2020010002');
INSERT INTO `classes` VALUES ('20190112', '19国贸2班', '国际经济与贸易', '经济与管理学院', '2020010002');
INSERT INTO `classes` VALUES ('20190121', '19会计1班', '会计学', '经济与管理学院', '2019010001');
INSERT INTO `classes` VALUES ('20190131', '19市场1班', '市场营销', '经济与管理学院', '');
INSERT INTO `classes` VALUES ('20190141', '19投资1班', '投资学', '经济与管理学院', '');
INSERT INTO `classes` VALUES ('20190151', '19人力1班', '人力资源管理', '经济与管理学院', '');
INSERT INTO `classes` VALUES ('20190211', '19法学1班', '法学', '政法学院', '');
INSERT INTO `classes` VALUES ('20190221', '19行政1班', '行政管理', '政法学院', '');
INSERT INTO `classes` VALUES ('20190231', '19思政1班', '思想政治教育', '政法学院', '');
INSERT INTO `classes` VALUES ('20190241', '19知产1班', '知识产权', '政法学院', '');
INSERT INTO `classes` VALUES ('20190311', '19小教1班', '小学教育', '教育科学院', '');
INSERT INTO `classes` VALUES ('20190321', '19学前1班', '学前教育', '教育科学院', '');
INSERT INTO `classes` VALUES ('20190331', '19应心1班', '应用心理学', '教育科学院', '');
INSERT INTO `classes` VALUES ('20190411', '19体教1班', '体育教育', '体育学院', '');
INSERT INTO `classes` VALUES ('20190511', '19广播1班', '广播电视学', '文学院', '');
INSERT INTO `classes` VALUES ('20190521', '19文学1班', '汉语言文学', '文学院', '');
INSERT INTO `classes` VALUES ('20190531', '19秘书1班', '秘书学', '文学院', '');
INSERT INTO `classes` VALUES ('20190541', '19书法1班', '书法学', '文学院', '');
INSERT INTO `classes` VALUES ('20190611', '19英语1班', '英语', '外国语学院', '');
INSERT INTO `classes` VALUES ('20190621', '19商英1班', '商务英语', '外国语学院', '');
INSERT INTO `classes` VALUES ('20190631', '19日语1班', '日语', '外国语学院', '');
INSERT INTO `classes` VALUES ('20190711', '19金融1班', '金融数学', '数学与统计学院', '');
INSERT INTO `classes` VALUES ('20190721', '19数学1班', '数学与应用数学', '数学与统计学院', '');
INSERT INTO `classes` VALUES ('20190731', '19统计1班', '统计学', '数学与统计学院', '');
INSERT INTO `classes` VALUES ('20190811', '19生科1班', '生物科学', '生命科学学院', '');
INSERT INTO `classes` VALUES ('20190821', '19园林1班', '风景园林', '生命科学学院', '');
INSERT INTO `classes` VALUES ('20190911', '19车辆1班', '车辆工程', '机械与汽车工程学院', '');
INSERT INTO `classes` VALUES ('20190921', '19机械1班', '机械设计制造及其自动化', '机械与汽车工程学院', '');
INSERT INTO `classes` VALUES ('20191011', '19电气1班', '电气工程及其自动化', '电子与电气工程学院', '');
INSERT INTO `classes` VALUES ('20191021', '19电子1班', '电子信息科学与技术', '电子与电气工程学院', '');
INSERT INTO `classes` VALUES ('20191031', '19通信1班', '通信工程', '电子与电气工程学院', '');
INSERT INTO `classes` VALUES ('20191041', '19物理1班', '物理学', '电子与电气工程学院', '');
INSERT INTO `classes` VALUES ('20191111', '19科技1班', '计算机科学与技术', '计算机学院', '201911001');
INSERT INTO `classes` VALUES ('20191112', '19科技2班', '计算机科学与技术', '计算机学院', '201911001');
INSERT INTO `classes` VALUES ('20191121', '19软件1班', '软件工程', '计算机学院', '');
INSERT INTO `classes` VALUES ('20191131', '19网络1班', '网络工程', '计算机学院', '');
INSERT INTO `classes` VALUES ('20191141', '19大数据1班', '数据科学与大数据技术', '计算机学院', '');
INSERT INTO `classes` VALUES ('20191151', '19数媒1班', '数字媒体技术', '计算机学院', '');
INSERT INTO `classes` VALUES ('20191211', '19化学1班', '化学', '环境与化学工程学院', '');
INSERT INTO `classes` VALUES ('20191221', '19化妆品1班', '化妆品技术与工程', '环境与化学工程学院', '');
INSERT INTO `classes` VALUES ('20191231', '19环境1班', '环境科学与工程', '环境与化学工程学院', '');
INSERT INTO `classes` VALUES ('20191311', '19食品1班', '食品科学与工程', '食品与制药工程学院', '');
INSERT INTO `classes` VALUES ('20191321', '19制药1班', '制药工程', '食品与制药工程学院', '');
INSERT INTO `classes` VALUES ('20191411', '19酒店1班', '酒店管理', '旅游与历史文化学院', '');
INSERT INTO `classes` VALUES ('20191421', '19历史1班', '历史学', '食品与制药工程学院', '');
INSERT INTO `classes` VALUES ('20191521', '19表演1班', '音乐表演', '音乐学院', '');
INSERT INTO `classes` VALUES ('20191531', '19音乐1班', '音乐学', '音乐学院', '');
INSERT INTO `classes` VALUES ('20191611', '19设计1班', '产品设计', '美术学院', '');
INSERT INTO `classes` VALUES ('20191621', '19动画1班', '动画', '美术学院', '');
INSERT INTO `classes` VALUES ('20191631', '19工艺1班', '工艺美术', '美术学院', '');
INSERT INTO `classes` VALUES ('20191641', '19环设1班', '环境设计', '美术学院', '');
INSERT INTO `classes` VALUES ('20191651', '19美术1班', '美术学', '美术学院', '');
INSERT INTO `classes` VALUES ('20191661', '19视觉1班', '视觉传达设计', '美术学院', '');
INSERT INTO `classes` VALUES ('20191671', '19工业1班', '工业设计', '美术学院', '');
INSERT INTO `classes` VALUES ('20220111', '22国贸1班', '国际经济与贸易', '经济与管理学院', '');
INSERT INTO `classes` VALUES ('20220112', '22国贸2班', '国际经济与贸易', '经济与管理学院', '');

-- ----------------------------
-- Table structure for college
-- ----------------------------
DROP TABLE IF EXISTS `college`;
CREATE TABLE `college`  (
  `id` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `college` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of college
-- ----------------------------
INSERT INTO `college` VALUES ('01', '经济与管理学院');
INSERT INTO `college` VALUES ('02', '政法学院');
INSERT INTO `college` VALUES ('03', '教育科学院');
INSERT INTO `college` VALUES ('04', '体育学院');
INSERT INTO `college` VALUES ('05', '文学院');
INSERT INTO `college` VALUES ('06', '外国语学院');
INSERT INTO `college` VALUES ('07', '数学与统计学院');
INSERT INTO `college` VALUES ('08', '生命科学学院');
INSERT INTO `college` VALUES ('09', '机械与汽车工程学院');
INSERT INTO `college` VALUES ('10', '电子与电气工程学院');
INSERT INTO `college` VALUES ('11', '计算机学院');
INSERT INTO `college` VALUES ('12', '环境与化学工程学院');
INSERT INTO `college` VALUES ('13', '食品与制药工程学院');
INSERT INTO `college` VALUES ('14', '旅游与历史文化学院');
INSERT INTO `college` VALUES ('15', '音乐学院');
INSERT INTO `college` VALUES ('16', '美术学院');

-- ----------------------------
-- Table structure for daka
-- ----------------------------
DROP TABLE IF EXISTS `daka`;
CREATE TABLE `daka`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `className` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  `temperature` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `vaccine` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sickness` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `confirm` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `rescure` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `residence` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of daka
-- ----------------------------
INSERT INTO `daka` VALUES (14, '2019111101', '魏了谁', '19科技1班', '2023-03-04', '正常(37.3度以下)', '已完成', '否', '', '', '广东省广州市黄埔区上堂西大街6巷1号', '广东省', '13802326122');
INSERT INTO `daka` VALUES (15, '2019111201', '张高级', '19科技2班', '2023-03-07', '正常(37.3度以下)', '已完成', '否', '', '', '广东省广州市黄埔区科林路15号对面(姚天下醋庄旁边)', '广东省', '13802326122');
INSERT INTO `daka` VALUES (16, '2019111201', '张高级', '19科技2班', '2023-03-05', '正常(37.3度以下)', '已完成', '否', '', '', '广东省广州市黄埔区上堂西大街6巷1号', '广东省', '13802326122');
INSERT INTO `daka` VALUES (17, '2019111202', '林北星', '19科技2班', '2023-03-07', '正常(37.3度以下)', '已完成', '否', '', '', '上海市上海市浦东新区申迪西路753号', '上海市', '13896532466');
INSERT INTO `daka` VALUES (18, '2019011101', '李佳琦', '19国贸1班', '2023-03-07', '正常(37.3度以下)', '已完成', '否', '', '', '上海市上海市浦东新区迎宾大道6000号', '广东省上海市', '13965806234');
INSERT INTO `daka` VALUES (19, '2019111201', '张高级', '19科技2班', '2023-03-06', '正常(37.3度以下)', '已完成', '否', '', '', '广东省广州市黄埔区上堂大街六巷1号正西方向70米', '广东省', '13802326122');
INSERT INTO `daka` VALUES (20, '2019011201', '旺旺雪饼', '19国贸2班', '2023-03-07', '发热', '二针', '是', '是', '已康复', '上海市上海市浦东新区迎宾大道6000号', '上海', '13568572580');
INSERT INTO `daka` VALUES (21, '2019111202', '林北星', '19科技2班', '2023-03-08', '正常(37.3度以下)', '已完成', '否', '', '', '广东省广州市黄埔区香雪三路3号', '广东省', '13896532466');
INSERT INTO `daka` VALUES (23, '2019111102', '韩藤藤', '19科技1班', '2023-03-09', '发热', '二针', '是', '是', '康复中', '上海市黄浦区人民大道185号', '上海市', '15824097086');
INSERT INTO `daka` VALUES (24, '2019111103', '林大海', '19科技1班', '2023-03-09', '正常(37.3度以下)', '二针', '否', '', '', '上海市黄浦区南京路(南京东路地铁站旁)', '上海市', '14726547767');

-- ----------------------------
-- Table structure for epidemicinfo
-- ----------------------------
DROP TABLE IF EXISTS `epidemicinfo`;
CREATE TABLE `epidemicinfo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `coverImg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date` date NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `editor` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of epidemicinfo
-- ----------------------------
INSERT INTO `epidemicinfo` VALUES (10, '新资讯', 'http://192.168.43.206:5000/api/uploads/epidemicInfo/GismJO9sdd9m77576666e5a0db2afd62af32b6ec81d0.png', '<p>资讯</p><p><img src=\"http://192.168.43.206:5000/api/uploads/epidemicInfo/F5i8PpoNQyx236c3a8db96943a6fea574cdecf39e414.jpg\" height=\"20%\" width=\"292\"></p><p>哈哈哈&nbsp;&nbsp;&nbsp;哈哈哈</p>', '2023-03-04', '管理员000', '管理员000');
INSERT INTO `epidemicinfo` VALUES (14, '关于校园疫情防控管理', 'http://192.168.43.206:5000/api/uploads/epidemicInfo/P5QYV79bpnY8225b18e782bc32629d6e1851b043c121.png', '<p>资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯资讯</p><p><br></p><p>省份省份水电费第三方少食多餐徐徐徐新的新的新的新的新的新的</p><p><img src=\"http://192.168.43.206:5000/api/uploads/epidemicInfo/Xt41vQAWHDsr36c3a8db96943a6fea574cdecf39e414.jpg\" height=\"20%\" width=\"212\"></p><p>发送范德萨发生大V是第三方付大哥别让他妃v</p><ol><li>防辐射大V</li><li>孙菲菲付</li><li>发送的奋斗</li></ol><ul data-checked=\"false\"><li>的方式发出的</li><li>是否是充分</li></ul>', '2023-02-20', '管理员000', '管理员000');
INSERT INTO `epidemicinfo` VALUES (18, '资讯', 'http://192.168.43.206:5000/api/uploads/epidemicInfo/9ei3AvNFScEJfecff6a949f22a8d08f2082c9411a726.jpg', '<p>资讯重中之重资讯资讯</p><p><img src=\"http://192.168.43.206:5000/api/uploads/epidemicInfo/lbjc1x6BUWzY90b52a9cdbda22f2ed9d670fe06e4818.jpg\" height=\"20%\" width=\"20%\"></p><p>新编辑</p><p>新编辑编辑</p>', '2023-02-20', '管理员000', '管理员000');
INSERT INTO `epidemicinfo` VALUES (21, '用手机发布的资讯啊', 'http://192.168.43.206:5000/api/uploads/epidemicInfo/tmp_5430e6a7602737a348964f94cd08984202d0c5a5c217b8f7.jpg', '<h1>用手机发布的资讯啊</h1><p>爱发资讯的小姐姐一枚啊～</p><p class=\"ql-indent-1\">HelloKitty</p><p style=\"line-height: 2;\">hellohello！&#128076;&nbsp;&#127822;&nbsp;</p><p style=\"line-height: 2;\">哈哈哈哈哈</p><p style=\"line-height: 2;\"><img src=\"http://192.168.43.206:5000/api/uploads/epidemicInfo/tmp_b2e2dbd80f9026600da7dddb49e4f6e24e604ec6b7944cac.jpg\" height=\"20%\" width=\"299\" data-local=\"http://192.168.43.206:5000/api/uploads/epidemicInfo/tmp_b2e2dbd80f9026600da7dddb49e4f6e24e604ec6b7944cac.jpg\"></p><p style=\"line-height: 2;\">放个烟花&#127878; </p><p style=\"line-height: 2;\"><br></p>', '2023-02-21', '管理员000', '管理员000');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imgList` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `date` date NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `editor` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (17, '新公告', '新公告', 'http://192.168.43.206:5000/api/uploads/notice/pmpoGookQwcp61f1f1e62506e70591ec33f58278f961.png', '2023-02-17', '管理员000', '管理员000');
INSERT INTO `notice` VALUES (18, '关于校园疫情防控管理的公告校园疫情防控管理的公告', '校园疫情防控管理的公告校园疫情防控管理的公告校园疫情防控管理的公告校园疫情防控管理的公告校园疫情防控管理的公告校园疫情防控管理的公告\n新编辑的内容新编辑的内容新编辑的内容新编辑的内容', 'http://192.168.43.206:5000/api/uploads/notice/9HrXsRAWbwzy16451315a22b9966bdab541b482631f2.png,http://192.168.43.206:5000/api/uploads/notice/fTX9g0QQ9Jya36c3a8db96943a6fea574cdecf39e414.jpg', '2023-02-18', '管理员000', '管理员000');
INSERT INTO `notice` VALUES (26, '存储', '测试\n测试测试村上春树\n测试测试', 'http://192.168.43.206:5000/api/uploads/notice/pzxIe6TbDxW3a315d9f6198039bc0413bd4b5b72e166.jpg', '2023-02-18', '管理员000', '管理员000');
INSERT INTO `notice` VALUES (27, '新新新', '新新新\n新的编辑者\n新编辑', '', '2023-02-24', '管理员000', '管理员000,管理员001');
INSERT INTO `notice` VALUES (29, '用手机发布的公告啊', '用手机发布的公告啊\n哈哈哈哈哈哈哈哈哈哈哈哈\n嘎嘎嘎嘎嘎\n小蛋糕&#127874; &#127856; 好好吃&#128522; &#127817; &#127827; &#127838; \n&#128064; &#128522;&#127818; ', 'http://192.168.43.206:5000/api/uploads/notice/tmp_bcc7319e2ad4cb606429995560eb2d0c6bcc9058012a0310.jpg', '2023-02-21', '管理员000', '管理员000');
INSERT INTO `notice` VALUES (31, '新公告', '新公告', '', '2023-03-04', '管理员000', '管理员000');

-- ----------------------------
-- Table structure for outapply
-- ----------------------------
DROP TABLE IF EXISTS `outapply`;
CREATE TABLE `outapply`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `className` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `destination` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `placeType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `outTime` date NULL DEFAULT NULL,
  `backTime` date NULL DEFAULT NULL,
  `travelRecords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `traffic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `applyTime` datetime NULL DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '待审核',
  `opinion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reviewBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reviewTime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of outapply
-- ----------------------------
INSERT INTO `outapply` VALUES (8, '2019111201', '张高级', '19科技2班', '实习', '广州', '市外', '2023-03-06', '2023-03-31', '学校＞广州', '高铁', '2023-03-04 22:35:00', '审核通过', '同意！', '李科', '2023-03-05 16:39:00');

-- ----------------------------
-- Table structure for professional
-- ----------------------------
DROP TABLE IF EXISTS `professional`;
CREATE TABLE `professional`  (
  `id` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `professional` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `college` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of professional
-- ----------------------------
INSERT INTO `professional` VALUES ('011', '国际经济与贸易', '经济与管理学院');
INSERT INTO `professional` VALUES ('012', '会计学', '经济与管理学院');
INSERT INTO `professional` VALUES ('013', '市场营销', '经济与管理学院');
INSERT INTO `professional` VALUES ('014', '投资学', '经济与管理学院');
INSERT INTO `professional` VALUES ('015', '人力资源管理', '经济与管理学院');
INSERT INTO `professional` VALUES ('021', '法学', '政法学院');
INSERT INTO `professional` VALUES ('022', '行政管理', '政法学院');
INSERT INTO `professional` VALUES ('023', '思想政治教育', '政法学院');
INSERT INTO `professional` VALUES ('024', '知识产权', '政法学院');
INSERT INTO `professional` VALUES ('031', '小学教育', '教育科学院');
INSERT INTO `professional` VALUES ('032', '学前教育', '教育科学院');
INSERT INTO `professional` VALUES ('033', '应用心理学', '教育科学院');
INSERT INTO `professional` VALUES ('041', '体育教育', '体育学院');
INSERT INTO `professional` VALUES ('051', '广播电视学', '文学院');
INSERT INTO `professional` VALUES ('052', '汉语言文学', '文学院');
INSERT INTO `professional` VALUES ('053', '秘书学', '文学院');
INSERT INTO `professional` VALUES ('054', '书法学', '文学院');
INSERT INTO `professional` VALUES ('061', '英语', '外国语学院');
INSERT INTO `professional` VALUES ('062', '商务英语', '外国语学院');
INSERT INTO `professional` VALUES ('063', '日语', '外国语学院');
INSERT INTO `professional` VALUES ('071', '金融数学', '数学与统计学院');
INSERT INTO `professional` VALUES ('072', '数学与应用数学', '数学与统计学院');
INSERT INTO `professional` VALUES ('073', '统计学', '数学与统计学院');
INSERT INTO `professional` VALUES ('081', '生物科学', '生命科学学院');
INSERT INTO `professional` VALUES ('082', '风景园林', '生命科学学院');
INSERT INTO `professional` VALUES ('091', '车辆工程', '机械与汽车工程学院');
INSERT INTO `professional` VALUES ('092', '机械设计制造及其自动化', '机械与汽车工程学院');
INSERT INTO `professional` VALUES ('101', '电气工程及其自动化', '电子与电气工程学院');
INSERT INTO `professional` VALUES ('102', '电子信息科学与技术', '电子与电气工程学院');
INSERT INTO `professional` VALUES ('103', '通信工程', '电子与电气工程学院');
INSERT INTO `professional` VALUES ('104', '物理学', '电子与电气工程学院');
INSERT INTO `professional` VALUES ('111', '计算机科学与技术', '计算机学院');
INSERT INTO `professional` VALUES ('112', '软件工程', '计算机学院');
INSERT INTO `professional` VALUES ('113', '网络工程', '计算机学院');
INSERT INTO `professional` VALUES ('114', '数据科学与大数据技术', '计算机学院');
INSERT INTO `professional` VALUES ('115', '数字媒体技术', '计算机学院');
INSERT INTO `professional` VALUES ('121', '化学', '环境与化学工程学院');
INSERT INTO `professional` VALUES ('122', '化妆品技术与工程', '环境与化学工程学院');
INSERT INTO `professional` VALUES ('123', '环境科学与工程', '环境与化学工程学院');
INSERT INTO `professional` VALUES ('131', '食品科学与工程', '食品与制药工程学院');
INSERT INTO `professional` VALUES ('132', '制药工程', '食品与制药工程学院');
INSERT INTO `professional` VALUES ('141', '酒店管理', '旅游与历史文化学院');
INSERT INTO `professional` VALUES ('142', '历史学', '旅游与历史文化学院');
INSERT INTO `professional` VALUES ('152', '音乐表演', '音乐学院');
INSERT INTO `professional` VALUES ('153', '音乐学', '音乐学院');
INSERT INTO `professional` VALUES ('161', '产品设计', '美术学院');
INSERT INTO `professional` VALUES ('162', '动画', '美术学院');
INSERT INTO `professional` VALUES ('163', '工艺美术', '美术学院');
INSERT INTO `professional` VALUES ('164', '环境设计', '美术学院');
INSERT INTO `professional` VALUES ('165', '美术学', '美术学院');
INSERT INTO `professional` VALUES ('166', '视觉传达设计', '美术学院');
INSERT INTO `professional` VALUES ('167', '工业设计', '美术学院');

-- ----------------------------
-- Table structure for school
-- ----------------------------
DROP TABLE IF EXISTS `school`;
CREATE TABLE `school`  (
  `classid` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `college` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `classes` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`classid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of school
-- ----------------------------
INSERT INTO `school` VALUES ('20190611', '外国语学院', '19英语1班');
INSERT INTO `school` VALUES ('20191111', '计算机学院', '19科技1班');
INSERT INTO `school` VALUES ('20191112', '计算机学院', '19科技2班');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uid` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `upwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `className` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `professional` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `college` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `residence` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2019010001', '1212', '唐糖', '教师', '19会计1班', '', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_7f71de858c184a280a9973cfd536d3a24c2a427f9ef3f555.jpg');
INSERT INTO `user` VALUES ('2019011101', '1212', '李佳琦', '学生', '19国贸1班', '国际经济与贸易', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_58b4ac2f2f3dbf191254c0e803080249c6911a6d7523f1d0.jpg');
INSERT INTO `user` VALUES ('2019011102', '1212', '王维', '学生', '19国贸1班', '国际经济与贸易', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_f088570e8bc67ee315d7dc4f1db50b779dff2a956cc45db7.jpg');
INSERT INTO `user` VALUES ('2019011103', '1212', '吴宇', '学生', '19国贸1班', '国际经济与贸易', '经济与管理学院', '', '', '');
INSERT INTO `user` VALUES ('2019011201', '1212', '旺旺雪饼', '学生', '19国贸2班', '国际经济与贸易', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_111b37679987b3d46fe19f03d68a311e0ca3069363f83a64.jpg');
INSERT INTO `user` VALUES ('2019012101', '1212', '秦快', '学生', '19会计1班', '会计学', '经济与管理学院', '', '', '');
INSERT INTO `user` VALUES ('2019012102', '1212', '方圆', '学生', '19会计1班', '会计学', '经济与管理学院', '', '', '');
INSERT INTO `user` VALUES ('2019110001', '1212', '李科', '教师', '19科技1班,19科技2班', '', '计算机学院', '13832657899', '', 'http://192.168.43.206:5000/api/uploads/headImg/MrcPx1wYjkht77576666e5a0db2afd62af32b6ec81d0.png');
INSERT INTO `user` VALUES ('2019111101', '1212', '展宇', '学生', '19科技1班', '计算机科学与技术', '计算机学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_d0b73c33f409e741f5d24fa532b5d723edbd4b3c49b22f86.jpg');
INSERT INTO `user` VALUES ('2019111102', '1212', '韩藤藤', '学生', '19科技1班', '计算机科学与技术', '计算机学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/3oFMMlEFqtNG59d700fcf1386c92ddf1b804d415b2f9.jpg');
INSERT INTO `user` VALUES ('2019111103', '1212', '林大海', '学生', '19科技1班', '计算机科学与技术', '计算机学院', '14726547767', '上海市', 'http://192.168.43.206:5000/api/uploads/headImg/04nA4fzmW0nAa4957aaa1496a51af78a12c6b04d1eb9.jpg');
INSERT INTO `user` VALUES ('2019111201', '1212', '张高级', '学生', '19科技2班', '计算机科学与技术', '计算机学院', '13802326122', '广东省', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_96a1c71f9e472fadc73f1e642d3bf76bdb5f3bc488dd3d23.jpg');
INSERT INTO `user` VALUES ('2019111202', '1212', '林北星', '学生', '19科技2班', '计算机科学与技术', '计算机学院', '13896532466', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_5a7a166737487cd4ca3eb9f23e637c45780fa54ea974d499.jpg');
INSERT INTO `user` VALUES ('2019111203', '1212', '张万森', '学生', '19科技2班', '计算机科学与技术', '计算机学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_fa7ec9ad0c34bd3b663e2ca23e6f6a2f5d31808362e36b9b.jpg');
INSERT INTO `user` VALUES ('2019111204', '1212', '高歌', '学生', '19科技2班', '计算机科学与技术', '计算机学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_e8bc11525f5266ab2e6e9371a57b49824aa4759c9a1cb932.jpg');
INSERT INTO `user` VALUES ('2019111205', '1212', '杨超洋', '学生', '19科技2班', '计算机科学与技术', '计算机学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_8ef4ad2650aaa6c91525b741296ab2f7de62f245d7fdd583.jpg');
INSERT INTO `user` VALUES ('2019114101', '1212', '吴宇', '学生', '19大数据1班', '数据科学与大数据技术', '计算机学院', '', '', '');
INSERT INTO `user` VALUES ('2020010001', '1212', '高光明', '教师', '', '', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/wUx3s41B8fqoe0805116711882f40bd1c30a8d092353.png');
INSERT INTO `user` VALUES ('2020010002', '1212', '杜富国', '教师', '19国贸1班,19国贸2班', '', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/q1IbgZpT73pb0b42d668592d86c0c007297a896b8d35.jpg');
INSERT INTO `user` VALUES ('4144010580', '1212', '超级管理员', '管理员', '', '', '', '13556788889', '', 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er1BaYeOpeIxoszejj5JQI80htmM0kW5LSQlTQVaEhDuYeYxccc02y303lAicPOibZeXprFWRiczIX6g/132');

SET FOREIGN_KEY_CHECKS = 1;
