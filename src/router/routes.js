//所有路由配置的数组

import Msite from '@/pages/Msite/Msite.vue';
import Search from '@/pages/Search/Search.vue';
import Order from '@/pages/Order/Order.vue';
import Profile from '@/pages/Profile/Profile.vue';


export default [
  {
    path: '/msite',
    name: 'Msite',
    component: Msite
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path:"/",
    redirect:"/msite"
  }
]