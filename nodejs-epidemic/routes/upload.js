const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const baseUrl = require('../tools/getBaseUrl'); //获取根路径
const multer = require("multer"); //用于读取上传文件
const uploads = multer({ dest: './static/uploads' }); //设置存储路径，没有文件夹会自动创建
router.use(uploads.any()); // 通过这个注册  any表示任意类型的文件

// $route   POST /api/uploadImg
// @desc    将上传的二进制文件读取并写入成可读文件并删除原二进制文件
// @access  public
router.post('/uploadImg', (req, res) => {
	const type = req.query.type;
	// console.log(req.files);
	// process.cwd()用于获取node.js流程的当前工作目录 获得 D:\361\Epidemic\nodejs-epidemic
	fs.readFile(process.cwd() + '\\' + req.files[0].path, function (err, data) {
		//判断文件是否读取成功 err为nul则成功，不为null则失败
		if (err) {
			// console.log('图片上传失败！' + err.message);
			return res.send({
				stauts: 1,
				message: '图片上传失败！'
			});
		}
		// 存储路径下的子文件夹 /notice或/epidemicInfo需要自行新建好目录，否则写入会失败
		var sonFile =  '/epidemicInfo';
		if(type === "notice") sonFile = '/notice';
		if(type === "headImg") sonFile = '/headImg';
		// 新图片url地址
		var imgUrl = baseUrl + '/uploads' + sonFile + '/' + req.files[0].originalname;
		// process.cwd()用于获取node.js流程的当前工作目录。'/static/uploads'必须与multer中设置的存储路径一致！
		fs.writeFile(path.join(process.cwd(), '/static/uploads', sonFile, req.files[0].originalname), data, err => {
			if (err) {
				console.log('图片文件写入失败！',err);
				return res.send({
					status: 1,
					message: '图片文件写入失败！'
				})
			}
			try {
				// 删除原图片
				// console.log("即将删除的原图片路径：",req.files[0].path);
				fs.unlinkSync(req.files[0].path);
			} catch (error) {
				console.log("图片上传成功，但删除原二进制图片失败！",error.message);
			}
			return res.send({
				status: 0,
				message: '图片上传成功！',
				imgUrl: imgUrl
			})
		})
	});
});

module.exports = router;