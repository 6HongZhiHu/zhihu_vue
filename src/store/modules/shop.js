/* 
商家模块相关数据管理
*/
import vue from 'vue';
import {
  reqGoods,
  reqInfo,
  reqRatings
} from '../../api/index';
import {
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_JIA,
  RECEIVE_JIAN
} from '../types';
export default  {
  state: { 
    info:{},
    ratings:{},
    goods:{},
    cartFoods:[] //购物车中所有food数组
  },
  mutations: { 
    [RECEIVE_GOODS](state,goods){
      state.goods = goods;
    },
    [RECEIVE_RATINGS](state,ratings){
      state.ratings = ratings;
    },
    [RECEIVE_INFO](state,info){
      state.info = info;
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
    }
  },
  actions: {
    //获取当前商家详细信息的异步action
    async getGoods({commit}){
      //发送异步请求
      //const {latitude,longitude} = state;
      const result = await reqGoods()
      //请求成功后提交给mutation
      //console.log(result)
      if(result.code === 0){
        const shops = result.data;
        commit(RECEIVE_GOODS,shops)
      }
    },
    async getInfo({commit}){
      //发送异步请求
      //const {latitude,longitude} = state;
      const result = await reqInfo()
      //请求成功后提交给mutation
      if(result.code === 0){
        const info = result.data;
        commit(RECEIVE_INFO,info)
      }
    },
    async getRatings({commit}){
      //发送异步请求
      //const {latitude,longitude} = state;
      const result = await reqRatings()
      //console.log(result)
      //请求成功后提交给mutation
      if(result.code === 0){
        const r = result.data;
        commit(RECEIVE_RATINGS,r)
      }
    },
    //更新购物车的count
    updateFoodCount({commit},{isAdd,food}){  
      if(isAdd){
        commit(RECEIVE_JIA,{food})
      }else{
        commit(RECEIVE_JIAN,{food})
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
    }
  }
}