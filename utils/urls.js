//  var host = "https://wxvip.hellogoing.cn";
var host = "http://192.168.31.214:8080";
var config = {

  accountAdd: host + "/account/add",
  indexLogin: host + "/login/login",
  indexSign: host + "/login/sign",
  accountListGetList: host + "/account/getList",
  accountShowUse: host + "/account/use",
  accountShowAdd: host + "/suggest/add",

  loginGetOpenId: host + "/login/getOpenId",
  accountAddAccount: host + "/account/addAccount",
  accountDel: host + "/account/del",
  accountGetInfo: host + "/account/getInfo",
  accountGetByList: host + "/account/getByList"



}
module.exports = config