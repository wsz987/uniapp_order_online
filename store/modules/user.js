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
	encryptedData:""
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
}

const mutations = {
	setUser(state, info) {
		for (let key of Object.keys(info)) {
			state[key] = info[key]
			let data = info[key]
			// if (key == 'userid') key = 'open_id'
			uni.setStorageSync(`${key}`, data)
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

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions
}
