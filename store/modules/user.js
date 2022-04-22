import api from '@/api'
const state = () => ({
	userid: '',
	avatar: '',
	username: '',
	position: '',
	iv: '',
	openid: '',
	sessionKey: '',
	token: '',
	tokenExpired: '',
	encryptedData:"",
	permission:"",
	role:[],
	uid:''
})
const getters = {
	getUserName: state => {
		if (state.username) return state.username
		else {
			let name = uni.getStorageSync('username')
			state.username = name
			return name
		}
	},
	getAvatar: state => {
		if (state.avatar) return state.avatar
		else {
			let avatar = uni.getStorageSync('avatar')
			state.avatar = avatar
			return avatar
		}
	},
	getPosition: state => state.position,
	sessionKey: state => state.sessionKey,
	get:state=> key => {
		let value = state[key]
		if (value) return value
		else {
			value = uni.getStorageSync(key)
			if(value) state[key] = value
			else value = undefined
			return value
		}
	},
	checkRole:state=> role => {
		const result = state.role.indexOf(role)>-1 ? true : false
		return result
	}
}

const mutations = {
	setUser(state, info) {
		for (let key of Object.keys(info)) {
			state[key] = info[key]
			let data = info[key]
			// if (key == 'userid') key = 'open_id'
			uni.setStorageSync(`${key}`, data)
			if (key == 'token') uni.setStorageSync(`uni_id_token`, data)
		}
	},
	getState(state, keys){
		if(typeof(keys)=='string') keys = [keys]
		let result = {}
		for(let key of keys){
			if(!key) continue
			let data = state[key]
			console.log(state)
			if(!data) continue
			result[key] = data
		}
		console.log('getState',result)
		return result
	}
}

const actions = {
	async getCurrentUserInfo({ commit}){
		const info = await uniCloud.getCurrentUserInfo()
		commit('setUser',info)
	},
	async tokenExpiredCheck({state}){
		let tokenExpired = uni.getStorageSync('tokenExpired')
		if(!tokenExpired) return false
		tokenExpired = tokenExpired - ''
		if(tokenExpired<new Date().getTime()) {
			await uni.clearStorageSync();
			return false
		}
		return true
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}
