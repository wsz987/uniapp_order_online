import api from '@/api'
export async function isLogin(code) {
	switch(code){
		case 30203: //token 过期
			// uni.showToast({
			// 	icon:'none',
			// 	title:""
			// })
			await api.wxlogin()
		break
	}
	
	
	const openid = uni.getStorageSync('openid');
	if (!openid) {
		// #ifdef MP-WEIXIN
			await api.getUserInfo()
			api.wxlogin()
		// #endif
		// #ifndef MP-WEIXIN
		// uni.navigateTo({
		// 	url: '/pages/login/login',
		// 	complete: () => {
		// 		setTimeout(() => {
		// 			uni.showToast({
		// 				title: '请先登录',
		// 				icon: 'none'
		// 			})
		// 		}, 500)
		// 	}
		// })
		// #endif
		return false
	}
	
	return openid
}
