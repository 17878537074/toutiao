import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import axios from "axios";

// 绑定到原型
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000"
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),


}).$mount('#app')
