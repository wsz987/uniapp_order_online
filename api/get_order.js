import request from "@/utils/request.js"
import { isLogin } from "@/utils/validate.js"
export default async function(){
	const user_id = await isLogin()
	if(!user_id)  {
		uni.showToast({
			icon:'none',
			title:"未登录"
		})
		return []
	}
	return request('get_order',{user_id})
}