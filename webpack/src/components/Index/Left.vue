<template>
    <el-col :span="4" class="left_cnt">
        <div class="title">
            <span class="cricle"><i class="el-icon-star-on"></i></span>
            <span class="text">天禧管理平台</span>
        </div>
        <el-menu default-active="0" class="el-menu-vertical-demo" theme="dark" @select="handleSelect">
            <el-menu-item style="padding-left:30px;" v-for="(item,index) in menu" :index="index.toString()"><i :class="'el-icon-'+item.icon"></i>{{item.name}}</el-menu-item>
        </el-menu>
    </el-col>
</template>
<script>
  export default {
    data(){
        return {
            menu:[{
                name:'商品管理',
                icon:'menu',
            },{
                name:'文章管理',
                icon:'edit',
            },{
                name:'账户管理',
                icon:'plus',
            },{
                name:'我的信息',
                icon:'setting',
            }],
            thisIndex:'1'
        }
    },
    methods: {
      handleSelect(index) {
        console.log(index);
      }
    }
  }
</script>

<style lang="scss" scoped>
    .left_cnt{
        .title{
            padding:20px 0;
            border-bottom:1px solid #625679;
            font-size:20px;
            color:#fff;
            padding-left:20px;
            background:#324057;
            i{
                font-size:40px;
                line-height:40px;
            }
            .cricle{
                border-radius:100%;
                display:inline-block;
                border:1px solid #fff;
                padding:10px;
                height:60px;
            }
            .text{
                height:60px;
                display:inline-block;
                line-height:60px;
                position:relative;
                top:-5px;
            }
        }
        .el-menu-vertical-demo{
            height:100%;
            border-radius:0;
        }
    }
</style>