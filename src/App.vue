<template>
  <div id="app">
    <keep-alive exclude="shop">
      <router-view></router-view>
    </keep-alive>
    <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>

  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide/FooterGuide';
import {reqAddress} from './api/index';
export default {
  components:{
    FooterGuide
  },
 
  mounted() {
    //console.log(this)
    //通知vuex发送ajax请求
    this.$store.dispatch("getAddress")
  },

  methods: {
    async getAddress(){
      let result = await reqAddress("113.5636","22.3151")  
      console.log(result.data)
    }
  },

}
</script>

<style lang="stylus" scoped>
  .kk
    color red
</style>
<style lang="stylus" scoped>

</style>