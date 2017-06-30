// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import global_ from './constconfig.js'
import Toasted from 'vue-toasted';
Vue.use(Toasted)

Vue.prototype.GLOBAL = global_
Vue.use(ElementUI)


import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

Vue.config.productionTip = false;

require('vue-swipe/dist/vue-swipe.css');
require('./assets/css/sucaijiayuan.css')
require('./assets/js/sucaijiayuan.js')
// in ES6 modules
import { Swipe, SwipeItem } from 'vue-swipe';

Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);

axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
  return response;
}, function (error) {
  return Promise.reject(error);
});

console.log(axios.defaults.headers.post['Content-Type']);
axios.defaults.headers.common['Authorization'] = sessionStorage.token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios;  //其他页面在使用axios的时候直接  this.$http就可以了


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
