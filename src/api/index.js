import myAxios from './ajax';


// |参数          |是否必选  |类型     |说明|
// |latitude      |Y        |string   |纬度|
// |longitude     |Y       |string    |经度|
//1.根据经纬度获取位置详情
export const reqAddress = (longitude,latitude)=> {
  return myAxios(`/position/${latitude},${longitude}`,{
    headers:{
      nedCheck:true
    }
  })
}

//2.获取食品分类列表
export const reqCategprys = () => {
  return myAxios("/index_category")
}

//3.根据经纬度获取商铺列表
export const reqShops = ({longitude,latitude})=>{
  return myAxios("/shops",{params:{longitude,latitude}},{
    headers:{
      nedCheck:true
    }
  })
}

//4.发送短信验证码
export const reqMsg = (phone)=>{
  return myAxios("/sendcode",{params:{phone}})
}

//5.用户密码登录请求
export const reqPwdLogin = ({name,pwd,captcha})=>{
  return myAxios.post("/login_pwd",{name,pwd,captcha})
}

//6.短信登录请求
export const reqSmsLogin = ({phone,code})=>{
  return myAxios.post("/login_sms",{phone,code})
}

//7.商铺信息
export const reqGoods = ()=>{
  return myAxios.get("/goods")
}

//8.商铺信息
export const reqInfo = ()=>{
  return myAxios.get("/info")
}

//9.商铺信息
export const reqRatings = ()=>{
  return myAxios.get("/ratings")
}

// myAxios.get("/info").then(res => {
//   console.log("res",res);
// })

//10.获取指定的商铺信息
export const reqShop = (id)=>{
  return myAxios.get("/shop/"+id)
}
