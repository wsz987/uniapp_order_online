export function isLogin(){
	const open_id = uni.getStorageSync('open_id');
	if(!open_id){
		 uni.navigateTo({
			url:'/pages/login/login',
			complete: () => {
				setTimeout(()=>{
					uni.showToast({
						title: '请先登录',
						icon:'none'
					})
				},500)
			}
		})
		return false
	}
	return open_id
}