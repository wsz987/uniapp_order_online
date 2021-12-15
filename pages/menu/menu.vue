<template>
	<view>
		<qiyue-category :categoryList="getMenuTypes" @categoryMainClick="categoryMainClick" v-slot="{data}">
			<GoodsItem :info='item' v-for="(item,index) in data" :key='item._id' />
		</qiyue-category>
	</view>
</template>

<script>
	import {
		mapGetters,mapActions
	} from 'vuex'
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
			// this.isEmpty && this.initShopping_Cart()
		},
		methods: {
			categoryMainClick(category) {
				console.log('categoryMainClick', category)
			},
			async handleMenuData() {
				const res = await getMenuList()
				this.goods = res
			},
			// ...mapActions('shoppingCart',['initShopping_Cart']),
		},
		computed: {
			...mapGetters('config', [
				'getGoods'
			]),
			// ...mapGetters('shoppingCart', ['getCart']),
			getMenuTypes() {
				return Array.from(this.getGoods.goods_types).map(item => {
					item.key = item.goods_type_id
					item.name = item.goods_type_name
					item.subCategoryList = []
					const result = this.goods.filter(goods => goods.goods_type_id == item.goods_type_id)
					item.subCategoryList.push(...result)
					return item
				})
			},
			// isEmpty(){
			// 	return this.getCart.length==0
			// }
		}
	}
</script>

<style lang="scss">

</style>
