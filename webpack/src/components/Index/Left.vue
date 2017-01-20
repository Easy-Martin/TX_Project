<template>
    <el-col :span="4" class="left_cnt">
        <el-menu :default-active="thisIndex" class="el-menu-vertical-demo" theme="dark" @select="handleSelect">
            <el-menu-item style="padding-left:30px;" v-for="(item,index) in menu" :index="index.toString()"><i :class="item.icon"></i>{{item.name}}</el-menu-item>
        </el-menu>
    </el-col>
</template>
<script>
  import Api from '../../api';
  export default {
    data(){
        return {
            menu:[],
            thisIndex:'0'
        }
    },
    created(){
        Api.menulistAction(this,{callback:(res)=>{
            if(res.code == 301){
                sessionStorage.removeItem('TOKEN');
                this.$router.replace('/');
                return false;
            }
            this.menu = res.data;
            if(this.$route.path == '/index'){
                this.$router.replace({path:'/index/'+ this.menu[0].mark,query:{name:this.menu[0].name}})
            }else{
                res.data.forEach((item,index)=>{
                    if(this.$route.query.name == item.name){
                        this.thisIndex = index.toString();
                        return false;   
                    }
                })
                
            }
        }})
    },
    methods: {
      handleSelect(index) {
        this.$router.replace({path:'/index/'+ this.menu[index].mark,query:{name:this.menu[index].name}})
      }
    }
  }
</script>

<style lang="scss" scoped>
    .left_cnt{
        width:241px;
        min-height:550px;
        .el-menu-vertical-demo{
            border-radius:0;
        }
    }
</style>