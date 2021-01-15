<template>
  <div>
    <div class="star" :class="'star-'+size" >
      <span 
        class="star-item" 
        v-for="(sc,index) in starClass" 
        :key="index"
        :class="sc"
      >
      </span>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    score:Number,
    size:Number
  },
  data() {
  //这里存放数据
    return {
      
    };
  },
  //计算属性 类似于data概念
  computed: {
    //5个星星类名的数组
    starClass(){
      const {score} = this;
      let arr = [];
      //向arr添加N个'on'
      let scoreInt = Math.floor(score);//向下取整
      for (let index = 0; index < scoreInt; index++) {
        arr.push('on')
      }
      
      //向arr添加0/1个'half'
      if(score*10 - scoreInt*10 >= 5){
        arr.push("half");
      };
      //向arr添加M个'off'
      while(arr.length<5){
        arr.push("off")
      }
      return arr;
    }
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

  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
  
</style>