import request from "@/utils/request.js"
import { isLogin } from "@/utils/validate.js"
import store from '@/store'
export default async function(info={}){
	const user_id = await isLogin()
	if(!user_id){ 
		uni.showToast({
			icon:"none",
			title:"请登录"
		})
		return false
	}
	const orderData = await store.getters['shoppingCart/getCart']
	if(orderData.length==0){
		uni.showToast({
			icon:"none",
			title:"请添加商品"
		})
		return false
	}
	
	const position = await store.getters['user/getPosition']
	let order_id_Array = orderData.reduce((arr,{_id})=>{
		 arr.push(_id)
		 return arr;
	}, [])
	let goods_count = orderData.reduce((obj,{_id,count})=>{
		obj[_id]=count
		return obj
	},{})
	return request('add_order',{user_id,order_data:order_id_Array,goods_count,position,info})
}