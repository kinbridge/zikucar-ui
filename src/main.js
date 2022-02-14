import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui';
import Router from 'vue-router';
import http from './api/http.js'
import api from './api/api'
import 'element-ui/lib/theme-chalk/index.css';
import "font-awesome/css/font-awesome.css";
// 引入echarts
import * as echarts from 'echarts';

Vue.use(ElementUI);
Vue.use(Router);

Vue.config.productionTip = false
Vue.prototype.http = http
Vue.prototype.api = api
Vue.prototype.$echarts = echarts


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = '智库汽车'+to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
