
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    
  }
}
</script>
<style lang="css">
  @import './assets/reset.css';
  body,html,#app{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>