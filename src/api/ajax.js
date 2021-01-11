/*
对axios进行二次封装
*/
import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
  //baseURL:"http://localhost:4000",
  baseURL:"/api", // 让代理服务器转发请求解决跨域问题
  timeout:2000,//配置超时时间
})

//请求拦截器
instance.interceptors.request.use((config)=>{
  console.log("触发请求拦截器")
  //假设后台不接受json数据
  let data = config.data;
  //instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

  if(data instanceof Object){
    config.data = qs.stringify(data)
  }
  return config
})

//响应拦截器
instance.interceptors.response.use(
  res =>{
    return res.data;
  },
  err =>{
    console.log("请求出错",err);
    //return Promise.reject(err)
    return new Promise(()=>{}) //返回一个pending状态的promise => 中断promise链
  }
)

export default instance