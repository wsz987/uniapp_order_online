import request from "@/utils/request.js"
import { isLogin } from "@/utils/validate.js"
export default async function(){
	const user_id = await isLogin()
	return request('get_order',{user_id})
}