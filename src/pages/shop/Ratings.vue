<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">4.7</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家 81%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="info.serviceScore" :size="36" />
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info.foodScore" :size="36" />
            <span class="score">{{info.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive"
            @click="setSelectType(2)"
            :class="{active:selectType === 2}"
          >
            全部<span class="count">{{ratings.length}}</span>
          </span>
          <span class="block positive" 
            @click="setSelectType(0)"
            :class="{active:selectType === 0}"
          >
            满意<span class="count">{{manyi}}</span>
          </span>
          <span class="block negative" 
            @click="setSelectType(1)"
            :class="{active:selectType === 1}"
          >
            不满意<span class="count">{{ratings.length-manyi}}</span>
          </span>
        </div>
        <div class="switch" :class="{on:onlyShowText}" @click="toggleText">
          <span class="iconfont icon-lvsefenkaicankaoxianban-18"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper" ref="rating">
        <ul>
          <li 
            class="rating-item" 
            v-for="(r,index) in FilterRatings" 
            :key="index"
            
          >
            <div class="avatar">
              <img
                width="28"
                height="28"
                src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
              />
            </div>
            <div class="content">
              <h1 class="name">{{r.username}}</h1>
              <div class="star-wrapper">
                <Star :score="5" :size="24" />
                <span class="delivery" v-show="r.deliveryTime">{{r.deliveryTime}}分钟送到</span>
              </div>
              <p class="text">{{r.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="r.rateType===0 ? 'icon-dianzan' : 'icon-ai46'"></span>
                <span 
                  class="item" 
                  v-for="(i,index) in r.recommend" 
                  :key="index">{{i}}</span>
              </div>
              <div class="time">{{ dayjs(r.rateTime).format("YYYY年 MM月DD日 HH:mm:ss")}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {mapState, mapGetters} from 'vuex';
import BScroll from 'better-scroll';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      selectType:2,
      onlyShowText:false
    };
  },
  //计算属性 类似于data概念
  computed: {
    ...mapState({
      ratings: state => state.shop.ratings,
      info: state => state.shop.info,
    }),
    ...mapGetters(["manyi"]),
    FilterRatings(){
      const {ratings,onlyShowText,selectType} = this;
      ratings || [];
      //产生一个过滤数组
      return ratings.filter(r=>{
        return (selectType === 2 || selectType===r.rateType) && (!onlyShowText || r.text.length>0)
      })
    }
  },
  //监控data中的数据变化
  watch: {
    ratings(){
      this.$nextTick(()=>{
        this._initBScroll();
      })
    }
  },
  //方法集合
  methods: {
    _initBScroll(){ 
      if(!this.bs_rating){
        this.bs_rating = new BScroll(this.$refs.ratings,{
          click:true,
          disableMouse:false,
          disableTouch:false,
        })  
        console.log("生成bs对象")
      }else{
        this.bs_rating.refresh();
      }
    },
    setSelectType(n){
      this.selectType = n;
    },
    toggleText(){
      this.onlyShowText = !this.onlyShowText;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (this.ratings.length>0) {
      this._initBScroll();
    }
  },
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
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../src/assets/stylus/mixins.styl"

  .ratings
    position: absolute
    top: 225px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .overview
      display: flex
      padding: 2px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
    .ratingselect
      .rating-type
        padding: 18px 0
        margin: 0 18px
        // border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .block
          display: inline-block
          padding: 8px 12px
          margin-right: 8px
          line-height: 16px
          border-radius: 1px
          font-size: 12px
          color: rgb(77, 85, 93)
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: $green
            color: #fff
          .count
            margin-left: 2px
            font-size: 8px
      .switch
        padding: 12px 18px
        line-height: 24px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        color: rgb(147, 153, 159)
        font-size: 0
        &.on
          .icon-lvsefenkaicankaoxianban-18
            color: $green
        .icon-lvsefenkaicankaoxianban-18
          display: inline-block
          vertical-align: top
          margin-right: 4px
          font-size: 24px
        .text
          display: inline-block
          vertical-align: top
          font-size: 12px
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-dianzan, .icon-ai46, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-dianzan
              color: $yellow
            .icon-ai46
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>