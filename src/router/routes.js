//所有路由配置的数组

import Msite from '@/pages/Msite/Msite.vue';
import Search from '@/pages/Search/Search.vue';
import Order from '@/pages/Order/Order.vue';
import Profile from '@/pages/Profile/Profile.vue';
import Login from '@/pages/login/login.vue';
import Shop from '@/pages/shop/Shop.vue';
import Goods from '@/pages/shop/Goods.vue';
import Info from '@/pages/shop/Info.vue';
import Ratings from '@/pages/shop/Ratings.vue';


export default [
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
    path: '/shop',
    //name: 'Shop',
    component: Shop,
    children:[
      {
        path: '/shop/info',
        component: Info
      },
      {
        path: '/shop/ratings',
        component: Ratings
      },
      {
        path: '/shop/goods',
        component: Goods
      },
      {
        path:"",
        redirect:"/shop/goods"
      }
    ]
  },
  {
    path:"/",
    redirect:"/msite"
  }
]