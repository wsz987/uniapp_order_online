import request from "@/utils/request.js"
export default function(loginForm){
	console.log(loginForm)
	return request('login',loginForm)
}