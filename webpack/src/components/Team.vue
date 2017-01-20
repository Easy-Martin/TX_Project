<template>
    <div class="teams">
        <div class="add">
            <el-button @click="showAdd" type="text">+添加新成员</el-button>
        </div>

        <div v-for="(item,index) in form" class="team">
            <el-form ref="form" :model="item" label-width="80px">
                <el-form-item label="职位">
                    <el-input v-model="item.office"></el-input>
                </el-form-item>
                <el-form-item label="显示名称">
                    <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序">
                    <el-input-number v-model="item.num" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="人物描述">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="item.description">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="item.editLoading" @click="editTeam(index)">修改</el-button>
                    <el-button type="danger" :loading="item.delLoading"  @click="delTeam(index)">删除</el-button>
                </el-form-item>
                <el-form-item>
                    <transition name="errorMove">
                        <div class="adderror" v-show="item.isNotice">
                            <el-alert :title="item.msg" :closable="false" :type="item.type" show-icon></el-alert>
                        </div>
                    </transition>
                </el-form-item>
            </el-form>
        </div>
        <transition name="bounce">
            <div class="mark_ly" :class="show?'active':''" v-show="show"></div>
        </transition>
        <transition name="move">
        <div class="newTeam" :class="show?'active':''" v-show="show">
            <div class="breadcrumb">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>添加团队成员</el-breadcrumb-item>
                </el-breadcrumb>

            </div>
            <div class="newFoem">
                
                <el-form ref="form" :model="newTeam" label-width="80px">
                    <el-form-item label="职位">
                        <el-input v-model="newTeam.office"></el-input>
                    </el-form-item>
                    <el-form-item label="显示名称">
                        <el-input v-model="newTeam.name"></el-input>
                    </el-form-item>
                    <el-form-item label="显示顺序">
                        <el-input-number v-model="newTeam.num" @change="handleChange" :min="1" :max="10"></el-input-number>
                    </el-form-item>
                    <el-form-item label="人物描述">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="newTeam.description">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="newTeam.loading" @click="addTeam">添加</el-button>
                        <el-button type="danger" @click="cancelAdd">取消</el-button>
                    </el-form-item>

                    <el-form-item>
                        <transition name="errorMove">
                            <div class="adderror" v-show="newTeam.isNotice">
                                <el-alert :title="newTeam.msg" :closable="false" :type="newTeam.type" show-icon></el-alert>
                            </div>
                        </transition>
                    </el-form-item>
                </el-form>
                <div class="notice">
                    
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
    import Api from '../api';

    export default {
        name: 'Team',
        data() {
            return {
                form: [],
                show: false,
                newTeam: {
                    office:'',
                    name:'',
                    num:'1',
                    description:'',
                    type:'error',
                    isNotice:false,
                    msg:'',
                    loading:false,
                }
            }
        },
        created() {
            Api.teamAction(this,{
                callback: res => {
                    this.form = res.data;
                }
            })
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
            showAdd() {
                this.show = true;
                this.newTeam.office = '';
                this.newTeam.name = '';
                this.newTeam.num = '1';
                this.newTeam.description = '';
            },
            cancelAdd(){
                this.show = false;
            },
            editTeam(index){
                if(this.form[index].editLoading){
                    return false;
                }
                let res = {
                    name:this.form[index].name,
                    office:this.form[index].office,
                    num:this.form[index].num,
                    description:this.form[index].description,
                    id:this.form[index].id,
                    type:1,
                    callback:res=>{
                        this.form[index].editLoading = false;
                        if(res.code == 0){
                            this.form[index].type = 'success';
                            this.form[index].msg = '修改成功';
                            
                            setTimeout(()=>{
                                this.form[index].isNotice = false;
                            },2000)
                        }else{
                            this.form[index].type = 'error';
                            this.form[index].msg = res.msg;
                        }
                        this.form[index].isNotice = true;
                    }
                }
                if(res.name.length===0){
                    this.form[index].isNotice = true;
                    this.form[index].msg = '请填写显示名称';
                    setTimeout(()=>{
                        this.form[index].isNotice = false;
                    },2000)
                    return false;
                }
                if(res.office.length===0){
                    this.form[index].isNotice = true;
                    this.form[index].msg = '请填写职位';
                    setTimeout(()=>{
                        this.form[index].isNotice = false;
                    },2000)
                    return false;
                }
                if(res.description.length===0){
                    this.form[index].isNotice = true;
                    this.form[index].msg = '请填写人物描述';
                    setTimeout(()=>{
                        this.form[index].isNotice = false;
                    },2000)
                    return false;
                }
                this.form[index].editLoading = true;
                this.form[index].isNotice = false;
                Api.editteamAction(this,res);
            },
            delTeam(index){
                
                if(this.form[index].delLoading){
                    return false;
                }
                let res = {
                    id:this.form[index].id,
                    type:2,
                    callback:res=>{
                        this.form[index].delLoading = false;
                        if(res.code == 0){
                            this.form[index].type = 'success';
                            this.form[index].msg = '删除成功';
                            
                            setTimeout(()=>{
                                this.form[index].isNotice = false;
                            },2000);
                            setTimeout(()=>{
                                Api.teamAction(this,{
                                    callback: res => {
                                        this.form = res.data;
                                    }
                                })
                            },2000)
                        }else{
                            this.form[index].type = 'error';
                            this.form[index].msg = res.msg;
                        }
                        this.form[index].isNotice = true;
                    }
                }
                this.form[index].delLoading = true;
                this.form[index].isNotice = false;
                Api.editteamAction(this,res);

            },
            addTeam(){
                if(this.newTeam.loading){
                    return false;
                }
                let res = {
                    name:this.newTeam.name,
                    office:this.newTeam.office,
                    num:this.newTeam.num,
                    description:this.newTeam.description,
                    type:0,
                    callback:res=>{
                        this.newTeam.loading = false;
                        this.newTeam.isNotice = true;
                        if(res.code == 0){
                            Api.teamAction(this,{callback: res => {
                                if(res.code=='0'){
                                    this.form = res.data;
                                }                            
                            }})
                            this.newTeam.type = 'success';
                            this.newTeam.msg = '添加成功';
                            setTimeout(()=>{
                                this.newTeam.isNotice = false;
                                this.cancelAdd();
                            },2000)
                        }else{
                            this.newTeam.type = 'error';
                            this.newTeam.msg = res.msg;
                            setTimeout(()=>{
                                this.newTeam.isNotice = false;
                            },2000)
                        }
                    }
                }
                if(res.name.length===0){
                    this.newTeam.isNotice = true;
                    this.newTeam.msg = '请填写显示名称';
                    setTimeout(()=>{
                        this.newTeam.isNotice = false;
                    },2000)
                    return false;
                }
                if(res.office.length===0){
                    this.newTeam.isNotice = true;
                    this.newTeam.msg = '请填写职位';
                    setTimeout(()=>{
                        this.newTeam.isNotice = false;
                    },2000)
                    return false;
                }
                if(res.description.length===0){
                    this.newTeam.isNotice = true;
                    this.newTeam.msg = '请填写人物描述';
                    setTimeout(()=>{
                        this.newTeam.isNotice = false;
                    },2000)
                    return false;
                }
                this.newTeam.loading = true;
                this.newTeam.isNotice = false;
                Api.editteamAction(this,res);
                
            }
        }
    }
</script>
<style lang="scss">
    .teams{
        padding:20px;
        overflow: hidden;
        zoom:1;
        .el-textarea__inner{
            resize: none;
        }
        .team{
            width:45%;
            padding:30px 20px 0;
            border:1px solid #eee;
            border-radius:4px;
            box-shadow:1px 1px 15px rgba(0,0,0,0.1);
            float:left;
            margin:3% 2%;
            height:450px;
        }
        .add{
            margin-left:2%;
        }
        .mark_ly{
            position: fixed;
            width:100%;
            height:100%;
            background: #000;
            opacity: 0.4;
            left:0;
            top:0;
        }
        .newTeam{
            position: fixed;
            width: 500px;
            height:100%;
            right:0px;
            top:0;
            background: #fff;
            .breadcrumb{
                padding:20px 20px 0;
                height:60px;
                border-bottom:1px solid #eee;
                width:100%;
                
                span{
                    font-size:16px;
                }
            }
            .newFoem{
                padding:30px;
                .notice{
                    position: absolute;
                    bottom:0;
                    right:0;
                    width:100%;
                    padding:20px;
                }
            }
            
        }
        .adderror{
            line-height:normal;
            opacity: 1;
        }
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-out .5s;
    }
    @keyframes bounce-in {
        from {opacity:0;}
        to {opacity:0.4;}
    }
    @keyframes bounce-out {
        from {opacity:0.4;}
        to {opacity:0;}
    }


    .move-enter-active {
        animation: move-in 0.5s;
    }
    .move-leave-active {
        animation: move-out 0.5s
    }
    @keyframes move-in {
        from {right:-500px;}
        to {right:0px;}
    }
    @keyframes move-out {
        from {right:0px;}
        to {right:-500px;}
    }



    .errorMove-enter-active {
        animation: errorMove-in .5s;
    }
    .errorMove-leave-active {
        animation: errorMove-out .5s;
    }
    @keyframes errorMove-in {
        from {opacity:0;}
        to {opacity:1;}
    }
    @keyframes errorMove-out {
        from {opacity:1;}
        to {opacity:0;}
    }
    
</style>