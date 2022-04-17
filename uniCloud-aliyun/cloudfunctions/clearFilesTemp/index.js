'use strict';
const db = uniCloud.database()
const dbCmd = db.command
const collection = db.collection('filesTemp')
exports.main = async (event, context) => {
	const {data} = await collection.get()
	const db_res = []
	let filter = data.filter(item=>!item.status)
	if(!filter) return {
		code:200,
		data:null
	}
	const fileList = filter.map(item=>item.url)
	let result = await uniCloud.deleteFile({ fileList })
	if(result.code == 200){
		db_res = filter.map(async ({_id})=>{
			let res = await collection.where({_id}).remove()
			return res
		})
	}
	return {
		code:200,
		data:{result,db_res}
	}
};
