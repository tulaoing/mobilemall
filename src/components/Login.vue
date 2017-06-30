<template>
    <div class="loginbox">
        <Backnav title="登录"></Backnav>
        <div class="loginboxheader">
            <img src="../assets/img/logo.jpg"/>
        </div>
        <div class="loginreg">
            <a href="/login" class="active">登录</a>
            <a href="/reg" >注册</a>
        </div>
        <div style="clear:both"></div>
        <div class="loginform">
            <div class="loginformlist displayflex">
                <span class="tip">用户名:</span>
                <el-input v-model="name" id="name" class="flex1"></el-input>
            </div>
            <div class="loginformlist displayflex">
                <span class="tip">密码:</span>
                <el-input v-model="password" id="namepassword" class="flex1"></el-input>
            </div>
            <div>
                
            </div>
            <div class="error"></div>
            <div class="loginbtn" @click="login()">登录</div>
            <div>
                <span class="pull-right"><a href="/findpassword">忘记密码？</a></span>
            </div>
        </div>
    </div>
</template>

<script>
import Backnav from './common/Backnav.vue'

export default {
    data () {
        return {
            name:'',
            password:'',
            error:'',
            radio:false
        }
    },
    components: {
        Backnav
    },
    mounted() {
        document.title='登录';
        document.querySelector('body').style.background="#fff";
        console.log(this.$store.getters.getloginname);
        console.log(sessionStorage);
    },
    methods: {
        login(){
            $('.error').text('');
            let regname=new RegExp("^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{6,16}$");
            let regpassword=new RegExp(".{8,20}");
            if(!regname.test(this.name)){
                $('.error').text('请输入正确的用户名');
                return false
            }
            if(!regpassword.test(this.password)){
                $('.error').text('用户名或密码错误');
                return false
            }
            sessionStorage.loginname=this.name;
            //this.$store.dispatch('login',{loginname:this.name});
            if(this.$route.query.redirect){
                window.location.href=this.$route.query.redirect;
            }else{
                window.location.href="/";
            }
            //this.$router.go(-1);
            //window.location.href="/";

        }
    }
}
</script>

<style scoped>
.loginboxheader{margin: 50px auto 0 auto;text-align: center}
.loginform{width: 300px;margin: 20px auto}
.loginformlist{line-height: 40px;margin-bottom: 10px;}
.loginbtn{width: 100%;background-color: #83BC0D;text-align: center;color: #fff;margin-top: 10px;height: 40px;line-height: 40px;border-radius:5px;}
.loginformlist .tip{width: 50px;display: inline-block;text-align: right;margin-right: 10px;}
.error{color: red;line-height: 25px;padding-left: 100px;}
.loginformlist input{text-align: left;width: 230px;}
.loginbox .el-input{width: auto!important;}
input:focus{border: 1px solid #aaa!important;}
body{background-color: #fff!important;}
</style>

