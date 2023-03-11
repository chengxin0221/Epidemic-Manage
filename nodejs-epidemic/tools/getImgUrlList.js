/* 返回一条资讯中包含的图片路径 */
function getUrlList(epidemicInfo){
    var imgList = [];
    var imgUrlList = [];
    // 获取图片名称
    // 匹配 5000/api/uploads/ 到 '或" 的内容
    imgList = epidemicInfo.content.match(/5000\/api\/uploads\/([^\'\"]*)[\'\"]?/g);
    if(imgList !== null){
        imgList.forEach(item => imgUrlList.push('static/uploads/' + item.slice(17,-1)))
    }
    // http://192.168.43.206:5000/api/
    imgUrlList.push('static/' + epidemicInfo.coverImg.slice(31));
    return imgUrlList;
}

module.exports = {getUrlList};