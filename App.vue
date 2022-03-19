<script>
	import api from '@/api'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$store.dispatch('config/getConfig')
			api.checkSession()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
