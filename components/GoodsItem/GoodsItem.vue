<template>
	<view class="swipe">
		<u-swipe-action>
			<u-swipe-action-item :options="swipeOptions" :disabled="!swipe" :show="false" @click="handleSwipeAction($event,info._id)">
				<view class="goods-item" @click="toGoods(info)">
					<u-image :src="info.goods_imgs[0]" lazy-load radius='5' width='80' mode="aspectFit" @click.native="previewImage(info.goods_imgs[0])">
					</u-image>
					<view class="content">
						<view class="name">
							{{info.goods_name}}
							<slot name="edit" v-bind:info="info"></slot>
						</view>
						<view class="price">
							￥{{ $price(info.goods_price) }}
						</view>
						<view class="buy">
							<view :class="['reduce','btn',getGoodsCartCount(info._id)==0 ?'disabled':'']"
								@click.stop="reduceCountByID(info._id)">
								-
							</view>
							<view class="count">
								{{getGoodsCartCount(info._id)}}
							</view>
							<view class="add btn" @click.stop="addCart(info)">
								+
							</view>
						</view>
					</view>
				</view>
			</u-swipe-action-item>
		</u-swipe-action>
	</view>
</template>

<script>
	import {
		mapActions,
		mapMutations,
		mapGetters
	} from 'vuex'
	import setStorage from '@/mixin/setStorage.js'
	export default {
		name: "GoodsItem",
		mixins: [setStorage],
		options: { styleIsolation: 'shared' },
		props: {
			info: {
				type: Object,
				default: {}
			},
			swipe:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				count: 0,
				swipeOptions: [{
					text: '删除',
					style: {
						backgroundColor: '#f56c6c'
					}
				}]
			};
		},
		methods: {
			...mapActions('shoppingCart',['removeItem','addCart', 'reduceCountByID']),
			toGoods(data) {
				// uni.navigateTo({
				// 	url: '/pages/goods/goods',
				// 	success: res => {
				// 		 res.eventChannel.emit('goodsData', { data })
				// 	}
				// })
			},
			handleSwipeAction({index},ID){
				console.log("handleSwipeAction")
				switch(index){
					case 0:
						this.removeItem(ID)
					break
				}
			},
			previewImage(url){
				uni.previewImage({
					urls: [url],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		},
		computed: {
			handlePrice() {
				return val => {
					return (val * 0.01).toFixed(2)
				}
			},
			...mapGetters('shoppingCart', ['getGoodsCartCount'])
		}
	}
</script>

<style lang="scss" scoped>
	.swipe {
		margin-bottom: 10rpx;
		overflow: hidden;
		border-radius: 18rpx;
		box-shadow: 0 5rpx 8rpx rgba(0, 0, 0, .3);
	}
	/deep/ .u-swipe-action-item__content{
		z-index: 999 !important;
	}

	.goods-item {
		height: 180rpx !important;
		display: flex;
		flex-direction: row;
		padding: 15rpx 20rpx;
		box-sizing: border-box;
		// z-index: 999 !important;

		/deep/.u-image {
			height: 100% !important;
			// height: auto !important;
		}

		.content {
			margin-left: 20rpx;
			width: 100%;
			position: relative;

			.name {
				font-weight: bolder;
				display: flex;
			}

			.price {
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

	/deep/ .u-image__loading {
		height: 100% !important;
	}
</style>
