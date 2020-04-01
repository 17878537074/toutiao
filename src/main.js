import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant, { Toast } from 'vant'
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
  // if (to.path === "/personal") {
  // 通过authorization属性验证是否需要拦截
  if (to.meta.authorization) {
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
// 错误响应拦截器
axios.interceptors.response.use(res => {
  return res;
}, error => {
  // 如果请求返回的结果是错误的，会进入到错误的处理函数中
  // error是js原生的错误对象，我们可以用过error.response可以获取到详细的信息
  console.log(error.response);
  
  const { statusCode, message } = error.response.data;
  if (statusCode === 400) {
    Toast.fail(message);
  }
  return Promise.reject(error)
});
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),


}).$mount('#app')
