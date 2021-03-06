'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {data:goods_params} = await db.collection('goods_params').get()
	const {data:goods_types} = await db.collection('goods_types').get()
	const {data:Upload} = await db.collection('config').where({
		key:"Upload"
	}).get()
	
	return {
		code: 200,
		data:{
			goods_params,goods_types,Upload:Upload[0].value
		}
	}
};
