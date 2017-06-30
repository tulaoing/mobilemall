<template>
    <div>
        <Backnav title="设置"></Backnav>
        <div>
            <div class="settinglist  displayflex">
                <span class="pull-left">店铺</span><el-input v-model="shopinfo.name" class="flex1"></el-input>
            </div>
            <div class="settinglist">
                <span class="pull-left">店铺头像设置(点击头像)</span>
                <el-upload
                    class="avatar-uploader pull-right"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="shopinfo.imgurl" :src="shopinfo.imgurl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="settinglist displayflex">
                <span class="pull-left">联系方式</span>
                <el-input v-model="shopinfo.tel" placeholder="请输入内容" class="flex1"></el-input>
            </div>
            <div class="settinglist displayflex">
                <span class="pull-left">地区</span>
                <el-cascader
                    :options="options"
                    v-model="shopinfo.area"
                    @change="handleChange"
                    class="flex1 text-right">
                </el-cascader>
            </div>
            <div class="settinglist displayflex">
                <span class="pull-left" style="width:100px;">店铺简介</span>
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="shopinfo.introduce">
                </el-input>
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
        shopinfo:{},
        options: [],
        errorword:''
      }
    },
    mounted(){
        document.title='店铺信息';
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
            this.$http.get('/static/shop.json').then(function(res){
                _this.shopinfo = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        handleAvatarSuccess(res, file) {
            this.shopinfo.imgurl = URL.createObjectURL(file.raw);
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
            if(this.shopinfo.name==''){
                this.$toasted.show("店铺名称不能为空", { 
                    theme: "primary", 
                    position: "top-center", 
                    duration : 1000
                });
                return false;
            }
            if(this.shopinfo.tel==''){
                this.$toasted.show("联系方式不能为空", { 
                    theme: "primary", 
                    position: "top-center", 
                    duration : 1000
                });
                return false;
            }
            let regtel=new RegExp("^1[3|4|5|7|8][0-9]{9}$");
            if(!regtel.test(this.shopinfo.tel)){
                this.$toasted.show("联系方式格式不符", { 
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
.settinglist:last-child{border-bottom: none;}
</style>
