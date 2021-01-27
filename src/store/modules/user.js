/* 
用户模块相关数据管理
*/
import {
  RECEIVE_USER,
  RECEIVE_TOKEN,
} from '../types'

let user = JSON.parse(localStorage.getItem("user_key"));
let token = localStorage.getItem("token_key") || "";
let isLogin = user && token ? true : false;

export default  {
  state: { 
    isLogin,
    user:user || {}, //用户信息
    token, //用户登录标识
  },
  mutations: { 
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
  },
  actions: {
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
    
  },
  getters: { 
    
  }
}