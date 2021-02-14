import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible';
import Header from './components/header/Header.vue';
import CartControl from './components/CartControl/CartControl.vue';
import Star from './components/star/star.vue';
import ShopCart from './components/ShopCart/ShopCart.vue';
import './validate';
import {Button} from 'mint-ui';
import i18n from './i18n'
//import mintUi from 'mint-ui';
import "./mock/mock-server";
import lazyLoad from 'vue-lazyload';
import loading from '../src/assets/image/loading.gif';
import dayjs from 'dayjs';


Vue.component(Button.name, Button )
//Vue.use(mintUi)
Vue.use(lazyLoad, {
  //error: 'dist/error.png',
  loading
}) //增加一个全局指令v-lazy


//注册全局组件
Vue.component("Header",Header)
Vue.component("Star",Star)
Vue.component("CartControl",CartControl)
Vue.component("ShopCart",ShopCart)
//在vue全局添加dayjs方法
Vue.prototype.dayjs = dayjs;

Vue.config.productionTip = false

new Vue({
  //所有组件都能看到 $router和$route <router-link> 和 <router-view/>
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
