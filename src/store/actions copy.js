//一个包含N个间接用于更新数据的方法对象
  //可以包含异步代码和逻辑代码
import {
    reqAddress,
    reqCategprys,
    reqShops,
    reqGoods,
    reqInfo,
    reqRatings
  } from '../api/index';

  import {
    RECEIVE_ADDRESS,
    RECEIVE_SHOPS,
    RECEIVE_CATEGORYS,
    RECEIVE_TOKEN,
    RECEIVE_USER,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    RECEIVE_GOODS,
    RECEIVE_JIA,
    RECEIVE_JIAN
  } from './types';


  export default{
    //获取当前地址对象的异步action
    async getAddress({commit,state}){
      //发送异步请求
      const {latitude,longitude} = state;
      const result = await reqAddress(longitude,latitude)
      console.log(result)
      //请求成功后提交给mutation
      if(result && result.code === 0){
        const address = result.data;
        commit(RECEIVE_ADDRESS,address)
      }
    },
    //获取当前商品分类的异步action
    async getCategorys({commit},cb){
      //发送异步请求
      const result = await reqCategprys()
      //请求成功后提交给mutation
      if(result.code === 0){
        const categorys = result.data;
        commit(RECEIVE_CATEGORYS,categorys) //内部同步调用mutation更新状态数据
        //z在数据更新之后，调用回调函数
        typeof cb === "function" && cb()
      }
    },
    //获取当前商家列表的异步action
    async getShops({commit,state}){
      //发送异步请求
      const {latitude,longitude} = state;
      const result = await reqShops({longitude,latitude})
      //请求成功后提交给mutation
      if(result.code === 0){
        const shops = result.data;
        commit(RECEIVE_SHOPS,shops)
      }
    },
    saveUser({commit},user){
      const token = user.token;
      const data = user.data;
      //将token保存在local
      localStorage.setItem("token_key",token);
      
      localStorage.setItem("user_key",JSON.stringify(data));
      //将token保存state
      commit(RECEIVE_TOKEN,token)
      //将user保存state
      commit(RECEIVE_USER,data)
    },
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
    getUser(){

    }
  }