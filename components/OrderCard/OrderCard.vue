<template>
	<view class="order-card">
		<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" :lazy-load="true" radius='5'
			width='80'>
		</u--image>
	</view>
</template>

<script>
	export default {
		name:"OrderCard",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.order-card{
	width: 100%;
	height: 240rpx !important;
	padding: 15rpx 20rpx;
	box-sizing: border-box;
	border-radius: 18rpx;
	box-shadow: 0 5rpx 8rpx rgba(0, 0, 0, .3);
	/deep/.u-image{
		height: 100% !important;
	}
}
</style>
