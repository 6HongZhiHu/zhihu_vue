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
    path:"/",
    redirect:"/msite"
  }
]