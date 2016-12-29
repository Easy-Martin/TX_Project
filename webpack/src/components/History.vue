<template>
    <div class="history">
        <div class="add">
            <el-button @click="showAdd" type="text">+添加新历史</el-button>
        </div>

        <div v-for="(item,index) in history" class="team">
            <el-form ref="form" :model="item" label-width="80px">
                <el-form-item label="发生日期">
                    <el-date-picker
                        v-model="item.date"
                        align="right"
                        type="datetime" 
                        format="yyyy-MM-dd"
                        placeholder="请选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="事件描述">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="item.info">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="item.editLoading" @click="editHistory(index)">修改</el-button>
                    <el-button type="danger" :loading="item.delLoading"  @click="delHistory(index)">删除</el-button>
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
        <div class="newHistory" :class="show?'active':''" v-show="show">
            <div class="breadcrumb">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>添加团队成员</el-breadcrumb-item>
                </el-breadcrumb>

            </div>
            <div class="newFoem">
                <el-form ref="form" :model="newHistory" label-width="80px">
                   <el-form-item label="发生日期">
                        <el-date-picker
                            v-model="newHistory.date"
                            align="right"
                            type="datetime" 
                            format="yyyy-MM-dd"
                            placeholder="请选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="事件描述">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="newHistory.info">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="newHistory.loading" @click="addTeam">添加</el-button>
                        <el-button type="danger" @click="cancelAdd">取消</el-button>
                    </el-form-item>

                    <el-form-item>
                        <transition name="errorMove">
                            <div class="adderror" v-show="newHistory.isNotice">
                                <el-alert :title="newHistory.msg" :closable="false" :type="newHistory.type" show-icon></el-alert>
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
        name: 'History',
        data() {
            return {
                history: [],
                show: false,
                newHistory: {
                    date:'',
                    info:'',
                    type:'error',
                    isNotice:false,
                    msg:'',
                    loading:false,
                }
            }
        },
        created() {
            Api.historyAction({
                callback: res => {
                    this.history = res.data;
                }
            })
        },
        methods: {
            showAdd() {
                this.show = true;
                this.newHistory.date = '';
                this.newHistory.info = '';
            },
            cancelAdd(){
                this.show = false;
            },
            editHistory(index){
                if(this.history[index].editLoading){
                    return false;
                }
                let res = {
                    date:this.history[index].date,
                    info:this.history[index].info,
                    id:this.history[index].id,
                    type:1,
                    callback:res=>{
                        this.history[index].editLoading = false;
                        if(res.code == 0){
                            this.history[index].type = 'success';
                            this.history[index].msg = '修改成功';
                        }else{
                            this.history[index].type = 'error';
                            this.history[index].msg = res.msg;
                        }
                        this.history[index].isNotice = true;
                        setTimeout(()=>{
                            this.history[index].isNotice = false;
                        },1000)
                    }
                }
                if(res.date.length===0){
                    this.history[index].isNotice = true;
                    this.history[index].msg = '请填写日期';
                    setTimeout(()=>{
                        this.history[index].isNotice = false;
                    },1000)
                    return false;
                }
                if(res.info.length===0){
                    this.history[index].isNotice = true;
                    this.form[index].msg = '请填写描述';
                    setTimeout(()=>{
                        this.history[index].isNotice = false;
                    },2000)
                    return false;
                }
                this.history[index].editLoading = true;
                this.history[index].isNotice = false;
                Api.edithistoryAction(res);
            },
            delHistory(index){
                if(this.history[index].delLoading){
                    return false;
                }
                let res = {
                    id:this.history[index].id,
                    type:2,
                    callback:res=>{
                        this.history[index].delLoading = false;
                        if(res.code == 0){
                            this.history[index].type = 'success';
                            this.history[index].msg = '删除成功';
                            
                            setTimeout(()=>{
                                this.history[index].isNotice = false;
                            },1000);
                            setTimeout(()=>{
                                Api.historyAction({
                                    callback: res => {
                                        this.history = res.data;
                                    }
                                })
                            },2000)
                        }else{
                            this.history[index].type = 'error';
                            this.history[index].msg = res.msg;
                        }
                        this.history[index].isNotice = true;
                    }
                }
                this.history[index].delLoading = true;
                this.history[index].isNotice = false;
                Api.edithistoryAction(res);

            },
            addTeam(){
                if(this.newHistory.loading){
                    return false;
                }
                let res = {
                    date:this.newHistory.date,
                    info:this.newHistory.info,
                    type:0,
                    callback:res=>{
                        this.newHistory.loading = false;
                        this.newHistory.isNotice = true;
                        if(res.code == 0){
                            Api.historyAction({
                                callback: res => {
                                    this.history = res.data;
                                }
                            })
                            this.newHistory.type = 'success';
                            this.newHistory.msg = '添加成功';
                            setTimeout(()=>{
                                this.newHistory.isNotice = false;
                                this.cancelAdd();
                            },2000)
                            
                        }else{
                            this.newHistory.type = 'error';
                            this.newHistory.msg = res.msg;
                            setTimeout(()=>{
                                this.newHistory.isNotice = false;
                            },2000)
                        }
                        
                    }
                }
                if(res.date.length===0){
                    this.newHistory.isNotice = true;
                    this.newHistory.msg = '请填写日期';
                    setTimeout(()=>{
                        this.newHistory.isNotice = false;
                    },2000)
                    return false;
                }
                if(res.info.length===0){
                    this.newHistory.isNotice = true;
                    this.newHistory.msg = '请填写描述';
                    setTimeout(()=>{
                        this.newHistory.isNotice = false;
                    },2000)
                    return false;
                }
                this.newHistory.loading = true;
                this.newHistory.isNotice = false;
                Api.edithistoryAction(res);
                
            }
        }
    }
</script>
<style lang="scss">
    .history{
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
            height:320px;
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
        .newHistory{
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