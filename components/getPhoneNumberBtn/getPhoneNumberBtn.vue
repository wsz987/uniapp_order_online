<template>
	<view>
		<button type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button>
	</view>
</template>

<script>
	import api from '@/api'
	export default {
		name:"getPhoneNumberBtn",
		data() {
			return {
				
			};
		},
		methods:{
			decryptPhoneNumber(event){
				api.wxlogin()
				// api.getPhoneNumber(event)
			}
		}
	}
</script>

<style lang="scss">

</style>
