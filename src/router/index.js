import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../store/index';

Vue.use(VueRouter)

// const routes = [
  
// ]

const router = new VueRouter({
  mode:"history",//路由里没有#
  routes
})



//检查进入的路由是否需要条件
const paths = ['/A','/B']

//定义全局前置守卫
router.beforeEach((to,from,next)=>{
  console.log("触发前置守卫")
  // console.log(to);
  // console.log(store.state.user.token);
  let path = to.path;
  let myId = sessionStorage.getItem("myId")
  if(paths.indexOf(path)!==-1){
    //如果没有达成条件 强制跳转C组件
    if(!store.state.user.token || !myId){
      //没有登录  没有达成条件
      return next("./C")
    }
  }
  //进入组件
  next();
})
export default router
