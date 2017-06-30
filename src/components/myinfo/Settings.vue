<template>
    <div>
        <Backnav title="设置"></Backnav>
        <div class="bgwhite">
            <div class="settinglist">
                <span class="pull-left">会员名(*不能修改)</span><span class="pull-right">{{userinfo.username}}</span>
            </div>
            <div class="settinglist">
                <span class="pull-left">头像设置(点击头像)</span>
                <el-upload
                    class="avatar-uploader pull-right"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="userinfo.imgurl" :src="userinfo.imgurl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="settinglist">
                <span class="pull-left">性别</span>
                <el-radio class="radio pull-right" v-model="userinfo.sex" label="1">女</el-radio>
                <el-radio class="radio pull-right" v-model="userinfo.sex" label="0">男</el-radio>
            </div>
            <div class="settinglist displayflex">
                <span class="pull-left">邮箱</span>
                <el-input v-model="userinfo.email" placeholder="请输入内容" class="flex1"></el-input>
            </div>
            <div class="settinglist displayflex">
                <span class="pull-left">手机</span>
                <el-input v-model="userinfo.tel" placeholder="请输入内容" class="flex1"></el-input>
            </div>
            <div class="settinglist displayflex">
                <span class="pull-left">生日</span>
                <el-date-picker v-model="userinfo.birthdate" type="date" placeholder="选择日期" :picker-options="pickerOptions0" class="flex1"></el-date-picker>
            </div>
            <div class="settinglist displayflex">
                <span class="pull-left">地区</span>
                <el-cascader
                    :options="options"
                    v-model="userinfo.area"
                    @change="handleChange"
                    class="flex1 text-right">
                </el-cascader>
            </div>
        </div>
        <div class="savebtn" @click="save()">保存</div>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
export default {
    data() {
      return {
        userinfo:{},
        options: []
      }
    },
    mounted(){
        document.title='设置';
        this.fetchdata();
        this.initarea();
         document.querySelector('body').style.background="#fff";
    },
    methods: {
        initarea(){
            var _this=this;
            this.$http.get('/static/area.json').then(function(res){
                _this.options = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        fetchdata(){
            var _this=this;
            this.$http.get('/static/user.json').then(function(res){
                _this.userinfo = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        handleAvatarSuccess(res, file) {
            this.userinfo.imgurl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleChange(value) {
            console.log(value);
        },
        save(){
            let regtel=new RegExp("^1[3|4|5|7|8][0-9]{9}$");
            let regemail=new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$");
            if(this.userinfo.email==''){
                this.$toasted.show("邮箱不能为空", { 
                    theme: "primary", 
                    position: "top-center", 
                    duration : 1000
                });
                return false;
            }
            if(!regemail.test(this.userinfo.email)){
                this.$toasted.show("邮箱格式不正确", { 
                    theme: "primary", 
                    position: "top-center", 
                    duration : 1000
                });
                return false;
            }
            if(this.userinfo.tel==''){
                this.$toasted.show("联系方式不能为空", { 
                    theme: "primary", 
                    position: "top-center", 
                    duration : 1000
                });
                return false;
            }
            if(!regtel.test(this.userinfo.tel)){
                this.$toasted.show("手机号码格式不符", { 
                    theme: "primary", 
                    position: "top-center", 
                    duration : 1000
                });
                return false;
            }
            this.$toasted.show("保存成功", { 
                theme: "primary", 
                position: "top-center", 
                duration : 1000
            });
        }
    },
    components: {
        Backnav
    }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 70px;
    height: 70px;
    line-height: 70px!important;
    text-align: center;
  }
  .avatar {
    width: 70px;
    height: 70px;
    display: block;
  }
  .settinglist{clear: both;overflow: hidden;padding: 10px 20px;border-bottom: 1px solid #eee;}
  .el-radio{margin-left: 10px;}
  .settinglist input{border:none;float: right;text-align: right;}
  .settinglist input:hover{border:none;}
  .settinglist input{border:none;}
  .settinglist input:focus{border:none!important;}
  .settinglist .el-cascader__label{text-align: right}
  .savebtn{position: fixed;bottom: 0;height: 40px;line-height: 40px;background-color: #83BC0D;color: #fff;width: 100%;text-align: center;font-size: 18px;}
  .bgwhite{background-color: #fff;}
</style>
