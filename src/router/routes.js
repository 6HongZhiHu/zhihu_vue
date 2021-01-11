//所有路由配置的数组

import Msite from '@/pages/Msite/Msite.vue';
import Search from '@/pages/Search/Search.vue';
import Order from '@/pages/Order/Order.vue';
import Profile from '@/pages/Profile/Profile.vue';
import Login from '@/pages/login/login.vue';


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
    path:"/",
    redirect:"/msite"
  }
]