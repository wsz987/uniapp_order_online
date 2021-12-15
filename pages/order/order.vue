<template>
	<view class="order">
		<u-empty mode="order" class="empty"></u-empty>
		<!-- <OrderCard></OrderCard> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},

	}
</script>

<style lang="scss" scoped>
	.order {
		/deep/.empty {
			height: 70vh;
			display: flex;
			align-items: center;
		}
	}
</style>
