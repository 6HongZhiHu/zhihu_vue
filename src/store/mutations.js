//一个包含N个直接用于更新数据的方法对象
  //不能包含异步代码和逻辑代码
  import {
    RECEIVE_ADDRESS,
    RECEIVE_SHOPS,
    RECEIVE_CATEGORYS
  } from './types';

  export default{
    [RECEIVE_ADDRESS](state,address){
      //console.log(address)
      state.address = address
    },
    [RECEIVE_CATEGORYS](state,categorys){
      state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,shops){
      state.shops = shops
    }
  }