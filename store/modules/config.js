import getConfig from '@/api/getConfig'
const state = () => ({
	goods_params: [],
	goods_types: [],
	Upload:{}
})
const getters = {
	getGoods: state => ({
		"goods_params": state.goods_params,
		'goods_types': state.goods_types
	}),
	getGoodsParams: state =>  state.goods_params,
	getGoodsTypes: state =>  state.goods_types,
	getUpload:state =>  state.Upload
}

const mutations = {
	setConfig(state, config) {
		for (let key of Object.keys(config)) {
			state[key] = config[key]
		}
	},
}
const actions = {
	async getConfig({
		commit
	}) {
		uni.showLoading({
			title: '加载中 ~'
		})
		const res = await getConfig()
		commit('setConfig', res)
	},
}
export default {
	state,
	getters,
	mutations,
	actions
}
