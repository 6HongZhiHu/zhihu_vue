/*
对axios进行二次封装
*/
import axios from 'axios';
import qs from 'qs';
import { Indicator } from 'mint-ui';
import {BASEURL} from '../assets/config';
import { Toast,MessageBox  } from 'mint-ui';
import vuex from '../store/index';
import router from '../router/index';


const instance = axios.create({
  //baseURL:"http://localhost:4000",
  baseURL: BASEURL || "/api", // 让代理服务器转发请求解决跨域问题
  timeout:5000,//配置超时时间
})

//请求拦截器
instance.interceptors.request.use((config)=>{
  console.log("触发请求拦截器")
  //console.log(vuex)
  //显示请求loading
  Indicator.open();
  //假设后台不接受json数据
  let data = config.data;
  //instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

  if(data instanceof Object){
    config.data = qs.stringify(data)
  }
  const token = vuex.state.user.token;
  const nedCheck = config.headers.nedCheck;

  if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.token = token  //请求头加上token
  }else{
    //如果没有token，需要token验证，抛出异常
    if(nedCheck){
      throw new Error("无法验证token信息,请重新登录")
    }
  }
  //console.log(config)
  return config
})

//响应拦截器
instance.interceptors.response.use(
  res =>{
    //隐藏请求loading
    Indicator.close();
    console.log("触发响应拦截器...")
    //这里是返回token信息的错误
    //403是token统一返回的错误
    
    if(res.data.status===403){
      console.log("403")
      Toast({
        message:res.data.msg
      });
      //删除用户操作 
      vuex.commit("deleteUser");
      //跳转到登录
      if(router.currentRoute.path !== "/login"){
        router.replace("/login");
      }
      
      return new Promise(()=>{})
    }else{
      return res.data;
    }
    
  },
  err =>{
    const res = err.response;
    //隐藏请求loading
    Indicator.close();
    //没发请求的错误
    if(!res){
      //console.log(err)
      //console.log("err--------------")
      //console.log(router)
      if(router.currentRoute.path !== "/login"){
        router.replace(path);
         //这里是我在上面处理抛出的错误
        Toast(err.message);
      }
      //router.replace("/login")
     
    }else{
      //发了请求的错误
      //这个是请求失败的错误
      Toast({
        message:"请求失败"
      });
      //return Promise.reject(err)
      return new Promise(()=>{}) //返回一个pending状态的promise => 中断promise链
    }
  }
)

export default instance