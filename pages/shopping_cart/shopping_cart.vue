<template>
	<view class="shopping-cart">
		<u-empty mode="car" icon="/static/car.png" v-if="isEmpty" class="empty"></u-empty>
		<GoodsItem :info='item' v-for="(item,index) in getCart" :key='item._id' v-else />
		<view class="total-price" v-else>
			￥{{$price(getTotalPrice)}}
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters,
		mapActions
	} from 'vuex'
		import handle_shoppingCart from '@/mixin/handle_shoppingCart'
	export default {
		mixins:[handle_shoppingCart],
		data() {
			return {

			};
		},
		mounted() {
			// this.isEmpty && this.initShopping_Cart()
		},
		methods:{
			// ...mapActions('shoppingCart',['initShopping_Cart']),
			...mapMutations('shoppingCart',['setStorage'])
		},
		computed: {
			// ...mapGetters('shoppingCart', ['getCart','getTotalPrice']),
			// isEmpty(){
			// 	return this.getCart.length==0
			// }
		},
		watch:{
			getCart(){
				this.setStorage()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shopping-cart {
		height: 100vh;
		padding: 15rpx 20rpx;
		box-sizing: border-box;
		/deep/ .empty{
			height: 70vh !important;
			display: flex;
			align-items: center;
		}
	}
</style>
