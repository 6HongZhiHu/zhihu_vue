//所有路由配置的数组

// import Msite from '@/pages/Msite/Msite.vue';
// import Search from '@/pages/Search/Search.vue';
// import Order from '@/pages/Order/Order.vue';
// import Profile from '@/pages/Profile/Profile.vue';


//import 动态引入
// import(模块名称)
//结果被引入的模块会被单独打包 代码分割
/*
  配置的路由组件是函数 返回加载的动态路由模块
  函数开始不执行（开始不加载单独打包路由组件模块代码）
  当请求到当前需要显示的界面时，去路由组件打包文件


  作用：减小首屏需要加载的JS文件 ==》 显示更快
*/
const Msite = () => import('@/pages/Msite/Msite.vue');
const Search = () => import('@/pages/Search/Search.vue');
const Order = () => import('@/pages/Order/Order.vue');
const Profile = () => import('@/pages/Profile/Profile.vue');

import A from '@/pages/ABC/A.vue';
import B from '@/pages/ABC/B.vue';
import C from '@/pages/ABC/C.vue';
import B1 from '@/pages/ABC/B1.vue';
import B2 from '@/pages/ABC/B2.vue';

import Login from '@/pages/login/login.vue';
import Shop from '@/pages/shop/Shop.vue';
import Goods from '@/pages/shop/Goods.vue';
import Info from '@/pages/shop/Info.vue';
import Ratings from '@/pages/shop/Ratings.vue';

import Review from '@/pages/Review/Review.vue'
import SlotTest from '@/pages/Review/SlotTest/SlotTest.vue'
import MixinTest from '@/pages/Review/MixinTest/MixinTest.vue'
import ComponentTest from '@/pages/Review/ComponentTest/ComponentTest.vue'
import EventTest from '@/pages/Review/EventTest/EventTest.vue'
import ModelTest from '@/pages/Review/ModelTest/ModelTest.vue'
import ReactiveTest from '@/pages/Review/ReactiveTest/ReactiveTest.vue'
import LifeTest from '@/pages/Review/LifeTest/LifeTest.vue'


export default [
  {
    path: '/A',
    component: A,
    meta:{
      isShowFooter:true
    }
  },
  {
    path: '/B',
    component: B,
    meta:{
      isShowFooter:true
    },
    children: [
      {
        path: '/B/b1',
        component: B1
      },
      {
        path: '/B/b2',
        component: B2
      },
    ]
  },
  {
    path: '/C',
    component: C,
    meta:{
      isShowFooter:true
    }
  },
  {
    path: '/msite',
    name: 'Msite',
    component: Msite,
    meta:{
      isShowFooter:true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta:{
      isShowFooter:true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta:{
      isShowFooter:true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      isShowFooter:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/shop/:id',
    props: true, // 将所有params参数转换成标签属性传递给子路由组件
    //name: 'Shop',
    component: Shop,
    children:[
      {
        path: 'info',
        component: Info
      },
      {
        path: 'ratings',
        component: Ratings
      },
      {
        path: 'goods',
        component: Goods
      },
      {
        path:"",
        redirect:"goods"
      }
    ]
  },
  {
    path: '/review',
    component: Review,
    children: [
      {
        path: '/review/slot',
        component: SlotTest
      },
      {
        path: '/review/mixin',
        component: MixinTest
      },
      {
        path: '/review/component',
        component: ComponentTest
      },
      {
        path: '/review/event',
        component: EventTest
      },
      {
        path: '/review/model',
        component: ModelTest
      },
      {
        path: '/review/reactive',
        component: ReactiveTest
      },
      {
        path: '/review/life',
        component: LifeTest
      },
    ]
  },
  {
    path:"/",
    redirect:"/msite"
  }
]