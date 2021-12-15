<template>
	<view class="goods-item" @click="toGoods(info)">
		<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" :lazy-load="true" radius='5'
			width='80'>
		</u--image>
		<view class="content">
			<view class="name">
				{{info.goods_name}}
			</view>
			<view class="price">
				￥{{ $price(info.goods_price) }}
			</view>
			<!-- <view class="count">
				剩余 {{info.count}}
			</view> -->
			<view class="buy">
				<view :class="['reduce','btn',getGoodsCartCount(info._id)==0 ?'disabled':'']" @click.stop="reduceCountByID(info._id)">
					-
				</view>
				<view class="count">
					<!-- {{count}} -->
					{{getGoodsCartCount(info._id)}}
				</view>
				<view class="add btn" @click.stop="addCart(info)">
				<!-- <view class="add btn" @click.stop="count >= 0 && count++"> -->
					+
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters} from 'vuex'
	export default {
		name: "GoodsItem",
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				count: 0
			};
		},
		methods: {
			...mapMutations('shoppingCart',['addCart','reduceCountByID','setStorage']),
			toGoods(data) {
				// uni.navigateTo({
				// 	url: '/pages/goods/goods',
				// 	success: res => {
				// 		 res.eventChannel.emit('goodsData', { data })
				// 	}
				// })
			}
		},
		computed: {
			handlePrice() {
				return val => {
					return (val * 0.01).toFixed(2)
				}
			},
			...mapGetters('shoppingCart',['getGoodsCartCount','getCart'])
		},
		watch:{
			getCart(val){
				this.setStorage()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item {
		height: 180rpx !important;
		display: flex;
		flex-direction: row;
		margin-bottom: 10rpx;
		padding: 15rpx 20rpx;
		box-sizing: border-box;
		border-radius: 18rpx;
		box-shadow: 0 5rpx 8rpx rgba(0, 0, 0, .3);
		/deep/.u-image{
			height: 100% !important;
		}

		.content {
			margin-left: 20rpx;
			width: 100%;
			position: relative;	

			.name {
				font-weight: bolder;
			}
			
			.price{
				position: absolute;
				bottom: 0;
				color: #555555;
			}
		}
	}

	.buy {
		width: 140rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		position: absolute;
		bottom: 0;
		right: 0;

		.btn {
			height: 40rpx;
			width: 40rpx;
			color: #fff;
			margin: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #FF7E00;
			border-radius: 50rpx;
		}
	}

	.disabled {
		background-color: #cccccc !important;
	}
</style>
