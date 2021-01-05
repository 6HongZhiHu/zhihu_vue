<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide';
export default {
  components:{
    FooterGuide
  }
}
</script>

<style lang="stylus" scoped>
  .kk
    color red
</style>
<style lang="stylus" scoped>

</style>