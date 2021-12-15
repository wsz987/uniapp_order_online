<template>
	<view class="goods">
		<u-swiper :list="goodsData.goods_imgs" indicator indicatorMode="line" circular height='280' class="swiper">
		</u-swiper>
		<view class="content">
			<GoodsInfoCard :name="goodsData.goods_name" :price="goodsData.goods_price"
			:desc="goodsData.goods_desc"></GoodsInfoCard>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsData: {
					"_id": "61b22b2ebdfab500017722a7",
					"goods_desc": "这是一杯奶茶",
					"goods_details": "有珍珠，有奶，还有茶",
					"goods_imgs": ["https://cdn.uviewui.com/uview/swiper/swiper2.png",
						"https://cdn.uviewui.com/uview/swiper/swiper3.png"
					],
					"goods_name": "珍珠奶茶",
					"goods_params": [2001],
					"goods_price": 900,
					"goods_type_id": 1001
				}
			};
		},
		onLoad() {
			// #ifdef APP-NVUE
			const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('goodsData', ({ data }) => {
				console.log('goodsData', data)
				this.goodsData = data
			})
		},
		created() {

		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.goods {
		.content{
			padding: 0 20rpx;
			box-sizing: border-box;
		}
	}
</style>
