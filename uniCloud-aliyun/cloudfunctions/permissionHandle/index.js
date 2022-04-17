'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
	const { token,openid,needPermission } = event
	let USER =await uniID.checkToken(token, {
		needPermission:true,
		needUserInfo:true
	})
	USER = {...USER,checkUser:false,checkRole:false}
	switch(USER.code){
		case 0:
			const { role,userInfo }=USER
			if(userInfo && userInfo.wx_openid && userInfo.wx_openid["mp-weixin"]){
				if(userInfo.wx_openid["mp-weixin"] == openid){
					USER.checkUser = true
					if(role) {
						const result = role.indexOf(needPermission)>-1 ? true : false
						if(result) USER.checkRole = true
					}
				}
			}
		break
		case 30203: //token过期
		break
	}
	console.log("checkToken",USER)
	//返回数据给客户端
	return USER
};
