
import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
} from '../types';
import {
  reqAddress,
  reqCategprys,
  reqShops,
} from '../../api/index';
////相当于data的对象包含N个可变的数据
export default{
  state:{
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], //商家数组，
  },
  mutations:{
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
  },
  actions:{
    //获取当前地址对象的异步action
    async getAddress({commit,state}){
      //发送异步请求
      const {latitude,longitude} = state;
      const result = await reqAddress(longitude,latitude)
      //console.log(result)
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
  }
}