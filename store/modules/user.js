const state = () => ({
	userid:'',
	avatar:'',
	username:'',
	position:'',
})
const getters = {
	getUserName:state=>state.username,
	getAvatar:state=>state.avatar,
	getPosition:state=>state.position
}

const mutations = {
	setUser(state, info) {
		for (let key of Object.keys(info)) {
			state[key] = info[key]
		}
	},
}

const actions = {
}

export default {
	state,
	getters,
	mutations,
	actions
}
