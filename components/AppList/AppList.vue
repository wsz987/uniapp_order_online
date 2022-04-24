<template>
	<view class="app-list">
		<view class="app-list-item" @click="">
			<u-icon class="icon" name="bag" size="32"></u-icon>
			<view class="title">店铺信息</view>
			<view class="more"><u-icon name="arrow-right"></u-icon></view>
		</view>
		<button open-type="feedback" size="mini" class="app-list-item button">
			<u-icon class="icon" name="email" size="32"></u-icon>
			<view class="title">意见与建议</view>
			<view class="more"><u-icon name="arrow-right"></u-icon></view>
		</button>
		<view class="app-list-item" @click="">
			<u-icon class="icon" name="attach" size="32"></u-icon>
			<view class="title">隐私条款</view>
			<view class="more"><u-icon name="arrow-right"></u-icon></view>
		</view>
		<view class="app-list-item" @click="">
			<u-icon class="icon" name="bookmark" size="32"></u-icon>
			<view class="title">平台规则与使用协议</view>
			<view class="more"><u-icon name="arrow-right"></u-icon></view>
		</view>
		<button open-type="contact" size="mini" class="app-list-item button">
			<u-icon class="icon" name="kefu-ermai" size="32"></u-icon>
			<view class="title">客服</view>
			<view class="more"><u-icon name="arrow-right"></u-icon></view>
		</button>
	</view>
</template>

<script>
	export default {
		name:"AppList",
		options: { styleIsolation: 'shared' },
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
/deep/ .title {
	font-size: 29rpx !important;
	color: #000 !important;
	padding-left: 10rpx;
	line-height: 29rpx;
}

.app-list {
	margin:20rpx;
	overflow: hidden;
	.app-list-item {
		display: flex;
		align-items: center;
		background-color: white;
		padding: 0 20rpx;
		border-radius: 20rpx;
		margin-bottom: 15rpx !important;
		overflow: hidden !important;
		height: 90rpx !important;
		border-radius: 30rpx;
		border-bottom: 4rpx solid #ececec;
		.more{
			display: flex;
			position: absolute;
			right: 36rpx;
		}
	}

	.button {
		display: flex;
		align-items: center;
		border-radius: 20rpx !important;
		&::after {
			border: none;
		}
		/deep/ .more{
			right: 18rpx;
		}
	}
}
</style>