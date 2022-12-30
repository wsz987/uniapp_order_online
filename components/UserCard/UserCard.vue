<template>
	<view class="user-card">
		<view class="info-card-content">
			<image src="/static/mine/bgcard.png" mode="" class="img-top"></image>
			<view class="img-top on"></view>
			<view class="bottom"></view>
			<view class="avatar" @click.native="click">
				<image :src="getAvatar || avatar" class="img"></image>
			    <view class="name">{{getUserName || name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { isLogin } from "@/utils/validate.js"
	// import api from '@/api'
	// const {getUserInfo,wxlogin} = api
	export default {
		name:"UserCard",
		props: {
			avatar: {
				type:String,
				default:'/static/tabbarIcon/mine-active.png'
			},
			name: {
				type:String,
				default:'登录 / 注册'
			}
		},
		data() {
			return {
			};
		},
		methods:{
			click() {
				isLogin()
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: '/pages/login/login',
				})
				// #endif
			}
		},
		computed:{
			...mapGetters('user',['getUserName','getAvatar'])
		}
	}
</script>

<style lang="scss" scoped>
	.user-card {
		// background-image: linear-gradient(#FC4A1A, #F7B733);
		width: 100vw;
		height: 25vh;
		// border-radius: 0 0 10% 10%;
		text-align: center;
		color: white;

		.info-card-content {
			height: 100%;
			position: relative;

			.img-top {
				width: 100%;
				height: 60%;
			}

			.on {
				position: absolute;
				top: 0;
				// background-color: rgba(0, 0, 0, 0.54);
				background-color: black;
				opacity: .7;
			}

			.bottom {
				height: 40%;
				background-color: #ff7e00;
				margin-top: -10rpx;
				display: flex;
				align-items: center;
				border-bottom-left-radius: 42rpx;
				border-bottom-right-radius: 42rpx;
				box-shadow: 0 5rpx 8rpx rgba(0, 0, 0, .3);
				border-bottom: 6rpx dashed #FF9900;
			}
			.avatar {
				position: absolute;
				width: 100%;
				top: 0;
				height: 25vh;
				align-items: center;
				display: flex;
				justify-content: center;
				flex-direction: column;
				z-index: 9999;
				margin-top: 30rpx;
				.img {
					width: 70px;
					height: 70px;
					background-color: white;
					border-radius: 50%;
					z-index: 9999;
					border: 1px solid #e4e7ed;
				}
				.name {
					width: 100px;
					// padding-top: 10rpx;
					// margin-bottom: -10rpx;
					overflow: hidden;
					color: white;
					z-index: 9999;
					text-overflow: ellipsis;
					margin-bottom: -20rpx;
					padding-top: 10rpx;
					font-weight: bold;
				}
			}
			// .name {
			// 	width: 100px;
			// 	overflow: hidden;
			// 	text-overflow: ellipsis;
			// }
		}
	}
</style>
