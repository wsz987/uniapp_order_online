'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {data} = await db.collection('goods').get()
	
	//返回数据给客户端
	return {
		code: 200,
		data
	}
};
