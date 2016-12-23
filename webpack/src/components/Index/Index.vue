<template>
    <div class="index">
      <el-row :gutter="20" type="flex" class="index">
          <left-layout ref="left"></left-layout>
      </el-row>
        
    </div>
</template>
<script>
import leftLayout from './Left';
  export default {
    name:'Index',
    mounted(){
      console.log(this.$refs)
    },
    components:{
      leftLayout
    },
  }
</script>
<style lang="scss">
    .index{
      height:100%;
    }
</style>