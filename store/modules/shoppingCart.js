import { isLogin } from '@/utils/validate'
const state = () => ({
	list:[],
})
const getters = {
	getCart : ({list}) => list.filter(({count})=>count!==0),
	getGoodsCartCount : ({list}) => id => {
		const isFind = list.find(item=>item._id==id)
		if(!isFind) return 0
		return isFind.count
	},
	getTotalPrice: ({list}) => list.reduce((total,{goods_price,count})=>total+goods_price*count,0)
}

const mutations = {
	addCart({list}, data){
		if(!isLogin()) return
		const isFind = list.find(item=>item._id==data._id)
		!isFind && list.push({...data,count:1})
		isFind && isFind.count++ 
	},
	reduceCountByID({list}, id) {
		if(!isLogin()) return
		const isFind = list.find(item=>item._id==id)
		if(!isFind) return 
		isFind && isFind.count>0 && isFind.count--
	},
	totalPrice({list}) {
		return list.reduce((total,{goods_price,count})=>total+goods_price*count,0)
	},
	setList(state, data) {
		data = JSON.parse(data)
		if(!data) return
		if(data.length==0) return
		if(state.list.length===0) state.list=data
		else {
			state.list = state.list.map(item=>{
				const result = data.find(el=>el._id=item._id)
				if(!result) return item
				try{
					item['count'] = result['count']
				}catch(err){
					console.log('setList',err)
				}
				return item
			})
			console.log('list',state.list)
		}
	},
	setStorage({list}){
		// console.log(list)
		uni.setStorage({ key: 'shopping_cart', data: JSON.stringify(list) })
	},
	
}
const actions = {
	async initShopping_Cart({ commit }) {
		 if(!isLogin()) return
		 const value = uni.getStorageSync('shopping_cart');
		 value && commit('setList',value)
	},
	async updateCart({ state,commit },data){
		if(!data) return
		state.list.map(item=>{
			const result = data.find(el=>el._id==item._id)
			if(!result) return item
			try{
				// 非严谨 预留 订单提交成功后的购物车删除
				if(result['count']) item['count'] =item['count'] - result['count']
				if(result['goods_price']) item['goods_price'] = result['goods_price']
			}catch(err){
				console.log('updateCart',err)
			}
			return item
		}) && commit('setStorage',state)
	}
}
export default {
	state,
	getters,
	mutations,
	actions
}