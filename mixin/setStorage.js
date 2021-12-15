import { mapMutations } from 'vuex'
const setStorage = {
	methods:{
		...mapMutations('shoppingCart',['setStorage'])
	},
	computed: {
		...mapGetters('shoppingCart',['getCart'])
	},
	watch:{
		getCart(){
			this.setStorage()
		}
	}
}

export default setStorage