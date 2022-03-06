<template>
	<view class="login">
		<u--form labelPosition="left" :model="loginForm" :rules="fromRules" ref="loginFormRef" labelWidth="55">
			<u-form-item label="用户名" prop="username" ref="username">
				<u--input v-model="loginForm.username" border="bottom" clearable></u--input>
			</u-form-item>
			<u-form-item label="密 码" prop="password" ref="password">
				<u--input v-model="loginForm.password" border="bottom" password clearable></u--input>
			</u-form-item>
		</u--form>
		<u-button color="#FF7E00" text="登录 / 注册" @click="handleLogin"></u-button>
		<u-button type="success" text="微信授权" @click="wxLogin" openType="getUserInfo"></u-button>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	import login from '@/api/login'
	export default {
		data() {
			return {
				loginForm: {
					username: 'wsz987',
					password: 'wsz987'
				},
				fromRules: {
					username: {
						type: 'string',
						required: true,
						message: '请输入用户名',
					},
					password: {
						type: 'string',
						min: 6,
						required: true,
						message: '请确认密码',
					}
				}
			};
		},
		methods: {
			...mapMutations('user',['setUser']),
			handleLogin() {
				this.$refs['loginFormRef'].validate().then(async res => {
					const {status,userid,avatar,username} = await login(this.loginForm)
					status && uni.setStorageSync('open_id', userid) && uni.setStorageSync('username', username)
					this.setUser({userid,avatar,username})
					setTimeout(()=>status && uni.navigateBack(),1000)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		padding: 30rpx;
		box-sizing: border-box;
		/deep/ .u-button{
			margin: 30rpx 0 !important;
		}
	}
</style>
