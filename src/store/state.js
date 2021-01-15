let user = JSON.parse(localStorage.getItem("user_key"));
let token = localStorage.getItem("token_key") || "";
let isLogin = user && token ? true : false;
////相当于data的对象包含N个可变的数据
export default{
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组，
  isLogin,
  user:user || {}, //用户信息
  token, //用户登录标识
}