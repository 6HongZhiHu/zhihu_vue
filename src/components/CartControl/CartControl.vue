<template>
  <div class="cartcontrol">
    <transition name="move">
      <div 
        key="c1"
        class="iconfont icon-jian1" 
        v-if="food.count>0" 
        @click.stop="updateFoodCount(false)"
      ></div>
    </transition>
    <div class="cart-count" v-if="food.count>0">{{food.count}}</div>
    <div class="iconfont icon-wuuiconxiangjifangda" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//import vue from 'vue';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    food:Object,

  },
  data() {
    //这里存放数据
    return {};
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    updateFoodCount(isAdd){
      //不能直接更新，因为food不在此组件内
      this.$store.dispatch("updateFoodCount",{isAdd,food:this.food})
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //console.log(this.food)
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前

  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../src/assets/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .icon-wuuiconxiangjifangda
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition: all .5s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-jian1
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>