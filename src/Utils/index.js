import vue from 'vue';
export function saveCartFoods(id,cartFoods){
  //根据cartFoods生成包含所有count数量的对象
  let cartCounts = cartFoods.reduce((r,food)=>{
    //向r中添加属性
    r[food.id] = food.count
    return r
  },{})

  sessionStorage.setItem(id + "_key",JSON.stringify(cartCounts))
}

//读取sessionstorage中的cartcount 生成一个cartFoods
export function getCartFoods(shop){
  let cartFoods = [];
  // 读取sessionStorage中的cartCounts
  let cartCount  = JSON.parse(sessionStorage.getItem(shop.id + "_key")) || {}
  // 遍历查出所有需要指定count的food
  shop.goods.forEach((good)=>{
    good.foods.forEach((food)=>{
      // 取出food在cartCounts中对应的count(有可能没有)
      let count = cartCount[food.id];
      if(count > 0){
        vue.set(food,"count",count);
        cartFoods.push(food)
      }
    })
  })
  return cartFoods;
}