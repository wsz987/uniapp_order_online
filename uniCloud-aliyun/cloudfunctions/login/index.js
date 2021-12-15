'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		affectedDocs,
		data
	} = await db.collection('user').where(event).get()
	console.log('event : ', affectedDocs, data)
	if (!affectedDocs) return {
		code: 403,
		data:false,
		msg: '用户名或密码错误'
	}
	return {
		code: 200,
		data:true,
		msg: '登录成功'
	}
};
