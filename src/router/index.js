import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter)

// const routes = [
  
// ]

const router = new VueRouter({
  mode:"history",//路由里没有#
  routes
})

export default router
