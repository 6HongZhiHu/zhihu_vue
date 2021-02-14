<template>
  <div class="shop-info" ref="info">
    <div class="info-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="delivery-icon">虎哥专送</span>
            <span>由商家配送提供配送，约{{info.deliveryTime}}分钟送达，距离{{info.distance}}</span>
          </div>
          <div class="delivery-money">配送费￥{{info.deliveryPrice}}</div>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        
        <div class="activity">
          <div class="activity-item" 
            :key="index" 
            v-for="(s,index) in info.supports"
            :class="subArr[s.type]"
            >
            <span class="content-tag">
              <span class="mini-tag">{{s.name}}</span>
            </span>
            <span class="activity-content"
              >{{s.content}}</span
            >
          </div>
         
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper" >
          <ul class="pic-list" ref="img">
            <li class="pic-item" v-for="(p,index) in info.pics" :key="index" >
              <img
                width="120"
                height="90"
                :src="p"
              />
            </li>
          </ul>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li><span class="bold">品类</span> <span>{{info.category}}</span></li>
          <li><span class="bold">商家电话</span> <span>{{info.phone}}</span></li>
          <li><span class="bold">地址</span> <span>{{info.address}}</span></li>
          <li><span class="bold">营业时间</span> <span>{{info.workTime}}</span></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {mapState} from 'vuex';
import BScroll from 'better-scroll';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      subArr:[
        "activity-green","activity-red","activity-orange"
      ]
    };
  },
  //计算属性 类似于data概念
  computed: {
    ...mapState({
      //ratings: state => state.shop.ratings,
      info: state => state.shop.info,
    }),
  },
  //监控data中的数据变化
  watch: {
    info(){
      this.$nextTick(()=>{
        this._initBScroll();
      })
    }
  },
  //方法集合
  methods: {
     _initBScroll(){ 
      if(!this.bs_info || !this.bs_img){
        this.bs_info = new BScroll(this.$refs.info,{
          click:true,
          disableMouse:false,
          disableTouch:false,
        });
        const ul = this.$refs.img
        const liWidth = 120
        const space = 6
        const liCount = this.info.pics.length
        const width = (liWidth + space) * liCount - space
        ul.style.width = width + 'px'
        //this.$refs.img.style.width = (120+6)*this.info.pics.length-6 + "px"
        this.bs_img = new BScroll(".pic-wrapper",{
          click: true,
          scrollX: true, // 水平滑动
        })   
        console.log("生成bs对象")
      }else{
        this.bs_info.refresh();
        this.bs_img.refresh();
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (this.info.name) {
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
  .shop-info
    position: absolute
    top: 225px
    bottom: 0
    left: 0
    width: 100%
    background: #fff;
    overflow: hidden
    .section
      padding 16px 14px 14px
      font-size 16px
      background-color #fff
      color #666
      border-bottom 1px solid #eee
      position relative
      .section-title
        color #000
        font-weight 700
        line-height 16px
        > .iconfont
          float right
          color #ccc
      .delivery
        margin-top 16px
        font-size 13px
        line-height 18px
        .delivery-icon
          width 55px
          font-size 11px
          margin-right 10px
          display inline-block
          text-align center
          color #fff
          background-color #0097ff
          padding 1px 0
          border-radius 4px
        .delivery-money
          margin-top 5px
      .activity
        margin-top 16px
        .activity-item
          margin-bottom 12px
          display flex
          font-size 13px
          align-items center
          &.activity-green
            .content-tag
              background-color rgb(112, 188, 70)
          &.activity-red
            .content-tag
              background-color rgb(240, 115, 115)
          &.activity-orange
            .content-tag
              background-color: rgb(241, 136, 79)
          .content-tag
            display inline-block
            border-radius 2px
            width 36px
            height: 18px
            margin-right 10px
            color #fff
            font-style normal
            position relative
            .mini-tag
              position absolute
              left 0
              top 0
              right -100%
              bottom -100%
              font-size 24px
              transform scale(.5)
              transform-origin 0 0
              display flex
              align-items center
              justify-content center
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        margin-top 16px
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
      .detail
        margin-bottom -16px
        > li
          display flex
          justify-content space-between
          align-items center
          margin-right -10px
          padding 16px 12px 16px 0
          line-height 16px
          bottom-border-1px(#ddd)
          font-size 13px
          > .bold
            font-weight 700
            color #333
          &:last-child
            border-none()
</style>