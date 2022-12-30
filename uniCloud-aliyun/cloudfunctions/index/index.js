'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {data:swiper} = await db.collection('swiper').get()
	//返回数据给客户端
	return {
		code:200,
		data: {
			swiper
		}
	}
};
