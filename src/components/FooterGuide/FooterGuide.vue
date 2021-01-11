<template>
  <div class="footer-guide">
    <span 
      class="guide-item" 
      :class="{on: $route.path==='/msite'}"
      @click="goto('/msite')"
    >
      <span>
        <i class="iconfont icon-lvsefenkaicankaoxianban-14"></i>
      </span>
      <span>首页</span>
    </span>
    <span 
      class="guide-item" 
      :class="{on: $route.path==='/search'}"
      @click="goto('/search')"
    >
      <span>
        <i class="iconfont icon-lvsefenkaicankaoxianban-5"></i>
      </span>
      <span>搜索</span>
    </span>
    <span 
      class="guide-item" 
      :class="{on: $route.path==='/order'}"
      @click="goto('/order')"
    >
      <span>
        <i class="iconfont icon-lvsefenkaicankaoxianban-6"></i>
      </span>
      <span>订单</span>
    </span>
    <span 
      class="guide-item" 
      :class="{on: $route.path==='/profile'}"
      @click="goto('/profile')"
    >
      <span>
        <i class="iconfont icon-lvsefenkaicankaoxianban-4"></i>
      </span>
      <span>个人</span>
    </span>
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
    goto(path){
      //路由跳转
      //解决跳转到当前路径路由的警告bug
      //1.点击不是当前项，路由跳转
      if(path !== this.$route.path){
        this.$router.replace(path)
      }
      //2.如果点击当前项刷新界面
      else{
        window.location = path //发送一般http请求 ===》整个界面会刷新显示
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
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
<style scoped lang="stylus" rel="stylesheet/stylus">
   @import "../../../src/assets/stylus/mixins.styl"
  .footer-guide
    top-border-1px(#cccccc)
    display flex
    position fixed
    left 0
    bottom 0
    height 50px
    width 100%
    .guide-item
      margin-top 3px
      display flex
      width 25%
      flex-direction column
      text-align center
      background #ffffff
      &.on
        color $green
      span
        margin-top 5px
        font-size 12px
        i 
          font-size 22px

</style>