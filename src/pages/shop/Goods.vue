<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper"  ref="left" >
        <ul ref="leftUl">
          <li 
            class="menu-item" 
            :class="{current:i === CurrentIndex}"
            @click="clickItem(i)"
            v-for="(g,i) in goods" :key="g.name">
            <span class="text bottom-border-1px">
              <img
                class="icon"
                :src="g.icon"
                v-show="g.icon"
              />
              {{g.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper"  ref="right">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(g,i) in goods" :key="g.name">
            <h1 class="title">{{g.name}}</h1>
            <ul>
              <li 
                class="food-item bottom-border-1px" 
                v-for="(f,i) in g.foods"
                :key="i"
                @click="showFood(f)"
              >
                <div class="icon">
                  <img
                    width="57"
                    height="57"
                    :src="f.icon"
                  />
                </div>
                <div class="content">
                  <h2 class="name">{{f.name}}</h2>
                  <p class="desc">{{f.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{f.sellCount}}份</span>
                    <span>好评率{{f.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{f.price}}</span>
                    <span class="old" v-show="f.oldPrice">￥{{f.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="f"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {mapState} from 'vuex';
import BScroll from 'better-scroll';
import Food from '@/components/Food/Food';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Food
  },
  props: {},
  data() {
    //这里存放数据
    return {
       // 1). 右侧列表滑动的Y轴坐标: scrollY  在滑动过程中不断改变
        scrollY: 0,
        // 2). 右侧每个分类<li>的top值的数组tops: 第一次列表显示后统计后面不再变化
        tops: [],

        food: {}, // 需要显示的food
    };
  },
  //计算属性 类似于data概念
  computed: {
    ...mapState({
      goods:state => state.shop.shop.goods || [],
      shop:state => state.shop.shop || {},
    }),
    CurrentIndex(){

      const {scrollY,tops} = this;
      let index = tops.findIndex((top,index)=> scrollY>=top && scrollY<tops[index+1])
      if(index !== this.index && this.lscroll){
        this.index = index;
        let li = this.$refs.leftUl.children[index]
        this.lscroll.scrollToElement(li,300)
      }
      
      
      return index;
    }
  },
  //监控data中的数据变化
  watch: {
    goods(){
      //监控goods的变化
      //当数据更新了，在dom中渲染后，自动执行该函数
      //console.log("watch====>",this.goods)
      this.$nextTick(()=>{
        console.log(11)
        this.initScroll();
        //console.log("夹断")
        this.initTop();     
      })
    }
  },
  //方法集合
  methods: {
    //父组件调用子组件的方法 ref
    //子组件调用父组件的方法 props
    showFood(f){
      this.food = f;
      this.$refs.food.toggleShow();
    },
    initScroll(){
      if (!this.lscroll) {
       
        //console.log('创建scroll对象');
        //console.log(this.$refs.left,this.goods)
        //让手机支持Touch事件
        this.lscroll = new BScroll(this.$refs.left,{
          click:true,
          disableMouse:false,
          disableTouch:false
        });
        //console.log(this.lscroll)
        this.rscroll = new BScroll(this.$refs.right,{
          click:true,
          disableMouse:false,
          disableTouch:false,
          probeType : 1 //非实时派发监听事件 必须是触摸滑动才能监视到事件
          //probeType:2//实时派发高频率 触摸
          //probeType:3 //实时 触摸 惯性 编码
        });
         // 给右侧列表绑定scroll监听
        this.rscroll.on('scroll', ({x, y}) => {
          //console.log('给右侧列表绑定scroll监听', x, y)
          this.scrollY = Math.abs(y)
        })
        //scrollEnd滑动结束的监听
        this.rscroll.on("scrollEnd",({x,y})=>{
          console.log("scrollEnd滑动结束的监听",x,y)
          //console.log(Math.abs(y))
          this.scrollY = Math.abs(y);
        });
        if(this.shop.id !== this.$route.params.id){
          this.lscroll = null;
          this.rscroll = null;
        }
      }else{
        this.lscroll.refresh()
        this.rscroll.refresh()
      }
    },
    initTop(){
      if(!this.tops.length){
        const tops = [];
        let top = 0;
        tops.push(top);
        let lis = Array.from(this.$refs.rightUl.children);
        lis.forEach(li=>{
          top += li.clientHeight;
          tops.push(top);
        })
        this.tops = tops;
      }
      
    },
    clickItem(i){
      //让右侧列表滑动到指定位置
      let top = this.tops[i]
      //立即更新scrollY为目标值
      this.scrollY = top;
      this.rscroll.scrollTo(0,-top,300)

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //console.log(BScroll())
    //console.log("mounted====>",this.goods)
    //如果数据有了，直接做初始化的操作、
    if(this.goods.length>0){
      console.log(22);
      
      this.initScroll();
      this.initTop();     
    }
    
  },
  beforeCreate() {}, //生命周期 - 创建之前

  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../../src/assets/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 auto
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
