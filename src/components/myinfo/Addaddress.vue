<template>
  <div>
      <Backnav title="添加新地址"></Backnav>
      <div class="addaddress">
          <div class="formlist displayflex">
              <label class="label">收货人：</label><el-input v-model="name" class="flex1"></el-input>
          </div>
          <div class="formlist displayflex">
              <label class="label">联系电话：</label><el-input v-model="tel" class="flex1"></el-input>
          </div>
          <div class="formlist displayflex">
            <span class="tip">地区：</span>
                <el-cascader
                    class="flex1"
                    :options="options"
                    v-model="selectedOptions"
                    >
                </el-cascader>
          </div>
          <div class="formlist displayflex">
              <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请填写详细地址，不少于5个字"
                    v-model="addressdetial">
              </el-input>
          </div>
          <div class="error"></div>
      </div>
      <div class="savebtn" @click="save()">保存</div>
  </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
export default {
    data(){
        return{
            name:'',
            tel:'',
            addressdetial:'',
            options: [],
            selectedOptions: []
        }
    },
    mounted () {
        document.title='添加地址';
        this.initarea();
        document.querySelector('body').style.background="#fff";
    },
    methods:{
        initarea(){
            var _this=this;
            this.$http.get('/static/area.json').then(function(res){
                _this.options = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        save(){
            let regtel=new RegExp("^1[3|4|5|7|8][0-9]{9}$");
            $('.error').text('');
            if(this.name==''){
                $('.error').text('收货人不能为空');
                return false;
            }
            if(!regtel.test(this.tel)){
                $('.error').text('请填写正确的电话号码');
                return false;
            }
            if(this.selectedOptions.length<2){
                $('.error').text('请选择地区');
                return false;
            }
            if(this.addressdetial.length<5){
                $('.error').text('请填写详细地址');
                return false;
            }

        }
    },
    components:{
        Backnav
    }
}
</script>

<style>
.formlist .label{width: 80px;}
.formlist{padding: 10px 20px;border-bottom: 1px solid #eee}
.formlist input{border:none;text-align: left}
.formlist input:focus{box-shadow: none;outline: none}
.addaddress .error{padding-left: 20px;line-height: 35px;}
.formlist .el-textarea__inner{border: none!important;}
.addaddress .formlist .el-textarea__inner:focus{border: none!important;}
</style>
