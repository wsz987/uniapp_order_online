<template>
	<view class="content">
		<view class="submit-order">
			<view class="position" v-if="getPosition">
				餐位：<view style="font-weight: bold;">{{getPosition}}</view>
			</view>
			<view class="price">
				￥{{$price(price)}}
			</view>
		<!-- 	<view class="submit-btn" @click="submitOrder">
				购买
			</view> -->
			<view class="submit-btn" @click="submitOrderSubscribe">
				下单
			</view>
		</view>
		<OrderSubscribe @complete="complete" :show="show" @close="show=false"/>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import add_order from '@/api/add_order'
	export default {
		name: "SubmitOrder",
		props: {
			price: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				show:false
			};
		},
		methods: {
			...mapActions('shoppingCart', ['updateCart']),
			async submitOrder(info={}) {
				if(this.getCart.length == 0 ) return uni.showToast({
					icon:'none',
					title:"请添加购物车"
				})
				uni.showLoading({
					title: '订单提交中'
				})
				const success = await add_order(info)
				if(!success) return
				this.updateCart(success)
				uni.switchTab({
					url: '/pages/order/order'
				})
			},
			submitOrderSubscribe(){
				if(this.getCart.length == 0 ) return uni.showToast({
					icon:'none',
					title:"请添加购物车"
				})
				this.show=true
			},
			complete(e){
				this.show=false
				if(!e) return
				this.submitOrder(e)
			}
		},
		computed: {
			...mapGetters('user', ['getPosition']),
			...mapGetters('shoppingCart', ['getCart'])
		}
	}
</script>

<style lang="scss" scoped>
	$bottom: 40rpx;
	$radius: 20rpx;
	$submit-btn-width : 28%;
	$price-width: 100%-$submit-btn-width;

	.content {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.submit-order {
		width: 90%;
		margin: 0 auto;
		width: 680rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		bottom: $bottom;
		border-radius: $radius;
		// overflow: hidden;
		box-shadow: 0 5rpx 8rpx rgba(0, 0, 0, .3);

		.position {
			display: flex;
			flex-direction: row;
			padding-left: 6%;
			min-width: 200rpx;
		}

		.price {
			width: $price-width;
			padding-left: 6%;
			font-weight: bold;
			box-sizing: border-box;
			// border-top-left-radius: $radius;
			// border-bottom-left-radius: $radius;
		}

		.submit-btn {
			color: #fff;
			height: 100%;
			width: $submit-btn-width;
			box-sizing: border-box;
			padding: 10rpx;
			background-color: $app-base-color;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top-right-radius: 20rpx;
			border-bottom-right-radius: 20rpx;
		}
	}
</style>
