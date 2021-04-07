import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
import "./assets/css/global.css"
import "element-ui/lib/theme-chalk/index.css"
import "./axios"
// axios.defaults.withCredentials = true
import qs from 'qs'
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.prototype.$axios = axios
//携带请求头，两次请求获取相同sessionId
axios.defaults.withCredentials = true
Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
