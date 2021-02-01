<template>
  <div>
    <section class="msite">
        <Header :title="address.name || '定位中...'">
          <span class="header_search" slot="left">
            <i class="iconfont icon-lvsefenkaicankaoxianban-5"></i>
          </span>
          <span class="header_login" slot="right">
            <span class="header_login_text" @click="dome">
              {{user ? user.name : '登录|注册'}}
            </span>
          </span>
        </Header>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(cs,index) in categorysArr" :key="index">
                <div class="link_to_food" v-for="(c,index) in cs" :key="index">
                  <div class="food_container">
                    <img :src="require('./images/nav/' + c.image_url)" alt="">
                  </div>
                  <span>{{c.title}}</span>
                </div>
              </div>
            </div>
           
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <div class="shop_container">
            <ul class="shop_list" v-if="shops.length>0">
              <li 
                class="shop_li border-1px" 
                v-for="shop in shops" 
                :key="shop.id"
                @click="tiao(shop.id)"
              >
                <a>
                  <div class="shop_left">
                    <img class="shop_img" :src="require('./images/shop/'+shop.image_path)">
                  </div>
                  <div class="shop_right">
                    <section class="shop_detail_header">
                      <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                      <ul class="shop_detail_ul">
                        <li class="supports" v-for="(sub,index) in shop.supports" :key="index">
                          {{sub.icon_name}}
                        </li>
                      </ul>
                    </section>
                    <section class="shop_rating_order">
                      <section class="shop_rating_order_left">
                        <Star :score="shop.rating" :size="24"></Star>
                        <div class="rating_section">
                          {{shop.rating}}
                        </div>
                        <div class="order_section">
                          月售{{shop.rating_count}}单
                        </div>
                      </section>
                      <section class="shop_rating_order_right">
                        <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
                      </section>
                    </section>
                    <section class="shop_distance">
                      <p class="shop_delivery_msg">
                        <span>¥{{shop.float_minimum_order_amount}}起送</span>
                        <span class="segmentation">/</span>
                        <span>配送费约¥{{shop.float_delivery_fee}}</span>
                      </p>
                    </section>
                  </div>
                </a>
              </li>
            </ul>
            <ul v-else>
              <li v-for="i in 5" :key="i">
                <img src="./images/shop_back.svg" alt="">
              </li>
            </ul>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import SwiperCore,{Swiper,Pagination} from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import {mapState} from 'vuex';
//import _ from 'lodash';
//按需引入lodash的chunk函数 生成指定的二维数组
import chunk from 'lodash/chunk';
import state from '../../store/state';


export default {
  name:"Msite",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
  //这里存放数据
    return {
      
    };
  },
  //计算属性 类似于data概念
  computed: {
    // ...mapState({address:"address"})
    ...mapState({
      //["address","categorys","shops","isLogin","user"]
      address:state => state.msite.address,
      shops:state => state.msite.shops,
      categorys:state => state.msite.categorys,
      user:state => state.user.user,
    }),

    //包含所有分类的二维数组
    categorysArr(){
      let {categorys} = this;
      //console.log(categorys)
      //二维数组
      let sumArr = [];
      let nArr = [];

      //遍历总的一维数组
      categorys.forEach(c => {
        //将小数组放入大数组中 只保存一次
        if(nArr.length === 0){
          sumArr.push(nArr)
        };
        //将分类的数据保存在小数组中
        nArr.push(c);

        //限制小数组的长度为8 如果小数组的长度为8则重新创建一个小数组
        if(nArr.length === 8){
          nArr = [];
        }
      });
      
      return sumArr;
    },
    //使用lodash来生成二维数组
    categorysArr2(){
      return chunk(this.categorys,8)
    }
  },
  //监控data中的数据变化
  watch: {
    //解决swiper轮播不正常的问题
    //1.使用watch + $nextTick
    //2.callback + $nextTick
    //3.利用dispatch()返回的promise
    categorys(){
      // //this.categorys 变化 :[] == > [...]
      // this.$nextTick(()=>{ //将回调函数延迟到下次界面更新后执行 在修改数据后立即使用它
      //    SwiperCore.use([Pagination]); //注册模块
      //     //加载swiper轮播图 swiper对象必须在列表数据显示之后创建
      //     new Swiper ('.swiper-container', {
      //       loop: true, // 循环模式选项
      
      //       // 如果需要分页器
      //       pagination: {
      //         el: '.swiper-pagination',
      //       },
            
      //     })
      // })
    }
  },
  //方法集合
  methods: {
    tiao(id){
      console.log("id",id)
      this.$router.push(`/shop/${id}`)
    },
    dome(){
      //console.log(this.address)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //console.log(mapState())
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
   //分发异步action。将请求到vuex中
   //多传一个回调函数在他更新数据后执行回调函数正常加载轮播图组件
   /**
    * 
    this.$store.dispatch("getCategorys",()=>{
       //this.categorys 变化 :[] == > [...]
      this.$nextTick(()=>{ //将回调函数延迟到下次界面更新后执行 在修改数据后立即使用它
         SwiperCore.use([Pagination]); //注册模块
          //加载swiper轮播图 swiper对象必须在列表数据显示之后创建
          new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
      
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
          })
      })
   });
   * */
    this.$store.dispatch("getShops")
    await this.$store.dispatch("getCategorys");
    await this.$store.dispatch("getAddress");
    SwiperCore.use([Pagination]); //注册模块
    //加载swiper轮播图 swiper对象必须在列表数据显示之后创建
    new Swiper ('.swiper-container', {
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      
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

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../../src/assets/stylus/mixins.styl"

.msite  //首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
    .shop_container
      margin-bottom 50px
      .shop_list
        .shop_li
          bottom-border-1px(#f1f1f1)
          width 100%
          >a
            clearFix()
            display block
            box-sizing border-box
            padding 15px 8px
            width 100%
            .shop_left
              float left
              box-sizing border-box
              width 23%
              height 75px
              padding-right 10px
              .shop_img
                display block
                width 100%
                height 100%
            .shop_right
              float right
              width 77%
              .shop_detail_header
                clearFix()
                width 100%
                .shop_title
                  float left
                  width 200px
                  color #333
                  font-size 16px
                  line-height 16px
                  font-weight 700
                  &::before
                    content '品牌'
                    display inline-block
                    font-size 11px
                    line-height 11px
                    color #333
                    background-color #ffd930
                    padding 2px 2px
                    border-radius 2px
                    margin-right 5px
                .shop_detail_ul
                  float right
                  margin-top 3px
                  .supports
                    float left
                    font-size 10px
                    color #999
                    border 1px solid #f1f1f1
                    padding 0 2px
                    border-radius 2px
              .shop_rating_order
                clearFix()
                width 100%
                margin-top 18px
                margin-bottom 8px
                .shop_rating_order_left
                  float left
                  color #ff9a0d
                  .rating_section
                    float left
                    font-size 10px
                    color #ff6000
                    margin-left 4px
                  .order_section
                    float left
                    font-size 10px
                    color #666
                    transform scale(.8)
                .shop_rating_order_right
                  float right
                  font-size 0
                  .delivery_style
                    transform-origin 35px 0
                    transform scale(.7)
                    display inline-block
                    font-size 12px
                    padding 1px
                    border-radius 2px
                  .delivery_left
                    color #fff
                    margin-right -10px
                    background-color #02a774
                    border 1px solid #02a774
                  .delivery_right
                    color #02a774
                    border 1px solid #02a774
              .shop_distance
                clearFix()
                width 100%
                font-size 12px
                .shop_delivery_msg
                  float left
                  transform-origin 0
                  transform scale(.9)
                  color #666
                .segmentation
                  color #ccc    
</style>

