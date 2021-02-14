<template>
  <div>
    CCC
    <mt-button @click="zcId">注册ID</mt-button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
  //这里存放数据
    return {
      
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    zcId(){
      sessionStorage.setItem("myId",111)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
  },
  //组件当前守卫
  //当符合条件时直接跳转到个人中心
  //beforeRouteEnter
  beforeRouteEnter(to,form,next){
    //当前this不是指向当前实例组件
    //需要用一下next将this引入
    next((com)=>{//回调函数在组件对象创建后执行,并传入当前的this实例
      
      let token = com.$store.state.user.token;
      let myId = sessionStorage.getItem("myId");
      console.log(token,myId)
      if(token && myId){
        next("/profile")
      }else{
        next();
      }
    })
    
  },
  beforeCreate() {
    
  }, //生命周期 - 创建之前

  beforeMount() {
    
  }, //生命周期 - 挂载之前
  beforeUpdate() {
    
  }, //生命周期 - 更新之前
  updated() {
    
  }, //生命周期 - 更新之后
  beforeDestroy() {
    
  }, //生命周期 - 销毁之前
  destroyed() {
    
  }, //生命周期 - 销毁完成
  activated() {
    
  }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
</style>