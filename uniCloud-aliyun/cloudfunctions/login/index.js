'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	// url 请求解析
	if(event.queryStringParameters){
		event =event.queryStringParameters
	}
	
	
	const {
		affectedDocs,
		data
	} = await db.collection('user').where(event).get()
	// console.log('event : ', affectedDocs, data)
	if (!affectedDocs) return {
		code: 403,
		data:false,
		msg: '用户名或密码错误'
	}
	return {
		code: 200,
		// data:true,
		data:{
			status:true,
			userid:data[0]._id,
			username:data[0].username,
			avatar:data[0].avatar
		},
		msg: '登录成功'
	}
};
