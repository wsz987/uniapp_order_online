<template>
	<view class="goods-info-card">
		<view class="name">
			{{name}}
		</view>
		<view class="desc">
			{{desc}}
		</view>
		<view class="params">
			<u--form labelPosition="left" :model="paramsFrom" :rules="rules" ref="params">
				<u-form-item label="选料" prop="snacks"></u-form-item>
				<u-form-item label="温度" prop="temperature"></u-form-item>
				<u-form-item label="糖度" prop="sugar"></u-form-item>
			</u--form>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: "GoodsInfoCard",
		props: {
			price: Number,
			name: String,
			desc: String,
			details: String
		},
		data() {
			return {
				paramsFrom:{
					snacks:null,
					temperature: null,
					sugar: null
				}
			};
		},
		created() {

		},
		watch:{
			getGoodsParams(val){
				// this.paramsFrom=val
			}
		},
		computed: {
			...mapGetters('config', [
				'getGoodsParams'
			]),
		}
	}
</script>

<style lang="scss" scoped>
	.goods-info-card {
		display: flex;
		flex-direction: column;
		padding: 15rpx 25rpx;
		box-sizing: border-box;
		border-radius: 18rpx;
		box-shadow: 0 5rpx 8rpx rgba(0, 0, 0, .3);

		.name {
			font-size: 35rpx;
			font-weight: bold;
		}

		.desc {
			font-size: 28rpx;
		}
	}
</style>
