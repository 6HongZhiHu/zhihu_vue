//一个包含N个直接用于更新数据的方法对象
  //不能包含异步代码和逻辑代码
  import {
    RECEIVE_ADDRESS,
    RECEIVE_SHOPS,
    RECEIVE_CATEGORYS,
    RECEIVE_USER,
    RECEIVE_TOKEN
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
    deleteUser(state){
      state.token = "";
      state.user = {};
      localStorage.removeItem("user_key");
      localStorage.removeItem("token_key");
    }
  }