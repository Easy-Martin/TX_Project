<template>
    <div class="account">
        <div class="add">
            <el-button @click="showEdit(undefined,'0')" type="text">+添加新账户</el-button>
        </div>
        <div class="accountList">
            <el-table :data="accountList" border style="width: 100%">
                <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                <el-table-column prop="username" label="用户名" width="150"></el-table-column>
                <el-table-column prop="create_time" label="创建日期" width="120"></el-table-column>
                <el-table-column prop="update_time" label="更新时间" width="120"></el-table-column>
                <el-table-column prop="update_by" label="操作人员" width="150"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                
                <el-table-column inline-template :context="_self" fixed="right" label="操作" width="100">
                    <span>
                        <el-button type="text" @click="showEdit($index,'1')" size="small">编辑</el-button>
                    </span>
                </el-table-column>
            </el-table>
        </div>
        <transition name="bounce">
            <div class="mark_ly" :class="show?'active':''" v-show="show"></div>
        </transition>
        <transition name="move">
        <div class="newAccount" :class="show?'active':''" v-show="show">
            <div class="breadcrumb">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>添加团队成员</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="newFoem">
                <el-form ref="form" :model="newAccount" label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="newAccount.name" placeholder="必须填写"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="newAccount.username" placeholder="必须填写"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="newAccount.mobile" placeholder="可选择填写"></el-input>
                    </el-form-item>
                    <el-form-item label="密码"  v-show="newAccount.actionType==0">
                        <el-input v-model="newAccount.password" placeholder="必须填写"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="可选择填写" v-model="newAccount.address">
                        </el-input>
                    </el-form-item>
                    <el-form-item style="width:100%;">
                        <el-button type="primary" :loading="newAccount.editloading" @click="editAccount">{{(newAccount.actionType==0)?'添加账户':'修改账户'}}</el-button>
                        <el-button type="success" :loading="newAccount.resetloading" @click="resetpasswd" v-show="newAccount.actionType!=0">密码重置</el-button>
                        <el-button type="warning" :loading="newAccount.delloading" @click="delUser" v-show="newAccount.actionType!=0">删除账户</el-button>
                        <el-button type="danger" @click="cancel">取消</el-button>
                    </el-form-item>

                    <el-form-item>
                        <transition name="errorMove">
                            <div class="adderror" v-show="newAccount.isNotice">
                                <el-alert :title="newAccount.msg" :closable="false" :type="newAccount.type" show-icon></el-alert>
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
        name: 'Account',
        data(){
            return {
                accountList:[],
                show: false,
                newAccount:{
                    username:'',
                    address:'',
                    mobile:'',
                    name:'',
                    uuid:'',
                    password:'',
                    type:'error',
                    actionType:'0',
                    isNotice:false,
                    msg:'',
                    editloading:false,
                    resetloading:false,
                    delloading:false,
                }
            }
        },
        created(){
            Api.userlistAction(this,{callback:res=>{
                if(res.code==0){
                    this.accountList = res.data;
                }
            }})
        },
        methods: {
            showEdit(index,type) {
                if(index !== undefined){
                    this.newAccount.username = this.accountList[index].username;
                    this.newAccount.address = this.accountList[index].address;
                    this.newAccount.mobile = this.accountList[index].mobile;
                    this.newAccount.name = this.accountList[index].name;
                    this.newAccount.uuid = this.accountList[index].uuid;
                }else{
                    this.newAccount.username = '';
                    this.newAccount.address = '';
                    this.newAccount.mobile = '';
                    this.newAccount.name = '';
                    this.newAccount.password = '';
                }
                this.newAccount.actionType = type; 
                this.show = true;
            },
            editAccount(){
                if(this.newAccount.editloading){
                    return false;
                }
                let s = this.validate();
                if(s){
                    let res = {
                        username:this.newAccount.username,
                        name:this.newAccount.name,
                        address:this.newAccount.address,
                        mobile:this.newAccount.mobile,
                        password : this.newAccount.password,
                        uuid : this.newAccount.uuid,
                        type:this.newAccount.actionType,
                        callback:result=>{
                            if(result.code==0){
                                Api.userlistAction(this,{callback:response=>{
                                    if(response.code==0){
                                        this.accountList = response.data;
                                    }
                                }});
                                this.newAccount.type = 'success';
                                this.newAccount.msg = (this.newAccount.actionType=='0')? '添加账户成功':'修改账户成功';
                                this.newAccount.isNotice = true;
                                setTimeout(()=>{
                                    this.newAccount.isNotice = false;
                                    this.cancel();
                                },2000)
                            }else{
                                this.newAccount.type = 'error';
                                this.newAccount.msg = result.msg;
                                this.newAccount.isNotice = true;
                                setTimeout(()=>{
                                    this.newAccount.isNotice = false;
                                },2000)
                            }
                            this.newAccount.editloading = false;
                        }
                    }
                    this.newAccount.editloading = true;
                    Api.edituserAction(this,res);
                }else{
                    return false
                }
                
            },
            cancel(){
                this.show = false;
            },
            resetpasswd(){
                if(this.newAccount.resetloading){
                    return false;
                }
                let res = {
                    uuid:this.newAccount.uuid,
                    type:'2',
                    callback:result=>{
                        if(result.code==0){
                            this.newAccount.type = 'success';
                            this.newAccount.msg = '密码重置成功';
                            this.newAccount.isNotice = true;
                            setTimeout(()=>{
                                this.newAccount.isNotice = false;
                                this.cancel();
                            },2000)
                        }else{
                            this.newAccount.type = 'error';
                            this.newAccount.msg = result.msg;
                            this.newAccount.isNotice = true;
                            setTimeout(()=>{
                                this.newAccount.isNotice = false;
                            },2000)
                        }
                        this.newAccount.resetloading = false;
                    }
                }
                this.newAccount.resetloading = true;
                Api.resetpasswdAction(this,res);
            },
            delUser(){
                if(this.newAccount.delloading){
                    return false;
                }
                let res = {
                    uuid:this.newAccount.uuid,
                    type:'2',
                    callback:result=>{
                        if(result.code==0){
                            Api.userlistAction(this,{callback:response=>{
                                if(response.code==0){
                                    this.accountList = response.data;
                                }
                            }});
                            this.newAccount.type = 'success';
                            this.newAccount.msg = '删除账户成功';
                            this.newAccount.isNotice = true;
                            setTimeout(()=>{
                                this.newAccount.isNotice = false;
                                this.cancel();
                            },2000)
                        }else{
                            this.newAccount.type = 'error';
                            this.newAccount.msg = result.msg;
                            this.newAccount.isNotice = true;
                            setTimeout(()=>{
                                this.newAccount.isNotice = false;
                            },2000)
                        }
                        this.newAccount.delloading = false;
                    }
                } 
                this.newAccount.delloading = true;
                Api.edituserAction(this,res);
            },
            validate(){
                let s = true
                if(this.newAccount.name==''){
                    this.newAccount.isNotice = true;
                    this.newAccount.type = 'error';
                    this.newAccount.msg = '请填写姓名';
                    setTimeout(()=>{
                        this.newAccount.isNotice = false;
                    },2000)
                    s = false;
                }else if(this.newAccount.username==''){
                    this.newAccount.isNotice = true;
                    this.newAccount.type = 'error';
                    this.newAccount.msg = '请填写登陆用户名';
                    setTimeout(()=>{
                        this.newAccount.isNotice = false;
                    },2000)
                    s = false;
                }else if(this.newAccount.password==''&&this.newAccount.actionType=='0'){
                    this.newAccount.isNotice = true;
                    this.newAccount.type = 'error';
                    this.newAccount.msg = '请设置登陆密码';
                    setTimeout(()=>{
                        this.newAccount.isNotice = false;
                    },2000)
                    s = false;
                }
                return s;
            }
        }
    }
</script>
<style lang="scss">
    .account{
        padding:20px;
        overflow: hidden;
        zoom:1;
        .el-textarea__inner{
            resize: none;
        }
        .add{
            margin-bottom:20px;
        }
        .mark_ly{
            position: fixed;
            width:100%;
            height:100%;
            background: #000;
            z-index:999998;
            opacity: 0.4;
            left:0;
            top:0;
        }
        .adderror{
            line-height:normal;
            opacity: 1;
        }
        .newAccount{
            overflow:auto;
            position: fixed;
            z-index:999999;
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
                padding:20px;
                .notice{
                    position: absolute;
                    bottom:0;
                    right:0;
                    width:100%;
                    padding:20px;
                }
            }
            
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