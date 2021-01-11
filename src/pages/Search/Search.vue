<template>
  <div>
    <section class="search">
      <!-- <header class="header">
        <a class="header_title">
          <span class="header_title_text">搜索</span>
        </a>
      </header> -->
      <Header title="搜索">
         <a class="header_title">
          <span class="header_title_text">搜索</span>
         </a>
      </Header>
      <form class="search_form" action="#">
        <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input">
        <input type="submit" name="submit" class="search_submit">
      </form>
    </section>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name:"Search",
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
<style scoped>
</style>
<style lang="stylus" scoped>
@import "../../../src/assets/stylus/mixins.styl"
.search  //搜索
  width 100%
  .search_form
    clearFix()
    margin-top 45px
    background-color #fff
    padding 12px 8px
    input
      height 35px
      padding 0 4px
      border-radius 2px
      font-weight bold
      outline none
      &.search_input
        float left
        width 79%
        border 4px solid #f2f2f2
        font-size 14px
        color #333
        background-color #f2f2f2
      &.search_submit
        float right
        width 18%
        border 4px solid #02a774
        font-size 16px
        color #fff
        background-color #02a774
</style>