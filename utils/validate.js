import api from '@/api'
import store from '@/store'
export async function isLogin(callBack) {
	// #ifdef MP-WEIXIN
		const tokenExpiredCheck = await store.dispatch('user/tokenExpiredCheck')
		const userInfoStatus = await api.getUserInfo()

		if(userInfoStatus && !tokenExpiredCheck){
			await api.wxlogin()
			await store.dispatch('user/getCurrentUserInfo')
		}else if(userInfoStatus && tokenExpiredCheck) callBack && callBack()
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
	const openid = uni.getStorageSync('openid');
	if (!openid) return false
	return openid
}


export async function responseCode(code) {
	switch(code){
		case 30203: //token 过期
			// uni.showToast({
			// 	icon:'none',
			// 	title:""
			// })
			await api.wxlogin()
		break
	}
}