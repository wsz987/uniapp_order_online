const state = () => ({
	userid: '',
	avatar: '',
	username: '',
	position: '',
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
	getPosition: state => state.position
}

const mutations = {
	setUser(state, info) {
		for (let key of Object.keys(info)) {
			state[key] = info[key]
			let data = info[key]
			if(key == 'userid') key='open_id'
			uni.setStorageSync(`${key}`, data)
		}
	},
}

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions
}
