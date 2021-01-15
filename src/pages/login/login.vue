<template>
  <div>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">HZH外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:isShowSms}" @click="isShowSms=true">短信登录</a>
            <a href="javascript:;" :class="{on:!isShowSms}" @click="checkLogin">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:isShowSms}">
              <section class="login_message">
                <input 
                  type="tel" 
                  maxlength="11" 
                  placeholder="手机号" 
                  v-model="phone"
                  v-validate="'required|mobile'"
                  name="phone"
                >
                <button 
                  :disabled="!isRightPhone || jsTime>0" 
                  class="get_verification"
                  :class="{right_phone_number:isRightPhone && jsTime<=0}"
                  @click.prevent="sendCode"
                >{{jsTime>0 ? `已发送验证码（${jsTime}）s`:"获取验证码" }}</button>
                <span style="color:red" v-show="errors.has('phone')">
                  {{errors.first("phone")}}
                </span>
              </section>
              <section class="login_verification">
                <input 
                  type="tel" 
                  maxlength="8" 
                  placeholder="验证码"
                  v-model="code"
                  v-validate="{required:true,regex:/^\d{6}$/}"
                  name="code"
                >
                <span style="color:red" v-show="errors.has('code')">
                  {{errors.first("code")}}
                </span>
              </section>
              <section class="login_hint">
                温馨提示：未注册HZH外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!isShowSms}">
              <section>
                <section class="login_message">
                  <input 
                    type="tel" 
                    maxlength="11" 
                    placeholder="手机/邮箱/用户名"
                    v-model="name"
                    v-validate="'required'"
                    name="name"
                  >
                  <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                </section>
                <section class="login_verification">
                  <input 
                    :type="isShowPwd ? 'text' : 'password'"  
                    maxlength="8" 
                    placeholder="密码"
                    v-model="pwd" 
                    name="pwd" 
                    v-validate="'required'"
                  >
                  <div 
                    class="switch_button" 
                    @click="isShowPwd=!isShowPwd"
                    :class="isShowPwd ? 'on':'off'"
                  >
                    <div class="switch_circle" :class="isShowPwd ? 'right':''"></div>
                    <span class="switch_text">HZH</span>
                  </div>
                </section>
                <section class="login_message">
                  <input 
                    type="text" 
                    maxlength="11" 
                    placeholder="验证码"
                    v-model="captcha"
                    name="captcha" 
                    v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}"
                  >
                  <!-- 当前发送的不是ajax请求，没有跨域 -->
                  <img 
                    class="get_verification" 
                    src="http://localhost:4000/captcha" 
                    alt="captcha"
                    @click="updateYzm"
                    ref="captcha"
                  >
                  <span 
                    style="color: red;" 
                    v-model="captcha"
                    v-show="errors.has('captcha')"
                  >
                    {{ errors.first('captcha') }}
                  </span>
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login">登录</button> 
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-arrow-left"></i>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {reqMsg,reqPwdLogin,reqSmsLogin} from '../../api/index';
import { Toast,MessageBox  } from 'mint-ui';

export default {
  name:"Login",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
  //这里存放数据
    return {
      //是否显示手机短信登录
      isShowSms:true,
      phone:"",
      //显示密码是否可见
      isShowPwd:false,
      //用户名
      name:"",
      //短信验证码
      code:"",
      //密码
      pwd:"",
      //用户验证码
      captcha:"",
      jsTime:0
    };
  },
  //计算属性 类似于data概念
  computed: {
    isRightPhone(){
      return /^1\d{10}$/.test(this.phone)
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    checkLogin(){
      this.isShowSms=false;
      this.updateYzm();
    },
    async sendCode(){
      //绑定的点击事件阻止事件冒泡
      //初始显示倒计时
      this.jsTime = 10;
      let timeId = setInterval(()=>{
        this.jsTime--;
        if(this.jsTime <= 0){
          this.jsTime = 0;
          clearInterval(timeId)
        }
      },1000) 
      //发请求
      let result = await reqMsg(this.phone);
      console.log(result);
      if(result.code === 0){
        Toast({
          message:"发送成功"
        })
      }
    },
    async login(){
      //console.log(this)
      // 进行前台表单验证
      let names
      if (this.isShowSms) {
        names = ['phone', 'code']
      } else {
        names = ['name', 'pwd', 'captcha']
      }
      //对指令的所有表单项进行验证
      const success = await this.$validator.validateAll(names);
      //console.log(success,names)
      let result;
      if(success){
        let {name,phone,code,pwd,captcha} = this;
        if(this.isShowSms){
          //短信登录
          result = await reqSmsLogin({phone,code})
        }else{
          //密码登录
          result = await reqPwdLogin({name,pwd,captcha});
          //this.updateYzm(); //更新图形验证码
        }
      }else return
      //console.log("登录消息==》",result,success)
      if(result.code === 0){
        let user = result.data;
        Toast({
          message:"登录成功"
        });
        this.$store.dispatch("saveUser",result) //将user信息保存在vuex中
        this.updateYzm();
        this.$router.replace({path:"/profile"})
      }else{
        this.updateYzm();
        MessageBox('提示', result.msg);
      }
    },
    updateYzm(){
      //随机加一个get请求参数，对请求没有影响，且不会用浏览器缓存图片
      this.$refs.captcha.src = "http://localhost:4000/captcha?t=" + Date.now();
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
<style scoped>
.right_phone_number{
  color: black !important;
}
</style>

<style lang="stylus" scoped>
@import "../../../src/assets/stylus/mixins.styl"
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
             
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 8px
      left 8px
      width 40px
      height 40px
      >.iconfont
        font-size 20px
        color #000
</style>