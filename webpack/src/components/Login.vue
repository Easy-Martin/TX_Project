<template>
    <div class="login">
        <div class="login_from">
            <h2>天禧管理平台</h2>
            <form method="post" id="formpostsub">
                <div class="form-group">
                    <label for="username"></label>
                    <input type="text" class="subuser" v-model="username" name="username" id="username" autocomplete="off" placeholder="账号">
                </div>
                <div class="form-group">
                    <label for="password"></label>
                    <input type="password" class="subpasswd" v-model="password" name="password" id="password" placeholder="密码">
                </div>
                <button type="button" @click="submitAction($event)" class="sub_login">登陆</button>
                <div v-show="errMsg!=''" class="errormsg">{{errMsg}}</div>
            </form>
        </div>
    </div>
</template>
<script>
    import Api from '../api';
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                errMsg: ''
            }
        },
        created() {
            document.title = ' 登陆天禧管理平台';
        },
        methods: {
            submitAction(e) {
                let n = e.target.className
                let res = {
                    username: this.username,
                    password: this.password,
                    callback: (res) => {
                        if (res.code == 0) {
                            sessionStorage.setItem('TOKEN', res.data.token);
                            sessionStorage.setItem('LOGIN_NAME', res.data.name)
                            this.$router.replace('/index');
                            this.errMsg = ''
                        } else {
                            this.errMsg = res.msg;
                            e.target.className = e.target.className.trim().replace('disabled', '');
                            e.target.textContent = '登陆';
                        }
                    }
                }
                if (e.target.className.indexOf('disabled') < 0) {
                    e.target.className += ' disabled';
                    e.target.textContent = '正在登陆...';
                    Api.loginAction(res)
                }

            }
        }
    }
</script>
<style scoped lang="scss">
    @keyframes bag {
        0% {
            background: #5fa1d5
        }
        12% {
            background: #cf39c4
        }
        34% {
            background: #9a39cf
        }
        56% {
            background: #5fd586
        }
        78% {
            background: #8a6d3b
        }
        100% {
            background: #5fa1d5
        }
    }
    
    .login {
        padding: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        background: #5fa1d5;
        animation: bag 18s infinite;
        overflow: hidden;
        .login_from {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        ;
        h2 {
            font-size: 24px;
            font-weight: 400;
            text-align: center;
            color: white;
            margin-bottom: 25px;
        }
        ;
        input {
            height: 50px;
            width: 300px;
            border-radius: 30px;
            text-align: center;
            font-size: 16px;
            border: 1px solid #fff;
            outline: none;
        }
        ;
        .sub_login {
            color: #fff;
            width: 300px;
            height: 50px;
            border-radius: 30px;
            font-size: 16px;
            background: #5fa1d5;
            border: 1px solid #fff;
            transition: all 0.2s;
            animation: bag 18s infinite;
            cursor: pointer;
            &:focus {
                outline: none;
            }
        }
        ;
        .form-group {
            margin-bottom: 15px;
        }
        ;
        .errormsg {
            margin-top: 15px;
            font-size: 14px;
            text-align: center;
            border-radius: 30px;
            color: #fff;
            padding: 10px;
            width: 100%;
            background: rgba(255, 0, 0, 0.4);
        }
    }
</style>