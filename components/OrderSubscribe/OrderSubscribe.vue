<template>
	<u-popup :show="show" @close="close" :round="15" closeable safeAreaInsetTop :closeOnClickOverlay="false">
		<view class="content">
			<u--form :rules="rules" ref="subForm" :model="info">
				<u-form-item label="手机" prop="phone" borderBottom required>
					<u-input placeholder="方便联系" clearable v-model="info.phone">
					</u-input>
				</u-form-item>
				<u-form-item label="预约" prop="date" required>
					<u-row justify="space-between">
						<u-col span="7">
							<uni-datetime-picker type="date" :clear-icon="false" v-model="info.date"
								:start="start|ymdFormat" @click="datetimepicker=true" />
						</u-col>
						<u-col span="1">
							<view style="text-align: center;">
								:
							</view>
						</u-col>
						<u-col span="4">
							<u-button plain :text="info.detailed" @click.native="picker=true"></u-button>
						</u-col>
					</u-row>
				</u-form-item>
			</u--form>
			<u-picker :show="picker" :columns="columns" @confirm="confirm" @cancel="picker=false"></u-picker>
			<u-button color="#FF7E00" text="提交" @click="submit" class="submit-btn"></u-button>
			<!-- <view class="btn-group">
				<u-button text="取消" @click="show = false"></u-button>
				<u-button color="#FF7E00" text="提交"></u-button>
			</view> -->
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "OrderSubscribe",
		options: {
			styleIsolation: 'shared'
		},
		props: {
			show: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				info: {
					detailed: "上午",
					phone: '',
					date: ""
				},
				picker: false,
				datetimepicker: false,
				single: '',
				start: new Date().getTime(),
				columns: [
					["上午", "下午", "不确定"]
				],
				rules: {
					"phone": [{
							required: true,
							message: '请填写手机号以便通知',
							trigger: ['blur', 'change']
						},{
							required: true,
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '请输入正确手机号码',
							trigger: ['change', 'blur'],
						}
					],
					"date": {
						required: true,
						message: '请选择预约时间',
						trigger: ['blur', 'change']
					}
				}
			};
		},
		onReady() {
			// #ifdef MP-WEIXIN
			this.$refs.subForm.setRules(this.rules);
			// #endif
		},
		methods: {
			confirm(e) {
				this.info.detailed = e.value[0]
				this.picker = false
			},
			submit() {
				this.$refs.subForm.validate().then(res => {
					// uni.$u.toast('校验通过')
					this.$emit("complete", this.info)
				}).catch(errors => {
					uni.$u.toast('请检查填写信息', false)
				})
			},
			close() {
				this.$emit("close")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 40rpx;
		box-sizing: border-box;

		.submit-btn {
			margin: 10rpx 0;
		}

		.btn-group {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			/deep/ .u-button {
				width: 35% !important;
			}
		}
	}
</style>
