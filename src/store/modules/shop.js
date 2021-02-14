/* 
商家模块相关数据管理
*/
import vue from 'vue';
import {
  reqGoods,
  reqInfo,
  reqRatings,
  reqShop
} from '../../api/index';
import {
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_JIA,
  RECEIVE_JIAN,
  RECEIVE_SHOPS,
  RECEIVE_SHOP
} from '../types';
import {getCartFoods} from '../../Utils/index';
export default  {
  state: { 
    info:{},
    ratings:[],
    // goods:{},
    shop: {}, // 当前商家
    cartFoods:[] //购物车中所有food数组
  },
  mutations: { 
    // [RECEIVE_GOODS](state,goods){
    //   state.goods = goods;
    // },
    // [RECEIVE_RATINGS](state,ratings){
    //   state.ratings = ratings;
    // },
    // [RECEIVE_INFO](state,info){
    //   state.info = info;
    // },
    //把解构出来的对象属性设置默认值为空对象
    [RECEIVE_SHOP](state,{shop={},cartFoods=[]}){
      state.cartFoods = cartFoods;
      state.shop = shop;
      state.ratings = shop.ratings;
      state.info = shop.info;
    },
    [RECEIVE_JIA](state,{food}){
      if(food.count){
        food.count++
      }else{
        //问题：给响应式对象添加一个新的属性，没有数据绑定效果
        //food.count = 1 
        //解决给响应式对象添加一个响应式属性 vue.set
        //food.count = 1
        vue.set(food,"count",1)
        state.cartFoods.push(food)     
      }
          
    },
    [RECEIVE_JIAN](state,{food}){
      if(food.count>0){
        food.count--
        //如果数量变为0 将food从购物车删除
        if(food.count === 0){
          state.cartFoods.splice(state.cartFoods.indexOf(food),1)
        }
      }

    },
    clearCart(state){
      //先要将cartFood中food的count变为0
      state.cartFoods.forEach(food=>food.count = 0)
      state.cartFoods = [];
    },
    
  },
  actions: {
    // //获取当前商家详细信息的异步action
    // async getGoods({commit}){
    //   //发送异步请求
    //   //const {latitude,longitude} = state;
    //   const result = await reqGoods()
    //   //请求成功后提交给mutation
    //   //console.log(result)
    //   if(result.code === 0){
    //     const shops = result.data;
    //     commit(RECEIVE_GOODS,shops)
    //   }
    // },
    // async getInfo({commit}){
    //   //发送异步请求
    //   //const {latitude,longitude} = state;
    //   const result = await reqInfo()
    //   //请求成功后提交给mutation
    //   if(result.code === 0){
    //     const info = result.data;
    //     commit(RECEIVE_INFO,info)
    //   }
    // },
    // async getRatings({commit}){
    //   //发送异步请求
    //   //const {latitude,longitude} = state;
    //   const result = await reqRatings()
    //   //console.log(result)
    //   //请求成功后提交给mutation
    //   if(result.code === 0){
    //     const r = result.data;
    //     commit(RECEIVE_RATINGS,r)
    //   }
    // },
    //更新购物车的count
    updateFoodCount({commit},{isAdd,food}){  
      if(isAdd){
        commit(RECEIVE_JIA,{food})
      }else{
        commit(RECEIVE_JIAN,{food})
      }
    },
    async getShop({commit,state},id){
      //发送异步请求
      //const {latitude,longitude} = state;
      //如果当前id与请求的id相同就不需要重复发请求
      console.log(id,state.shop.id);
      if(id == state.shop.id){
        return
      }
      //如果显示的是另一个商家，清除原本的数据 让上个商家的购物车也清空
      if(state.shop.id){
        commit(RECEIVE_SHOP,{})
      }
      const result = await reqShop(id);
      //console.log(result)
      //请求成功后提交给mutation
      if(result.code === 0){
        //console.log(result)
        const r = result.data;
        const cartFoods = getCartFoods(r);
        commit(RECEIVE_SHOP,{shop:r,cartFoods})
      }
    },
    
  },
  getters: { 
    //总数量
    totalCount(state){
      return state.cartFoods.reduce((p,food)=>p + food.count ,0)
    },
    //总价格
    totalPrice(state){
      return state.cartFoods.reduce((p,food)=>p + food.count*food.price ,0)
    },
    //满意的评论数量
    manyi(state){
      return state.ratings.reduce((p,r)=>p + (r.rateType===0?1:0) ,0)
    },
  }
}