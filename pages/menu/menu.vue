<template>
	<view>
		<qiyue-category :categoryList="getMenuTypes" @categoryMainClick="categoryMainClick" v-slot="{ goodsData }">
			<GoodsManage v-if="checkRole('ADMIN')"/>
			<view v-for="(item,index) in goodsData" :key='item._id'>
				<GoodsItem :info='item'>
					<template #edit="{info}">
						<GoodsManage :info="info" v-if="checkRole('ADMIN')" :key="keyDom(info._id)"/>
					</template>
				</GoodsItem>
			</view>
		</qiyue-category>
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	import handle_shoppingCart from '@/mixin/handle_shoppingCart'
	import getMenuList from '@/api/getMenuList'
	export default {
		mixins:[handle_shoppingCart],
		data() {
			return {
				categoryList: [],
				goods: []
			};
		},
		created() {
			this.handleMenuData()
		},
		mounted() {
			uni.$on("reloadMenuData",()=>this.handleMenuData())
		},
		methods: {
			...mapActions('shoppingCart',['updateCart']),
			categoryMainClick(category) {
				console.log('categoryMainClick', category)
			},
			async handleMenuData() {
				const res = await getMenuList()
				this.goods = res
				this.updateCart(res)
			},
		},
		watch:{
			goods(val,oval){
				// console.log('menu',val,oval)
			}
		},
		computed: {
			...mapGetters('config', [
				'getGoods'
			]),
			...mapGetters('user', [
				'checkRole'
			]),
			getMenuTypes() {
				const data = Array.from(this.getGoods.goods_types).map(item => {
					item.key = item.goods_type_id
					item.name = item.goods_type_name
					item.subCategoryList = []
					const result = this.goods.filter(goods => goods.goods_type_id == item.goods_type_id)
					item.subCategoryList.push(...result)
					return item
				})
				return data
			},
			keyDom(){
				return key=>{
					this.$nextTick(()=>{
						return key
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
