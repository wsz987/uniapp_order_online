'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {user_id,order_data,goods_count,position}=event
	const {data} = await db.collection('goods').where({
		"_id":dbCmd.in(order_data)
	}).get()
	
	data.map(item=>item['count']=goods_count[item._id])
	
	const isOrder = await db.collection('order').add({
		user_id,
		position,
		order_data:data,
		create_date:new Date().getTime(),
		price:data.reduce((total,{goods_price,count})=>total+goods_price*count,0),
		...event.info
	})
	console.log(isOrder)
	
	if(!isOrder) return { code:403, msg:'订单错误' }
	
	const result = data.reduce((success,{_id,count})=>{
		success.push({_id,count})
		return success
	},[])
	
	await uniCloud.callFunction({
	    name: "WxPusher",
	    data: {...event,data}
	})
	//返回数据给客户端
	return {
		code:200,
		msg:'下单成功',
		data:result
	}
};
