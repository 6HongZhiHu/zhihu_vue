<template>
  <div>
    <section class="profile">
      <!-- <header class="header">
        <a class="header_title">
          <span class="header_title_text">我的</span>
        </a>
      </header> -->
      <Header title="个人">
        <a class="header_title">
          <span class="header_title_text">我的</span>
        </a>
      </Header>
      <section class="profile-number" @click='$router.push(user._id ? "/userinfo" : "/login")'>
        <a href="javascript:" class="profile-link">
          <div class="profile_image">
            <i class="iconfont icon-gerenzhongxin"></i>
          </div>
          <div class="user-info">
            <p class="user-info-top" v-if="!user.phone">{{user.name ? user.name : '登录/注册'}}</p>
            <p v-if="!user.name">
              <span class="user-icon">
                <i class="iconfont icon-shouji"></i>
              </span>
              <span class="icon-mobile-number" >{{user.phone ? user.phone : "暂无手机号"}}</span>
            </p>
          </div>
          <span class="arrow">
            <i class="iconfont icon-youjiantou"></i>
          </span>
        </a>
      </section>
      <section class="profile_info_data border-1px">
        <ul class="info_data_list">
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0.00</span>元</span>
            <span class="info_data_bottom">我的余额</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0</span>个</span>
            <span class="info_data_bottom">我的优惠</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0</span>分</span>
            <span class="info_data_bottom">我的积分</span>
          </a>
        </ul>
      </section>
      <section class="profile_my_order border-1px">
        <!-- 我的订单 -->
        <a href='javascript:' class="my_order">
          <span>
            <i class="iconfont icon-lvsefenkaicankaoxianban-16"></i>
          </span>
          <div class="my_order_div">
            <span>我的订单</span>
            <span class="my_order_icon">
              <i class="iconfont icon-youjiantou"></i>
            </span>
          </div>
        </a>
        <!-- 积分商城 -->
        <a href='javascript:' class="my_order">
          <span>
            <i class="iconfont icon-jifen"></i>
          </span>
          <div class="my_order_div">
            <span>积分商城</span>
            <span class="my_order_icon">
              <i class="iconfont icon-youjiantou"></i>
            </span>
          </div>
        </a>
        <!-- 硅谷外卖会员卡 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-biaoqiankuozhan_huiyuan-363"></i>
          </span>
          <div class="my_order_div">
            <span>硅谷外卖会员卡</span>
            <span class="my_order_icon">
              <i class="iconfont icon-youjiantou"></i>
            </span>
          </div>
        </a>
      </section>
      <section class="profile_my_order border-1px">
        <!-- 服务中心 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-_fuwuzhongxin"></i>
          </span>
          <div class="my_order_div">
            <span>服务中心</span>
            <span class="my_order_icon">
              <i class="iconfont icon-youjiantou"></i>
            </span>
          </div>
        </a>
      </section>
    </section>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {mapState} from 'vuex';

export default {
  name:"Profile",
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
    ...mapState(["user"])
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
.profile //我的
  width 100%
  .profile-number
    margin-top 45.5px
    .profile-link
      clearFix()
      position relative
      display block
      background #02a774
      padding 20px 10px
      .profile_image
        float left
        width 63px
        height 63px
        border-radius 50%
        overflow hidden
        vertical-align top
        .icon-gerenzhongxin
          background #e4e4e4
          font-size 62px
      .user-info
        float left
        margin-top 8px
        margin-left 15px
        p
          font-weight: 700
          font-size 18px
          color #fff
          &.user-info-top
            padding-bottom 8px
          .user-icon
            display inline-block
            margin-left -15px
            margin-right 5px
            width 20px
            height 20px
            .icon-shouji
              margin-left 5px
              position relative
              top 5px
              font-size 20px
              vertical-align text-top
          .icon-mobile-number
            font-size 14px
            color #fff
      .arrow
        width 12px
        height 12px
        position absolute
        right 15px
        top 40%
        .icon-jiantou1
          color #fff
          font-size 5px
  .profile_info_data
    bottom-border-1px(#e4e4e4)
    width 100%
    background #fff
    overflow hidden
    .info_data_list
      clearFix()
      .info_data_link
        float left
        width 33%
        text-align center
        border-right 1px solid #f1f1f1
        .info_data_top
          display block
          width 100%
          font-size 14px
          color #333
          padding 15px 5px 10px
          span
            display inline-block
            font-size 30px
            color #f90
            font-weight 700
            line-height 30px
        .info_data_bottom
          display inline-block
          font-size 14px
          color #666
          font-weight 400
          padding-bottom 10px
      .info_data_link:nth-of-type(2)
        .info_data_top
          span
            color #ff5f3e
      .info_data_link:nth-of-type(3)
        border 0
        .info_data_top
          span
            color #6ac20b
  .profile_my_order
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .my_order
      display flex
      align-items center
      padding-left 15px
      >span
        display flex
        align-items center
        width 20px
        height 20px
        >.iconfont
          margin-left -10px
          font-size 24px
        .icon-lvsefenkaicankaoxianban-16
          color #02a774
        .icon-jifen
          color #ff5f3e
        .icon-biaoqiankuozhan_huiyuan-363
          color #f90
        .icon-_fuwuzhongxin
          color #02a774
      .my_order_div
        width 100%
        border-bottom 1px solid #f1f1f1
        padding 18px 10px 18px 0
        font-size 16px
        color #333
        display flex
        justify-content space-between
        span
          display block
        .my_order_icon
          width 10px
          height 10px
          .icon-youjiantou
            color #bbb
            font-size 10px
</style>