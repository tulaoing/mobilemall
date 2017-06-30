<template>
    <div class="regbox">
        <Backnav title="注册"></Backnav>
        <div class="regboxheader">
            <img src="../assets/img/logo.jpg"/>
        </div>
        <div class="loginreg">
            <a href="/login">登录</a>
            <a href="/reg" class="active">注册</a>
        </div>
        <div style="clear: both"></div>
        
        <div class="regform">
            <div class="regformlist">
                <span class="tip"><span class="red">*</span>用户名：</span>
                <el-input v-model="username" id="username"></el-input>
            </div>
            <div class="errorreg">{{usernameerror}}</div>
            <div class="regformlist">
                <span class="tip"><span class="red">*</span>密码：</span>
                <el-input v-model="password" id="password"></el-input>
            </div>
            <div class="regformlist">
                <span class="tip"><span class="red">*</span>确认密码：</span>
                <el-input v-model="confirmpassword" id="confirmpassword"></el-input>
            </div>
            <div class="errorreg">{{passworderror}}</div>
            <div class="regformlist">
                <span class="tip">性别：</span>
                <el-radio class="radio" v-model="sex" label="0">男</el-radio>
                <el-radio class="radio" v-model="sex" label="1">女</el-radio>
            </div>
            <div class="regformlist">
                <span class="demonstration tip">出生日期：</span>
                <el-date-picker v-model="date" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
            </div>
            <div class="regformlist">
                <span class="tip"><span class="red">*</span>邮箱：</span>
                <el-input v-model="email" id="email"></el-input>
            </div>
            <div class="errorreg">{{emailerror}}</div>
            <div class="regformlist">
                <span class="tip"><span class="red">*</span>手机：</span>
                <el-input v-model="phone" id="phone"></el-input>
            </div>
            <div class="errorreg">{{phoneerror}}</div>
            <div class="block regformlist">
                <span class="tip">地区：</span>
                <el-cascader
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange">
                </el-cascader>
            </div>
            
            <div class="regbtn" @click="reg()">注册</div>
        </div>
    </div>
</template>

<script>
import Backnav from './common/Backnav.vue'
import Vue from 'vue'
import RegionPicker from 'vue-region-picker'
import REGION_DATA from 'china-area-data'

Vue.use(RegionPicker, {
  region: REGION_DATA
})
export default {
    data () {
        return {
            username:'',
            password:'',
            confirmpassword:'',
            email:'',
            phone:'',
            error:'',
            area:'',
            sex: '0',
            date: '',
            options: [],
            selectedOptions: [],
            usernameerror:'',
            passworderror:'',
            phoneerror:'',
            emailerror:''
            
        }
    },
    mounted () {
        this.initarea();
    },
    components: {
        Backnav,
        RegionPicker
    },
    mounted(){
        document.title='注册';
        document.querySelector('body').style.background="#fff";
    },
    methods: {
        initarea(){
            var _this=this;
            this.$http.get('../static/area.json').then(function(res){
                _this.options = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        reg(){
            this.usernameerror='';
            this.passworderror='';
            this.phoneerror='';
            this.emailerror='';
            let regname=new RegExp("^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{6,16}$");
            let regpassword=new RegExp(".{8,20}");
            let regtel=new RegExp("^1[3|4|5|7|8][0-9]{9}$");
            let regemail=new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$");
            if(!regname.test(this.username)){
                this.usernameerror='请输入6-16位非特殊字符';
                return false
            }
            if(!regpassword.test(this.password)){
                this.passworderror='请输入8-20位密码';
                return false
            }
            if(this.password!==this.confirmpassword){
                this.passworderror='两次输入密码不一致';
                return false
            }
            if(this.email==''){
                this.emailerror='邮箱不能为空';
                return false;
            }
            if(!regemail.test(this.email)){
                this.emailerror='邮箱格式不正确';
                return false;
            }
            if(this.phone==''){
                this.phoneerror='手机号码不能为空';
                return false;
            }
            if(!regtel.test(this.phone)){
                this.phoneerror='手机号码格式不正确';
                return false;
            }
            this.$store.dispatch('Login',this.username);
            
        },
        handleChange(value) {
            console.log(value);
            console.log(this.selectedOptions);
        }
    }
}
</script>

<style>
.loginreg{width: 150px;margin: 0 auto}
.loginreg a{width: 75px;text-align: center;display: block;float: left}
.loginreg .active{border-bottom: 2px solid #83BC0D}
.regboxheader{margin: 2px auto 0 auto;text-align: center}
.regform{width: 300px;margin: 20px auto}
.regformlist{line-height: 40px;margin-bottom: 5px}
.regbtn{width: 100%;background-color: #83BC0D;text-align: center;color: #fff;margin-top: 10px;height: 40px;line-height: 40px;border-radius:5px;}
.regformlist .tip{width: 80px;display: inline-block;text-align: right;margin-right: 10px;}
.regformlist input{text-align: left;width: 200px;}
.regbox .el-input{width: auto!important;}
.regbox input:focus{border: 1px solid #aaa!important;}
.loginbox input:focus{border: 1px solid #aaa!important;}
.red{color: red}
.errorreg{margin-left: 98px;color:red;}
</style>

