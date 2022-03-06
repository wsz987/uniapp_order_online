import App from './App'

import {router,RouterMount} from '@/router'
import store from './store'
import './plugins'

Vue.use(router)

Vue.prototype.$store = store

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})

// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif