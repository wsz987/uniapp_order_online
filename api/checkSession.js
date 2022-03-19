export default function() {
	uni.checkSession({
		complete: res => {
			console.log('checkSession',res)
		}
	})
}
