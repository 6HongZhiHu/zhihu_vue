import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible';

Vue.config.productionTip = false

new Vue({
  router,
  store, // 所有组件都能看到 $router和$route  <router-link> 和 <router-view/>
  render: h => h(App)
}).$mount('#app')
