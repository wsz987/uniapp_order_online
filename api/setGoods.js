import request from "@/utils/request.js"
export default function(data) {
	const token = uni.getStorageSync("token")
	const openid = uni.getStorageSync("openid")
	return request('setGoods',{token,openid,...data})
}