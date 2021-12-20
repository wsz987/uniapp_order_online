import { mapGetters, mapMutations, mapActions } from 'vuex'
const shopping_cart = {
  mounted() {
	  this.isEmpty && this.initShopping_Cart()
  },
  methods: {
	  ...mapActions('shoppingCart',['initShopping_Cart'])
  },
  computed:{
	  ...mapGetters('shoppingCart', ['getCart']),
	  isEmpty(){
	  	return this.getCart.length==0
	  }
  }
}

export default shopping_cart