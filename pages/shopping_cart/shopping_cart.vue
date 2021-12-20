<template>
	<view class="shopping-cart">
		<u-empty mode="car" icon="/static/car.png" v-if="isEmpty"></u-empty>
		<GoodsItem :info='item' v-for="(item,index) in getCart" :key='item._id' v-else />
		<!-- <view class="total-price" v-else>
			￥{{$price(getTotalPrice)}}
		</view> -->
		
		<SubmitOrder :price="getTotalPrice"></SubmitOrder>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import handle_shoppingCart from '@/mixin/handle_shoppingCart'
	import setStorage from '@/mixin/setStorage.js'
	export default {
		mixins:[handle_shoppingCart,setStorage],
		data() {
			return {

			};
		},
		computed:{
			...mapGetters('shoppingCart', ['getTotalPrice']),
		}
	}
</script>

<style lang="scss" scoped>
	.shopping-cart {
		width: 100%;
		height: 100%;
		padding: 15rpx 20rpx;
		box-sizing: border-box;
		/deep/ .u-empty{
			height: 70vh !important;
			display: flex;
			align-items: center;
		}
	}
</style>
