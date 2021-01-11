import myAxios from './ajax';


// |参数          |是否必选  |类型     |说明|
// |latitude      |Y        |string   |纬度|
// |longitude     |Y       |string    |经度|
//1.根据经纬度获取位置详情
export const reqAddress = (longitude,latitude)=> {
  return myAxios(`/position/${latitude},${longitude}`)
}

//2.获取食品分类列表
export const reqCategprys = () => {
  return myAxios("/index_category")
}

//3.根据经纬度获取商铺列表
export const reqShops = ({longitude,latitude})=>{
  return myAxios("/shops",{params:{longitude,latitude}})
}

