<template>
	<view>
		<view class="edit" @click="handlePopup(goods)" v-if="goods._id">
			<u-icon name="edit-pen" color="#fff"></u-icon>
		</view>
		<u-button text="添加" color="#FF7E00" @click="handlePopup(goods)" v-else></u-button>
		<button type="default"></button>
		<u-popup :show="show" mode="bottom" :round="15" closeable @close="show=false" :closeOnClickOverlay="false">
			<view class="title">
				<text>{{goods._id? "编辑":"添加"}}</text>
			</view>
			<view class="content">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="left" :model="goods" ref="form1">
					<u-form-item label="名称" prop="goods_name" borderBottom required>
						<u-input v-model="goods.goods_name" border="none" clearable></u-input>
					</u-form-item>
					<u-form-item label="分类" prop="goods_type_id" borderBottom @click="showType = true" required>
						<u--input :value="getTypeName(goods.goods_type_id)" disabled disabledColor="#fff"
							placeholder="请选择分类" border="none">
						</u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="价格" prop="goods_price" borderBottom required>
						<u-input suffixIcon="rmb" v-model="goods.goods_price" type="number" clearable></u-input>
					</u-form-item>
					<u-form-item label="图片" borderBottom ref="imgs" required prop="goods_imgs">
						<!-- <u--image :src="src" width="80px" height="80px" v-for="(item,index) in goods.goods_imgs"></u--image> -->
						<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" multiple
							:maxCount="getUpload.Image.maxCount || 1" previewFullImage></u-upload>
					</u-form-item>
				</u--form>
				<u-action-sheet :show="showType" :actions="actions" title="请选择分类" @close="showType = false"
					previewFullImage @select="handleSelect">
				</u-action-sheet>
				<u-line-progress :percentage="percentage" activeColor="#FF7E00" v-if="percentage"></u-line-progress>
				<u-button :text="goods._id ? '修改':'添加'" color="#FF7E00" @click="uploadForm"></u-button>
				<view class="del-btn">
					<u-button text="删除" type="error" @click="delGoods(goods._id)" v-if="goods._id" plain></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapGetters,mapActions
	} from 'vuex'
	import uuid from "@/utils/uuid"
	import api from "@/api"
	import { isLogin } from '@/utils/validate'
	export default {
		name: "GoodsManage",
		options: {
			styleIsolation: 'shared'
		},
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				show: false,
				showType: false,
				percentage: 0,
				goods: {
					_id:"",
					goods_name: '',
					// type: '',
					goods_type_id: 0,
					goods_price: 0,
					goods_imgs: []
				},
				fileList: [],
				delFileList:[],
				rules:{
					"goods_name": {
						required: true,
						message: '请填写商品名称',
						trigger: ['blur', 'change']
					},
					"goods_price": {
						required: true,
						type: 'number',
						message: '请填写商品价格',
						trigger: ['blur', 'change']
					},
					// "goods_imgs": {
					// 	required: true,
					// 	type: 'array',
					// 	message: '请添加商品图片',
					// 	trigger: ['blur', 'change']
					// },
					"goods_type_id": {
						required: true,
						message: '请选择商品分类',
						type: 'number',
						trigger: ['blur', 'change']
					}
				}
			};
		},
		created() {
			if(this.info){
				this.goods = JSON.parse(JSON.stringify(this.info))
			}
		},
		mounted() {
			// #ifdef MP-WEIXIN
			this.$refs.form1.setRules(this.rules);
			// #endif
		},
		methods: {
			...mapActions('user',['tokenExpiredCheck']),
			delGoods(id){
				isLogin(()=>{
					uni.showModal({
						title: '是否删除商品',
						success:async res=> {
							if (res.confirm) {
								console.log('用户点击确定');
								const res = await api.delGoods(id)
								res && uni.$emit("reloadMenuData")
								this.show=false
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
				})
			},
			handleSelect(e) {
				this.goods.goods_type_id = e.goods_type_id
			},
			async handlePopup(data) {
				isLogin(()=>this.show = true)
			},
			deletePic(event) {
				let { url } = event.file
				if(url){
					if(url.includes("localhost")){}
					else if(url.includes("https://vkceyugu.cdn.bspapp.com/")){
						this.delFileList.push(url)
					}
					this.fileList.splice(event.index, 1)
				}
			},
			async afterRead({
				file
			}) {
				file.map(item => this.fileList.push(item))
			},
			uploadFilePromise(img, index = 0) {
				return new Promise((resolve, reject) => {
					let imgs_length = this.fileList.length
					let { url } = img
					let arr = url.split('.')
					let result = uniCloud.uploadFile({
						filePath: url,
						cloudPath: uuid() +"."+ arr[arr.length - 1],
						onUploadProgress: progressEvent => {
							const item = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							)
							this.percentage = Math.round(
								(100 / imgs_length) * index
							) + item
						}
					})
					resolve(result)
				})
			},
			async uploadForm() {
				isLogin(()=>{
					this.$refs.form1.validate().then(async vali => {
						if (this.fileList.length == 0) return uni.showToast({
							icon: "none",
							title: "请添加图片"
						})
						this.percentage = 0
						const goods_imgs = await Promise.all(
							this.fileList.map(async (item, index) => {
								if(item.url.includes("https://vkceyugu.cdn.bspapp.com/")) return item.url
								uni.showLoading({
									title: "图片上传中"
								})
								const result = await this.uploadFilePromise(item, index)
								if (result.success) {
									item = result.fileID
									// this.goods.fileList.push(result.fileID)
									api.addFilesTemp({
										url: result.fileID
									})
								}
								return item
							})
						)
						uni.hideLoading()
						uni.showLoading({
							title: "服务器响应"
						})
						console.log(goods_imgs)
						const res = await api.setGoods({
							content:{
								...this.goods,
								goods_imgs
							},
							delFileList:this.delFileList
						})
						res && uni.$emit("reloadMenuData")
						this.$refs.form1.resetFields()
						this.$refs.form1.clearValidate()
						this.show=false
					}).catch(errors => {
					})
				})
			}
		},
		watch: {
			info(val) {
				this.goods = val
			},
			goods(val) {
				if (val.goods_imgs) {
					this.fileList = val.goods_imgs.map(item => {
						if (typeof(item) == 'string') return {
							url: item
						}
						return item
					})
				}
			}
		},
		computed: {
			...mapGetters('config', [
				'getGoodsTypes', 'getUpload'
			]),
			getTypeName() {
				return key => {
					const find = this.actions.find(item => item.goods_type_id == key)
					if (!find) return ''
					return find.goods_type_name
				}
			},
			actions() {
				return this.getGoodsTypes.map(item => {
					item['name'] = item.goods_type_name
					return item
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		text-align: center;
		font-weight: bolder;
		margin-top: 35rpx;
		font-size: 40rpx;
	}

	.content {
		padding: 10rpx 40rpx 50rpx;
		box-sizing: border-box;
	}

	/deep/ .u-line-progress {
		margin-bottom: 30rpx;
	}
	
	/deep/.del-btn{
		 margin-top: 30rpx !important;
	}

	.edit {
		height: 40rpx;
		width: 40rpx;
		display: flex;
		justify-content: center;
		background-color: #FF7E00;
		border-radius: 10rpx;
	}
</style>
