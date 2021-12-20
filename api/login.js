import request from "@/utils/request.js"
export default function(loginForm){
	return request('login',loginForm)
}