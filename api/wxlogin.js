/**
 * https://uniapp.dcloud.io/api/plugins/login.html
 * https://uniapp.dcloud.net.cn/uniCloud/uni-id.html#weixin
 * https://uniapp.dcloud.io/api/plugins/provider.html
 * @param {String} provider
 * @return {String} code
 */
import request from "@/utils/request.js"
import store from '@/store'
export default function() {
	uni.showLoading({
		title: '登录中'
	})
	return new Promise((resolve,reject)=>{
		uni.login({
			provider: 'weixin',
			success: async (loginRes) => {
				// console.log(loginRes.code);
				const wxloginRes = await request('login', {
					type: "login",
					provider: "weixin",
					code: loginRes.code,
				})
				console.log(wxloginRes);
				const {openid,sessionKey,token,tokenExpired} = wxloginRes
				store.commit('user/setUser',{openid,sessionKey,token,tokenExpired})
				resolve(true)
			},
			fail:err =>  {
				uni.showToast({
					icon:"none",
					title:"请求失败!"
				})
				resolve(false)
			}
		});
	})
	
}
