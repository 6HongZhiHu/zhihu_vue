//一个包含N个直接用于更新数据的方法对象
  //不能包含异步代码和逻辑代码
  import vue from 'vue';
  import {
    RECEIVE_ADDRESS,
    RECEIVE_SHOPS,
    RECEIVE_CATEGORYS,
    RECEIVE_USER,
    RECEIVE_TOKEN,
    RECEIVE_GOODS,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    RECEIVE_JIA,
    RECEIVE_JIAN
  } from './types';

  export default{
    [RECEIVE_ADDRESS](state,address){
      //console.log(address)
      state.address = address;
    },
    [RECEIVE_CATEGORYS](state,categorys){
      state.categorys = categorys;
    },
    [RECEIVE_SHOPS](state,shops){
      state.shops = shops
    },
    [RECEIVE_USER](state,data){
      state.user = data;
    },
    [RECEIVE_TOKEN](state,token){
      state.token = token;
    },
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
      }
          
    },
    [RECEIVE_JIAN](state,{food}){
      if(food.count>0) food.count-- 
    },
    deleteUser(state){
      state.token = "";
      state.user = {};
      localStorage.removeItem("user_key");
      localStorage.removeItem("token_key");
    }
  }