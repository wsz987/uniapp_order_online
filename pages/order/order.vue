<template>
	<view class="order">
		<u-empty mode="order" v-if="isEmpty"></u-empty>
		<OrderCard v-for="item in orderData" :key="item._id" :info="item" v-else></OrderCard>
	</view>
</template>

<script>
	import get_order from "@/api/get_order"
	export default {
		data() {
			return {
				orderData:[]
			};
		},
		onShow() {
			this.handleOrderData()
		},
		methods:{
			async handleOrderData(){
				const res= await get_order()
				this.orderData = res
			}
		},
		computed:{
			isEmpty(){
				return this.orderData.length==0
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order {
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		/deep/ .u-empty {
			height: 70vh;
			display: flex;
			align-items: center;
		}
	}
</style>
