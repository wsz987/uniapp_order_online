'use strict';
const db = uniCloud.database()
const collection = db.collection("goods")
exports.main = async (event, context) => {
	let result = null
	let { data } = await collection.where({
	  _id:event._id
	}).get()
	
	try{
		result = await uniCloud.deleteFile(data[0].goods_imgs)
		await collection.where({
		  _id:data[0]._id
		}).remove()
	}catch(e){
		await collection.where({
		  _id:data[0]._id
		}).remove()
	}
	
	return {
		code:200,
		data:result,
		msg:"删除成功"
	}
};
