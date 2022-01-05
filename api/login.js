import request from "@/utils/request.js"
export default function(loginForm){
	uni.showLoading({
		title:'登录中'
	})
	return request('login',loginForm)
}