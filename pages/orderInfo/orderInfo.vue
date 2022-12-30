<template>
	<view class="container">
		<view class="status">
			<text class="t-1">订单已完成</text>
			<text class="t-2">感谢您的光临 Good Luck!</text>
			<view class="btns">
				<u-button shape="circle" text="评价" plain></u-button>
				<u-button type="warning" shape="circle" text="再来一单" plain @click="toMenu"></u-button>
			</view>
		</view>
		<view class="order">
			<view class="head">
				xxxxxx 店
			</view>
			<u-divider></u-divider>
			<view class="goods-item" v-for="item in info.order_data" :key="item._id">
				<view class="good-img">
					<u-image :src="item.goods_imgs[0]" lazy-load radius="5" width="60" mode="widthFix"></u-image>
				</view>
				<view class="content">
					<view class="name">
						{{ item.goods_name }}
					</view>
				</view>
				<view class="info">
					<view class="price">￥{{ $price(item.goods_price) }}</view>
					<view class="count">
						x{{item.count}}
					</view>
				</view>
			</view>
			<u-divider></u-divider>
			<view class="bottom">
				<view class="remarks">
					备注
					<view class="content">{{info.remarks}}</view>
				</view>
				<u-divider></u-divider>
				<view class="price">
					共计{{getOrderCount(info.order_data)}}件商品，合计 ￥{{ $price(info.price) }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info:{}
		};
	},
	onLoad() {
		const eventChannel = this.getOpenerEventChannel();
		eventChannel.on('acceptDataFromOpenerPage', (data) =>{
			this.info = data.data
		});
	},
	methods: {
		toMenu() {
			uni.switchTab({
				url:'/pages/menu/menu'
			});
		}
	},
	computed:{
		getOrderCount(){
			return data => data && data.reduce((pre,current)=>pre+current.count,0)
		}
	}
};
</script>

<style lang="scss" scoped>
	page {
		background: #F8F8F8 !important;
	}
.container {
	width: 100%;
	.status {
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: space-evenly;
		height: 360rpx;
		.t-1 {
			font-size: 50rpx;
		}
		.t-2 {
			font-size: 20rpx;
		}
		.btns {
			display: flex;
			justify-content: space-around;
			margin: 0 40rpx;
			.u-button {
				width: 200rpx;
			}
		}
	}
	.order{
		margin: 0 14px;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 12px;
		.head{
			height: 40rpx;
		}
		
		.bottom{
			.remarks{
				.content{
					text-align: end;
				}
			}
			.price{
				text-align: end;
			}
		}
		
		.goods-item {
			// height: 180rpx !important;
			display: flex;
			flex-direction: row;
			padding: 15rpx 20rpx;
			box-sizing: border-box;
			
			.good-img {
				min-width: 60px !important;
				/deep/ .u-image {
					height: 100% !important;
				}
			}
		
			.content {
				margin-left: 20rpx;
				width: 100%;
				// position: relative;
				margin-right: auto;
		
				.name {
					font-weight: bolder;
					display: flex;
				}
			}
			.info{
				right: 0;
				.price {
					font-size: 36rpx;
				}
				.count {
					color: #555555;
					text-align: center;
				}
			}
		}
	}
}
</style>
