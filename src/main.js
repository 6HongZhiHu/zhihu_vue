import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible';
import Header from './components/header/Header.vue';

//注册全局组件
Vue.component("Header",Header)

Vue.config.productionTip = false

new Vue({
  //所有组件都能看到 $router和$route <router-link> 和 <router-view/>
  router,
  store, 
  render: h => h(App)
}).$mount('#app')
