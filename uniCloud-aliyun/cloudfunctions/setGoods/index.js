'use strict';
const db = uniCloud.database()
const collection = db.collection('goods')
exports.main = async (event, context) => {
	const User = await uniCloud.callFunction({
	    name: "permissionHandle",
	    data: {
			token:event.token,
			openid:event.openid,
			needPermission:"ADMIN"
		}
	})
	const {checkRole,checkUser,code,msg} =User.result
	if(!checkRole || !checkUser) return {
		code,
		data:User.result,
		msg:msg?msg:"非法访问!"
	}
	
	let res = null 
	let { content }=event
	const { _id,goods_name,goods_price,goods_type_id,goods_imgs } = content //goods_details,goods_desc,goods_params
	console.log("goods_imgs",goods_imgs)
	if(_id){
		// let data = {}
		// for(let key in content){
		// 	if(key!="_id") data[key] = content[key]
		// }
		res = await collection.where({ 
			_id
		}).update({ 
			goods_name,
			goods_price:(goods_price-''),
			goods_type_id:goods_type_id-'',
			goods_imgs 
		})
	}else 
		res = await collection.add({ _id,goods_name,goods_price,goods_type_id,goods_imgs })
		
	try{
		if(event.delFileList)
			await uniCloud.deleteFile({fileList:event.delFileList})
	}catch(e){
		console.log('deleteFile',e)
	}
	return {
		code:200,
		data:res,
		msg:content._id?"修改成功":"添加成功"
	}
};
