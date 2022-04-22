import store from '@/store'
export default function() {
	return new Promise((resolve, reject) => {
		const username = uni.getStorageSync('username');
		const avatar = uni.getStorageSync('avatar');
		if(username || avatar) return resolve(true)
		uni.getUserProfile({
			desc: '是否授权微信登录',
			success: res => {
				const { userInfo, iv } = res
				store.commit('user/setUser', {
					username: userInfo.nickName,
					avatar: userInfo.avatarUrl
				})
				resolve(userInfo)
			},
			fail: err => {
				resolve(false)
			}
		})
	})
}
