<template>
    <div class="setting">
        <el-form ref="form" :model="info" label-width="100px" :rules="rules1">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="info.username" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="info.mobile"></el-input>
            </el-form-item>

            <el-form-item label="联系地址">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="info.address">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="info.loading" @click="handleSubmit1">修改个人信息</el-button>
            </el-form-item>
            <el-form-item>
                <transition name="errorMove">
                    <div class="adderror" v-show="info.isNotice">
                        <el-alert :title="info.msg" :closable="false" :type="info.type" show-icon></el-alert>
                    </div>
                </transition>
            </el-form-item>
        </el-form>
        <el-form  ref="newForm" :model="password" label-width="100px" :rules="rules2">
            <el-form-item label="旧密码" prop="oldpassword">
                <el-input type="password" v-model="password.oldpassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpassword">
                <el-input type="password" v-model="password.newpassword"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="repassword">
                <el-input type="password" v-model="password.repassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" :loading="password.loading" @click="handleSubmit2">修改登录密码</el-button>
            </el-form-item>
            <el-form-item>
                <transition name="errorMove">
                    <div class="adderror" v-show="password.isNotice">
                        <el-alert :title="password.msg" :closable="false" :type="password.type" show-icon></el-alert>
                    </div>
                </transition>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import Api from '../api'
    export default{
        name:'Setting',
        data(){
             var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.password.repassword !== '') {
                        this.$refs.newForm.validateField('repassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.password.newpassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                info:{
                    isNotice:false,
                    username:'',
                    name:'',
                    mobile:'',
                    address:'',
                    msg:'',
                    type:'error'
                },
                password:{
                    isNotice:false,
                    oldpassword:'',
                    newpassword:'',
                    repassword:'',
                    msg:'',
                    type:'error'
                },
                rules1:{
                    name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                },
                rules2:{
                    oldpassword:[{ required: true, message: '请输入登录密码', trigger: 'blur' }],
                    newpassword: [{required: true, validator: validatePass, trigger: 'blur' }],
                    repassword: [{ required: true,validator: validatePass2, trigger: 'blur' }],
                }
            }
        },
        created(){
            Api.getselfinfoAction({callback:res=>{
                if(res.code == 0){
                    this.info.username = res.data.username;
                    this.info.name = res.data.name;
                    this.info.mobile = res.data.mobile;
                    this.info.address = res.data.address;
                }
            }})
        },
        methods:{
            handleSubmit1(ev) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.editInfo();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            editInfo(){
                Api.editselfinfoAction({
                    name:this.info.name,
                    address:this.info.address,
                    mobile:this.info.mobile,
                    callback:res=>{
                        if(res.code == 0){
                            this.info.type = 'success'
                            this.info.isNotice = true;
                            this.info.msg = '修改个人信息成功'
                        }else{
                            this.info.type = 'error'
                            this.info.isNotice = true;
                            this.info.msg = res.msg
                        }
                        setTimeout(()=>{
                            this.info.isNotice = false;
                        },2000)
                    }
                })
            },
            handleSubmit2(ev) {
                this.$refs.newForm.validate((valid) => {
                    if (valid) {
                        this.resetpasswd();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetpasswd(){
                Api.resetselfpasswdAction({
                    password:this.password.oldpassword,
                    repassword:this.password.repassword,
                    callback:res=>{
                        if(res.code == 0){
                            this.password.type = 'success'
                            this.password.isNotice = true;
                            this.password.msg = '修改密码成功'
                        }else{
                            this.password.type = 'error'
                            this.password.isNotice = true;
                            this.password.msg = res.msg
                        }
                        setTimeout(()=>{
                            this.password.isNotice = false;
                        },2000)
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .setting{
        padding:50px 20px;
        .adderror{
            line-height:normal;
            opacity: 1;
        }
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