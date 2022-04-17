<template>
	<view class="order-card">
		<view class="status">
			<view class="order-time">
				{{info.create_date | dateFormat}}
			</view>
			<u-tag :text="info.position? info.position :'自提'" type="warning" size="mini"></u-tag>
			<view class="complete">
				<u-tag text="已完成" plain size="mini" type="warning"></u-tag>
			</view>
		</view>
		<u-divider :dot="true"></u-divider>
		<view class="content">
			<view class="goods-item" v-for="item in getOrderImg(info.order_data)" :key="item._id">
				<u--image :src="item.src" :lazy-load="true" radius='5' width='90' mode="widthFix">
				</u--image>
				<u-badge type="warning" max="99" :value="item.count" absolute :offset="[0,0]"></u-badge>
			</view>
		</view>
		<u-divider text="- · -"></u-divider>
		<view class="bottom">
			<view class="total-count">共计 {{totalCount}} 件商品</view>
			<view class="price"> 合计：￥{{$price(info.price)}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "OrderCard",
		options: {
			styleIsolation: 'shared'
		},
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		methods: {
			handleGoodsImgDataFormat(data) {
				return data.reduce((acc, item) => {
					acc.push({src:item.goods_imgs[0],count:item.count})
					return acc
				}, [])
			}
		},
		computed: {
			totalCount() {
				return this.info.order_data.reduce((acc, {
					count
				}) => acc + count, 0)
			},
			getOrderImg() {
				return data => {
					let showNumber = 3
					let length = data.length
					if (length <= showNumber) return this.handleGoodsImgDataFormat(data)
					else return this.handleGoodsImgDataFormat(data.slice(0, showNumber))
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	$card-height:340rpx;
	$content-height: 180rpx;

	.order-card {
		width: 100%;
		// height: $card-height !important;
		display: flex;
		flex-direction: column;
		margin-bottom: 10rpx;
		padding: 20rpx 20rpx;
		box-sizing: border-box;
		border-radius: 18rpx;
		box-shadow: 0 5rpx 8rpx rgba(0, 0, 0, .3);

		.status {
			height: 35rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;
			padding: 0 10rpx;
			box-sizing: border-box;

			.order-time {
				font-size: 20rpx;
				margin-right: 20rpx;
			}

			.complete {
				position: absolute;
				right: 0;
			}
		}

		.content {
			height: $content-height;
			display: flex;
			flex-direction: row;
			// justify-content: space-around;
			.goods-item{
				position: relative;
				// .badge{
				// 	bottom: 0;
				// 	right: 0;
				// }
			}
		}

		.bottom {
			height: 26rpx;
			padding: 0 10rpx;
			box-sizing: border-box;
			font-size: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;

			.price {
				position: absolute;
				right: 0;
			}
		}

		/deep/ .u-divider {
			margin: 0 !important;
			// height: 40rpx;
		}

		/deep/ .u-image {
			height: 100% !important;
			margin-right: 10rpx !important;
		}

	}
</style>
