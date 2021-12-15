<template>
	<view class="content">
		<u-swiper :list="swiperList" indicator indicatorMode="line" circular height='280' class="swiper"></u-swiper>
		<u-button text="购物车" @click="toShoppingCart"></u-button>
		<u-button text="立即点餐" @click="toMenu"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: ['https://cdn.uviewui.com/uview/swiper/swiper1.png',
                    'https://cdn.uviewui.com/uview/swiper/swiper2.png',
                    'https://cdn.uviewui.com/uview/swiper/swiper3.png']
			}
		},
		onLoad() {

		},
		methods: {
			toMenu() {
				uni.switchTab({
					url: '../menu/menu'
				})
			},
			toShoppingCart(){
				uni.switchTab({
					url: '/pages/shopping_cart/shopping_cart'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.swiper{
		border-bottom-left-radius: 25rpx !important;
		border-bottom-right-radius: 25rpx !important;
		overflow: hidden;
	}
</style>
