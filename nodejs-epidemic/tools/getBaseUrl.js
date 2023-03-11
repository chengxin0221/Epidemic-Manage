/* 获取ip地址后组成根路径 */
const address = require('address');

let ip = {WLAN: '', VMnet1: ''};
//win10：以太网适配器 VMware Network Adapter VMnet1 （代表主机的网络适配器）（电脑连网线，手机连电脑的WiFi时使用）
//      无线局域网适配器 WLAN （连WiFi时使用该ipv4地址）
ip.WLAN = address.ip('WLAN');
ip.VMnet1 = address.ip('VMware Network Adapter VMnet1');
// console.log('ip为：', ip);

// 根路径
// var baseUrl = "http://169.254.125.109:5000/api";
// var baseUrl = "http://192.168.43.206:5000/api";
var baseUrl = `http://${ip.WLAN?ip.WLAN:ip.VMnet1}:5000/api`;
// console.log(baseUrl,'base---')

module.exports = baseUrl;