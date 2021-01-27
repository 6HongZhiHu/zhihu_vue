//使用mock.js提供接口数据
import Mock from 'mockjs';
import data from './data.json'; //得到js对象 自动解析好了


//定义mock接口
Mock.mock("/api/goods",{code: 0 , data: data.goods});
Mock.mock("/api/ratings",{code: 0 , data: data.ratings});
Mock.mock("/api/info",{code: 0 , data: data.info});

//console.log("nmsl")