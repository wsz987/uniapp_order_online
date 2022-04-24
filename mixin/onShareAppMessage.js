// https://uniapp.dcloud.net.cn/api/plugins/share.html#%E5%88%86%E4%BA%AB
// https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle
export default {
	// 分享给朋友/群
	onShareAppMessage(res) {
		return {
			title: '在线点餐小程序',
			path: '/pages/index/index',
		}
	},
	// 分享到朋友圈
	onShareTimeline() {
		return {
			title: '在线点餐小程序',
			path: '/pages/index/index'
		}
	}
}
