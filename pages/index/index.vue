<template>
	<view class="home">
		<u-swiper :list="swiperList" indicator indicatorMode="line" circular height='280' class="swiper"></u-swiper>
		<view class="content">
			<u-grid border @click="handleGridClick">
				<u-grid-item v-for="(baseListItem,baseListIndex) in gridData" :key="baseListIndex" bgColor="#fff">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="baseListItem.name" :size="22" color="#FF7E00">
					</u-icon>
					<text class="grid-text" style="color:#FF7E00">{{baseListItem.title}}</text>
				</u-grid-item>
			</u-grid>
			<getPhoneNumberBtn />
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import getIndex from '@/api/getIndex.js'
	export default {
		data() {
			return {
				swiperList: [],
				gridData: [{
					name: 'scan',
					icon: 'static/tabbarIcon/shopping_cart.png',
					title: '扫码点餐'
				}, {
					name: 'shopping-cart',
					icon: 'static/tabbarIcon/shopping_cart.png',
					title: '购物车'
				}, {
					name: 'order',
					icon: 'static/tabbarIcon/menu.png',
					title: '立即点餐'
				}]
			}
		},
		onLoad() {
			this.handleIndexData()
		},
		methods: {
			...mapMutations('user', ['setUser']),
			scanCode() {
				uni.scanCode({
				 // onlyFromCamera: true,
					success: res => {
						console.log(res)
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						this.setUser({
							position: res.result
						})
						uni.showModal({
							title: '下单座位',
							content: res.result,
							showCancel: false
						});
					}
				})
			},
			handleGridClick(index) {
				console.log(index)
				let {
					name
				} = this.gridData[index]
				switch (name) {
					case 'scan':
						// #ifdef H5
						uni.showModal({
							content: '仅在小程序端支持',
							showCancel: false
						})
						// #endif
						// #ifdef MP-WEIXIN
						this.scanCode()
						// #endif
						break
					case 'shopping-cart':
						uni.switchTab({
							url: '/pages/shopping_cart/shopping_cart'
						})
						break
					case 'order':
						uni.switchTab({
							url: '../menu/menu'
						})
						break
				}
			},
			async handleIndexData() {
				// console.log(await getIndex())
				const {
					swiper
				} = await getIndex()
				this.swiperList = swiper
			}
		}
	}
</script>

<style scoped lang="scss">
	.swiper {
		border-bottom-left-radius: 25rpx !important;
		border-bottom-right-radius: 25rpx !important;
		overflow: hidden;
	}

	.content {
		z-index: 999;
		// margin-top: -60rpx;
		padding: 0 20rpx;

		/deep/ .u-grid {
			padding: 25rpx 0;
			border-radius: 18rpx;
			box-shadow: 0 5rpx 8rpx rgba(0, 0, 0, .3);
			overflow: hidden;
		}
	}
</style>
