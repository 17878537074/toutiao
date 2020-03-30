import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import axios from "axios";


// 绑定到原型
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000"
Vue.use(Vant);
// 添加路由的守卫
router.beforeEach((to, from, next) => {
  // to表示即将进入的页面
  // from表示即将要离开的页面
  // next必须要调用   next类似于node.js的中间件
  if (to.path === "/personal") {
    const userjson = JSON.parse(localStorage.getItem("userInfo")) || {}
    if (userjson.token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();

  }
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),


}).$mount('#app')
