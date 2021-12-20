<template>
	<view class="mine">
		<UserCard></UserCard>
		<view class="text">
			大道至简
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.text{
	width: 100%;
	height: 100%;
	margin-top: 40rpx;
	font-weight: bold;
	font-size: 200rpx;
	display: flex;
	color: $app-base-color;
	align-items: center;
	writing-mode: vertical-rl;
}
</style>
