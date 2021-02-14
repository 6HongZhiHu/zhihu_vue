<template>
  <div>
    <ShopHeader></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="`/shop/${id}/goods`" replace>点餐</router-link>
      </div>
        <div class="tab-item">
        <router-link :to="`/shop/${id}/ratings`" replace>评价</router-link>
      </div>
        <div class="tab-item">
        <router-link :to="`/shop/${id}/info`" replace>商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ShopHeader from '../../components/shopHeader/ShopHeader';
import {saveCartFoods} from '../../Utils/index';
import {mapState} from 'vuex';
export default {
  name:"shop",
  //import引入的组件需要注入到对象中才能使用
  components: {
    ShopHeader
  },
  //name:"Shop",
  props: {
    id:String
  },
  data() {
  //这里存放数据
    return {
      
    };
  },
  //计算属性 类似于data概念
  computed: {
    ...mapState({
      shop: state => state.shop   // {shop: {}, cartFoods: []}
    })
  },
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
    //在vuex里发送请求保存在vuex里数据
    // this.$store.dispatch("getGoods");
    // this.$store.dispatch("getInfo");
    // this.$store.dispatch("getRatings");
    this.$store.dispatch("getShop",this.id);
    let id = this.id;
    //console.log("shop组件的id",id);
    window.onload = ()=>{};
    window.addEventListener("unload",()=>{
      const {shop:{id}, cartFoods } = this.shop;
      saveCartFoods(id,cartFoods);
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
    //vue在组件刷新的时候生命周期不会执行
    //将当前商家购物车保存
    const {shop:{id}, cartFoods } = this.shop  // 多层解构
    saveCartFoods(id,cartFoods)
  }, //生命周期 - 销毁之前
  destroyed() {
    
  }, //生命周期 - 销毁完成
  activated() {
    
  }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../src/assets/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>