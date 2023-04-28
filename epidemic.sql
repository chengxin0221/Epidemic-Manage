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

 Date: 28/04/2023 15:19:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for btsapply
-- ----------------------------
DROP TABLE IF EXISTS `btsapply`;
CREATE TABLE `btsapply`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of btsapply
-- ----------------------------
INSERT INTO `btsapply` VALUES (11, '2019111202', '林北星', '19科技2班', '否', '上海市上海市浦东新区申迪西路753号', '2023-03-08', '14时', '飞机', '2023-03-05 20:10:00', '审核通过', '同意！', '李科', '2023-03-08 18:49:00');
INSERT INTO `btsapply` VALUES (14, '2019111103', '林大海', '19科技1班', '否', '上海市黄浦区人民大道185号', '2023-03-09', '14时', '飞机', '2023-03-09 13:46:00', '待审核', '', NULL, NULL);
INSERT INTO `btsapply` VALUES (16, '2019111202', '林北星', '19科技2班', '否', '广东省广州市黄埔区上堂大街一巷1号', '2023-03-28', '19时', '高铁', '2023-03-26 17:54:00', '审核通过', '同意！', '李科', '2023-03-26 18:50:00');
INSERT INTO `btsapply` VALUES (17, '2019111201', '张高级', '19科技2班', '否', '广东省肇庆市端州区古塔中路2号', '2023-04-25', '4时', '公交', '2023-04-25 14:14:00', '待审核', '', NULL, NULL);
INSERT INTO `btsapply` VALUES (18, '2019011203', '简亓', '19国贸2班', '否', '河南省郑州市二七区西大街21号', '2023-04-26', '18时', '飞机', '2023-04-25 14:53:00', '审核通过', '同意！', '超级管理员', '2023-04-26 12:42:00');
INSERT INTO `btsapply` VALUES (19, '2019011203', '简亓', '19国贸2班', '否', '广东省肇庆市端州区古塔中路10号10号', '2023-04-25', '1时', '公交', '2023-04-25 14:53:00', '审核通过', '同意！', '杜富国', '2023-04-25 14:55:00');
INSERT INTO `btsapply` VALUES (20, '2019011101', '李佳琦', '19国贸1班', '否', '广东省肇庆市端州区公正路古塔中路10号小区西南侧约50米', '2023-05-02', '14时', '滴滴', '2023-04-25 15:12:00', '审核通过', '同意！', '杜富国', '2023-04-25 15:14:00');
INSERT INTO `btsapply` VALUES (21, '2019011201', '旺旺', '19国贸2班', '否', '广东省肇庆市端州区公正路36号', '2023-04-28', '9时', '公交', '2023-04-25 15:13:00', '审核不通过', '不同意！', '超级管理员', '2023-04-26 14:44:00');

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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of classes
-- ----------------------------
INSERT INTO `classes` VALUES ('20190111', '19国贸1班', '国际经济与贸易', '经济与管理学院', '2020010002');
INSERT INTO `classes` VALUES ('20190112', '19国贸2班', '国际经济与贸易', '经济与管理学院', '2020010002');
INSERT INTO `classes` VALUES ('20190121', '19会计1班', '会计学', '经济与管理学院', '2019010001');
INSERT INTO `classes` VALUES ('20190131', '19市场1班', '市场营销', '经济与管理学院', '');
INSERT INTO `classes` VALUES ('20190141', '19投资1班', '投资学', '经济与管理学院', '2020010001');
INSERT INTO `classes` VALUES ('20190151', '19人力1班', '人力资源管理', '经济与管理学院', '');
INSERT INTO `classes` VALUES ('20190211', '19法学1班', '法学', '政法学院', '');
INSERT INTO `classes` VALUES ('20190221', '19行政1班', '行政管理', '政法学院', '');
INSERT INTO `classes` VALUES ('20190231', '19思政1班', '思想政治教育', '政法学院', '');
INSERT INTO `classes` VALUES ('20190241', '19知产1班', '知识产权', '政法学院', '');
INSERT INTO `classes` VALUES ('20190311', '19小教1班', '小学教育', '教育科学院', '');
INSERT INTO `classes` VALUES ('20190321', '19学前1班', '学前教育', '教育科学院', '');
INSERT INTO `classes` VALUES ('20190331', '19应心1班', '应用心理学', '教育科学院', '');
INSERT INTO `classes` VALUES ('20190411', '19体教1班', '体育教育', '体育学院', '2019040001');
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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
  `uid` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of daka
-- ----------------------------
INSERT INTO `daka` VALUES (14, '2019111101', '展宇', '19科技1班', '2023-03-04', '正常(37.3度以下)', '已完成', '否', '', '', '广东省广州市黄埔区上堂西大街6巷1号', '广东省', '13802326122');
INSERT INTO `daka` VALUES (15, '2019111201', '张高级', '19科技2班', '2023-03-07', '正常(37.3度以下)', '已完成', '否', '', '', '广东省广州市黄埔区科林路15号对面(姚天下醋庄旁边)', '广东省', '13802326122');
INSERT INTO `daka` VALUES (16, '2019111201', '张高级', '19科技2班', '2023-03-05', '正常(37.3度以下)', '已完成', '否', '', '', '广东省广州市黄埔区上堂西大街6巷1号', '广东省', '13802326122');
INSERT INTO `daka` VALUES (17, '2019111202', '林北星', '19科技2班', '2023-03-07', '正常(37.3度以下)', '已完成', '否', '', '', '上海市上海市浦东新区申迪西路753号', '上海市', '13896532466');
INSERT INTO `daka` VALUES (18, '2019011101', '李佳琦', '19国贸1班', '2023-03-07', '正常(37.3度以下)', '已完成', '否', '', '', '上海市上海市浦东新区迎宾大道6000号', '广东省上海市', '13965806234');
INSERT INTO `daka` VALUES (19, '2019111201', '张高级', '19科技2班', '2023-03-06', '正常(37.3度以下)', '已完成', '否', '', '', '广东省广州市黄埔区上堂大街六巷1号正西方向70米', '广东省', '13802326122');
INSERT INTO `daka` VALUES (20, '2019011201', '旺旺雪饼', '19国贸2班', '2023-03-07', '发热', '二针', '是', '是', '已康复', '上海市上海市浦东新区迎宾大道6000号', '上海', '13568572580');
INSERT INTO `daka` VALUES (21, '2019111202', '林北星', '19科技2班', '2023-03-08', '正常(37.3度以下)', '已完成', '否', '', '', '广东省广州市黄埔区香雪三路3号', '广东省', '13896532466');
INSERT INTO `daka` VALUES (23, '2019111102', '韩藤藤', '19科技1班', '2023-03-09', '发热', '二针', '是', '是', '康复中', '上海市黄浦区人民大道185号', '上海市', '15824097086');
INSERT INTO `daka` VALUES (24, '2019111103', '林大海', '19科技1班', '2023-03-09', '正常(37.3度以下)', '二针', '否', '', '', '上海市黄浦区南京路(南京东路地铁站旁)', '上海市', '14726547767');
INSERT INTO `daka` VALUES (25, '2019111202', '林北星', '19科技2班', '2023-03-26', '正常(37.3度以下)', '已完成', '否', '', '', '广东省广州市黄埔区上堂大街一巷1号', '上海市', '13896532466');
INSERT INTO `daka` VALUES (26, '2019111202', '林北星', '19科技2班', '2023-04-25', '正常(37.3度以下)', '已完成', '否', '', '', '广东省肇庆市端州区古塔中路10号10号', '上海市', '13896532466');
INSERT INTO `daka` VALUES (27, '2019111201', '张高级', '19科技2班', '2023-04-25', '发热', '已完成', '否', '', '', '广东省肇庆市端州区城东街道蓓蕾南路6号', '广东省', '13802326122');
INSERT INTO `daka` VALUES (28, '2019111203', '张万森', '19科技2班', '2023-04-25', '正常(37.3度以下)', '已完成', '否', '', '', '广东省肇庆市端州区古塔中路10号10号', '上海市', '13854327899');
INSERT INTO `daka` VALUES (29, '2019111101', '展宇', '19科技1班', '2023-04-25', '正常(37.3度以下)', '已完成', '否', '', '', '广东省肇庆市端州区古塔中路10号10号', '北京市', '13234336785');
INSERT INTO `daka` VALUES (30, '2019011203', '简亓', '19国贸2班', '2023-04-25', '正常(37.3度以下)', '已完成', '否', '', '', '河南省郑州市二七区西大街21号', '河南省郑州市', '13802769011');
INSERT INTO `daka` VALUES (31, '2019011202', '带小帅', '19国贸2班', '2023-04-25', '正常(37.3度以下)', '已完成', '否', '', '', '广东省肇庆市端州区古塔中路15号', '广东', '15834523478');
INSERT INTO `daka` VALUES (32, '2019011104', '小福', '19国贸1班', '2023-04-25', '正常(37.3度以下)', '已完成', '否', '', '', '广东省肇庆市端州区古塔中路10号10号', '广东', '13245678906');
INSERT INTO `daka` VALUES (33, '2019011103', '吴宇', '19国贸1班', '2023-04-25', '发热', '已完成', '否', '', '', '广东省肇庆市端州区古塔中路15号', '广东', '13245345622');
INSERT INTO `daka` VALUES (34, '2019011102', '王维', '19国贸1班', '2023-04-25', '正常(37.3度以下)', '二针', '否', '', '', '广东省肇庆市端州区古塔中路10号10号', '广东', '13265457899');

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
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of epidemicinfo
-- ----------------------------
INSERT INTO `epidemicinfo` VALUES (10, '中疾控发布全国新冠病毒疫情情况', 'http://192.168.43.206:5000/api/uploads/epidemicInfo/tmp_b766d46b0aaa1dd051a3e56f2aa1e39c7a3627da319bb020.jpg', '<p>中国疾控预防控制中心今日发布全国新冠病毒感染情况。</p><p><br></p><p style=\"margin-top: 20px;\"><strong style=\"font-size: 24px;\">全国报告人群新冠病毒核酸检测结果</strong></p><p>2022年12月9日以来，各省份报告人群新冠病毒核酸检测阳性数及阳性率呈现先增加后降低趋势，阳性人数12月22日达到高峰（694万）后波动下降，2023年4月20日降至2661例；检测阳性率2022年12月25日达高峰（29.2%）后波动下降，2023年4月20日为1.7%。</p><p><br></p><p style=\"margin-top: 20px;\"><strong style=\"font-size: 24px;\">全国报告人群新冠病毒抗原检测结果</strong></p><p>各省份报告新冠病毒抗原检测量呈现波动减少趋势，从2022年12月19日的最高189万波动下降到4月20日的1.6万。新冠病毒抗原检测阳性数及阳性率自2022年12月9日快速上升，12月22日达高峰（33.7万、21.3%）后波动下降，2023年4月20日阳性数降至79例（阳性率为0.5%）。</p>', '2023-04-20', '超级管理员', '超级管理员');
INSERT INTO `epidemicinfo` VALUES (14, '疫情防控动态', 'http://192.168.43.206:5000/api/uploads/epidemicInfo/tmp_65d861a3cc3e1e99688f6b19a26eac16ab1c9145611bf125.jpg', '<p><strong style=\"font-size: 24px;\">世界卫生组织：全球累计新冠确诊病例达650332899例</strong></p><p>新华社日内瓦12月21日电（记者刘曲）世界卫生组织21日公布的最新数据显示，全球累计新冠确诊病例达650332899例。</p><p>世界卫生网站最新数据显示，截至欧洲中部时间21日17时19分（北京时间22日零时19分），全球确诊病例较前一日增加354408例，达到650332899例；死亡病例增加895例，达到6649874例。</p><p><br></p><p><img src=\"http://192.168.43.206:5000/api/uploads/epidemicInfo/ZNC4KFwyHVNs865bb0d455f915b27146abf18c622303.png\" width=\"80%\"></p><p><br></p>', '2023-04-22', '超级管理员', '超级管理员');
INSERT INTO `epidemicinfo` VALUES (18, '新冠正走向流感化', 'http://192.168.43.206:5000/api/uploads/epidemicInfo/tmp_79faf643b2d1fb050d554bc24b2d6d8449b3692b285a212e.jpg', '<p><strong style=\"font-size: 24px;\">“二阳”悄悄开始，新冠正走向流感化</strong></p><p>部分网友最近在社交平台晒出抗原阳性的照片，称自己“二阳”了。同时，一些地区出现新增的XBB.1.16变异株病例，这是新冠病毒奥密克戎重组病株的一种，属于XBB家族，民间取名“大角星”。</p><p><img src=\"http://192.168.43.206:5000/api/uploads/epidemicInfo/tmp_41bf22fcd687ec902f0fb16181991999b68bd8444652a4cf.jpg\" data-local=\"wxfile://tmp_41bf22fcd687ec902f0fb16181991999b68bd8444652a4cf.jpg\" width=\"80%\"></p><p><br></p>', '2023-04-23', '超级管理员', '超级管理员');
INSERT INTO `epidemicinfo` VALUES (21, '新冠第二波要来了？“五一”出行将增加感染风险？专家解答', 'http://192.168.43.206:5000/api/uploads/epidemicInfo/e65u1gcdEBOp75737f253da0040bc83b99ee901058bb.png', '<h1>新冠第二波要来了？“五一”出行将增加感染风险？专家解答</h1><p style=\"line-height: 2;\">央广网北京4月24日消息（记者王迟）近日，一些网友在社交媒体上晒出抗原阳性的照片，分享自己的“二阳”经历。新冠肺炎疫情的话题在时隔数月后，再次走入公众视野，部分网友为此感到担忧。这是否意味着疫情第二波高峰即将到来？“五一”假期将至，面对人员大量流动，是否会加速大规模的二次感染？针对这些问题，记者专访了首都医科大学附属北京佑安医院呼吸与感染性疾病科主任医师李侗曾。</p><ol><li style=\"line-height: 2;\">“短期内不会产生第二波感染高峰”</li><li style=\"line-height: 2;\">“五一”假期可能会增加感染风险</li><li style=\"line-height: 2;\">新冠正在走向流感化</li></ol><p style=\"line-height: 2;\"><br></p><p style=\"line-height: 2;\">同时，李侗曾建议，大家要根据季节和疫情情况随时调整防护措施，医疗机构要根据疫情情况随时调整药物储备、接诊室开放情况。</p><p style=\"line-height: 2;\"><br></p><p style=\"line-height: 2;\"><br></p>', '2023-04-25', '超级管理员', '超级管理员');

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
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (18, '疫情防控个人防护要求', '为了全体同学的生命健康，学校要求同学们做到以下几点：\n1、勤洗手\n2、宿舍勤通风\n3、注意咳嗽礼仪，保持社交距离\n4、推广分餐公筷，卫生又健康\n5、养成良好生活习惯\n6、坚持科学防疫', 'http://192.168.43.206:5000/api/uploads/notice/tmp_d57a7a9814795c196e21f0f0c37e3a3fda1fdf4fde5658f9.jpg', '2023-01-25', '超级管理员', '超级管理员');
INSERT INTO `notice` VALUES (29, '疫情防控注意事项', '近期，全国疫情频发，我市出现本土确诊病例，防控形势复杂严峻。为了同学们的身体健康和生命安全，根据上级相关疫情防控规定，现将有关注意事项告知如下：\n一、主动报告防异常\n二、严格出行减风险\n三、身体不适速就医\n四、加强防护远病毒\n五、聚集活动少参与', 'http://192.168.43.206:5000/api/uploads/notice/tmp_a05d2613037c6b66a03b54dc16acce744c7d8f8f9a008919.jpg', '2023-02-02', '超级管理员', '超级管理员');
INSERT INTO `notice` VALUES (31, '关于进一步加强校园疫情防控的公告', '根据本市发布最新消息：根据《新冠肺炎防控方案（第九版）》要求，我校所在区域即日起被调整为中风险地区，学校将按要求落实相关管理措施。\n请全体师生员工密切关注学校后续发布的相关通知。感谢大家的理解、配合和支持，携手同心、共克时艰。', '', '2022-11-20', '超级管理员', '超级管理员');
INSERT INTO `notice` VALUES (36, '校园疫情防控要求', '当前，疫情形势日趋严峻，按照全国、省、市、区疫情防控指挥部防控工作要求，为保障人民群众生命安全和身体健康，持续做好防控工作，即日起，请同学们积极配合学校做好以下防控工作：\n1、学校严格实行封闭式管理\n2、务必做好学生体温监测\n3、有序入校、离校，外来车辆上课期间不得进入校园\n4、佩戴口罩，做好个人防护', 'http://192.168.43.206:5000/api/uploads/notice/tmp_59053d2da2e449ca6ecbc33dfd479bb4fd0e3d53962ef471.jpg', '2023-04-21', '超级管理员', '超级管理员');

-- ----------------------------
-- Table structure for outapply
-- ----------------------------
DROP TABLE IF EXISTS `outapply`;
CREATE TABLE `outapply`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of outapply
-- ----------------------------
INSERT INTO `outapply` VALUES (11, '2019111202', '林北星', '19科技2班', '回家', '上海市', '省外', '2023-04-28', '2023-05-03', '学校 --》 上海', '飞机', '2023-04-25 14:09:00', '审核通过', '同意！', '李科', '2023-04-25 14:24:00');
INSERT INTO `outapply` VALUES (12, '2019111203', '张万森', '19科技2班', '回家', '上海', '省外', '2023-04-28', '2023-05-03', '学校 --》上海', '飞机', '2023-04-25 14:17:00', '审核通过', '同意！', '李科', '2023-04-25 14:24:00');
INSERT INTO `outapply` VALUES (13, '2019011103', '吴宇', '19国贸1班', '回家', '广州', '市外', '2023-04-27', '2023-04-29', '学校 --》广州', '高铁', '2023-04-25 15:08:00', '待审核', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for professional
-- ----------------------------
DROP TABLE IF EXISTS `professional`;
CREATE TABLE `professional`  (
  `id` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `professional` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `college` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uid` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2019010001', '1212', '唐糖', '教师', '19会计1班', '', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_7f71de858c184a280a9973cfd536d3a24c2a427f9ef3f555.jpg');
INSERT INTO `user` VALUES ('2019011101', '1212', '李佳琦', '学生', '19国贸1班', '国际经济与贸易', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_58b4ac2f2f3dbf191254c0e803080249c6911a6d7523f1d0.jpg');
INSERT INTO `user` VALUES ('2019011102', '1212', '王维', '学生', '19国贸1班', '国际经济与贸易', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_f088570e8bc67ee315d7dc4f1db50b779dff2a956cc45db7.jpg');
INSERT INTO `user` VALUES ('2019011103', '1212', '吴宇', '学生', '19国贸1班', '国际经济与贸易', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/VMvGuYBHj6C159d700fcf1386c92ddf1b804d415b2f9.jpg');
INSERT INTO `user` VALUES ('2019011104', '1212', '小福', '学生', '19国贸1班', '国际经济与贸易', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/oZmmNvevknfncb6691b7bd2c9219364c546f62dd3dfe.jpg');
INSERT INTO `user` VALUES ('2019011105', '1212', '程', '学生', '19国贸1班', '国际经济与贸易', '经济与管理学院', '', '', '');
INSERT INTO `user` VALUES ('2019011201', '1212', '旺旺', '学生', '19国贸2班', '国际经济与贸易', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_111b37679987b3d46fe19f03d68a311e0ca3069363f83a64.jpg');
INSERT INTO `user` VALUES ('2019011202', '1212', '带小帅', '学生', '19国贸2班', '国际经济与贸易', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/AdrlN7Six7jt29861b2212bdff6245751a599777d770.jpg');
INSERT INTO `user` VALUES ('2019011203', '1212', '简亓', '学生', '19国贸2班', '国际经济与贸易', '经济与管理学院', '13802021212', '河南省郑州市', 'http://192.168.43.206:5000/api/uploads/headImg/Xa2vrAVB0vru64adf37ece6e13af5fab573dcf44937c.jpg');
INSERT INTO `user` VALUES ('2019012101', '1212', '秦快', '学生', '19会计1班', '会计学', '经济与管理学院', '', '', '');
INSERT INTO `user` VALUES ('2019012102', '1212', '方圆', '学生', '19会计1班', '会计学', '经济与管理学院', '', '', '');
INSERT INTO `user` VALUES ('2019040001', '1212', '吴迪', '教师', '19体教1班', '', '体育学院', '', '', '');
INSERT INTO `user` VALUES ('2019041101', '1212', '林非', '学生', '19体教1班', '体育教育', '体育学院', '', '', '');
INSERT INTO `user` VALUES ('2019110001', '1212', '李科', '教师', '19科技1班,19科技2班', '', '计算机学院', '13832657899', '', 'http://192.168.43.206:5000/api/uploads/headImg/MrcPx1wYjkht77576666e5a0db2afd62af32b6ec81d0.png');
INSERT INTO `user` VALUES ('2019111101', '1212', '展宇', '学生', '19科技1班', '计算机科学与技术', '计算机学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/pNhKkdosvgJk1cec830468cf4840fa348e038949bad0.png');
INSERT INTO `user` VALUES ('2019111102', '1212', '韩藤藤', '学生', '19科技1班', '计算机科学与技术', '计算机学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/3oFMMlEFqtNG59d700fcf1386c92ddf1b804d415b2f9.jpg');
INSERT INTO `user` VALUES ('2019111103', '1212', '林大海', '学生', '19科技1班', '计算机科学与技术', '计算机学院', '14726547767', '上海市', 'http://192.168.43.206:5000/api/uploads/headImg/04nA4fzmW0nAa4957aaa1496a51af78a12c6b04d1eb9.jpg');
INSERT INTO `user` VALUES ('2019111201', '1212', '张高级', '学生', '19科技2班', '计算机科学与技术', '计算机学院', '13802326122', '广东省', 'http://192.168.43.206:5000/api/uploads/headImg/ESplDvVwvNHX16451315a22b9966bdab541b482631f2.png');
INSERT INTO `user` VALUES ('2019111202', '1212', '林北星', '学生', '19科技2班', '计算机科学与技术', '计算机学院', '13896532466', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_5a7a166737487cd4ca3eb9f23e637c45780fa54ea974d499.jpg');
INSERT INTO `user` VALUES ('2019111203', '1212', '张万森', '学生', '19科技2班', '计算机科学与技术', '计算机学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_fa7ec9ad0c34bd3b663e2ca23e6f6a2f5d31808362e36b9b.jpg');
INSERT INTO `user` VALUES ('2019111204', '1212', '高歌', '学生', '19科技2班', '计算机科学与技术', '计算机学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_e8bc11525f5266ab2e6e9371a57b49824aa4759c9a1cb932.jpg');
INSERT INTO `user` VALUES ('2019111205', '1212', '杨超洋', '学生', '19科技2班', '计算机科学与技术', '计算机学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/tmp_8ef4ad2650aaa6c91525b741296ab2f7de62f245d7fdd583.jpg');
INSERT INTO `user` VALUES ('2019114101', '1212', '吴宇', '学生', '19大数据1班', '数据科学与大数据技术', '计算机学院', '', '', '');
INSERT INTO `user` VALUES ('2020010001', '1212', '高光明', '教师', '19投资1班', '', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/wUx3s41B8fqoe0805116711882f40bd1c30a8d092353.png');
INSERT INTO `user` VALUES ('2020010002', '1212', '杜富国', '教师', '19国贸1班,19国贸2班', '', '经济与管理学院', '', '', 'http://192.168.43.206:5000/api/uploads/headImg/q1IbgZpT73pb0b42d668592d86c0c007297a896b8d35.jpg');
INSERT INTO `user` VALUES ('4144010580', '1212', '超级管理员', '管理员', '', '', '', '13556788889', '', 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er1BaYeOpeIxoszejj5JQI80htmM0kW5LSQlTQVaEhDuYeYxccc02y303lAicPOibZeXprFWRiczIX6g/132');

SET FOREIGN_KEY_CHECKS = 1;
