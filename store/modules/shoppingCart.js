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
		const isFind = list.find(item=>item._id==data._id)
		!isFind && list.push({...data,count:1})
		isFind && isFind.count++ 
	},
	reduceCountByID({list}, id) {
		const isFind = list.find(item=>item._id==id)
		if(!isFind) return 
		isFind && isFind.count>0 && isFind.count--
	},
	totalPrice({list}) {
		return list.reduce((total,{goods_price,count})=>total+goods_price*count,0)
	},
	setList(state, data) {
		state.list=JSON.parse(data)
	},
	setStorage({list}){
		uni.setStorage({ key: 'shopping_cart', data: JSON.stringify(list) })
	},
}
const actions = {
	async initShopping_Cart({ commit }) {
		 const value = uni.getStorageSync('shopping_cart');
		 value && commit('setList',value)
	},
}
export default {
	state,
	getters,
	mutations,
	actions
}