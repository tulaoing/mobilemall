<template>
  <div>
      <Backnav title="编辑地址"></Backnav>
      <div class="addaddress">
          <div class="formlist displayflex">
              <label class="label">收货人：</label><el-input v-model="oneaddress.name" class="flex1"></el-input>
          </div>
          <div class="formlist displayflex">
              <label class="label">联系电话：</label><el-input v-model="oneaddress.tel" class="flex1"></el-input>
          </div>
          <div class="formlist displayflex">
            <label class="label">地区：</label>
            <el-cascader
                class="flex1"
                :options="options"
                v-model="oneaddress.area"
                >
            </el-cascader>
          </div>
          <div class="formlist displayflex">
              <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请填写详细地址，不少于5个字"
                    v-model="oneaddress.addressdetail">
                </el-input>
          </div>
          <div class="error red">{{errortext}}</div>
      </div>
      <div class="savebtn" @click="save()">保存</div>
  </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
export default {
    data(){
        return{
            options: [],
            oneaddress:{},
            errortext:''
        }
    },
    mounted () {
        document.title='编辑地址';
        this.initarea();
        this.fatchdata();
        document.querySelector('body').style.background='#fff';
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
        fatchdata(){
            var _this=this;
            this.$http.get('/static/oneaddress.json').then(function(res){
                _this.oneaddress = res.data; 
                console.log(res.data);
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        save(){
            let regtel=new RegExp("^1[3|4|5|7|8][0-9]{9}$");
            if(this.oneaddress.name==''){
                this.$toasted.show("收货人不能为空", { 
                    theme: "primary", 
                    position: "top-center", 
                    duration : 1000
                });
                return false;
            }
            console.log(this.oneaddress.tel);
            console.log(regtel.test(this.oneaddress.tel));
            if(!regtel.test(this.oneaddress.tel)){
                this.$toasted.show("请填写正确的电话号码", { 
                    theme: "primary", 
                    position: "top-center", 
                    duration : 1000
                });
                return false;
            }
            console.log(this.oneaddress.area);
            if(this.oneaddress.area.length<2){
                this.$toasted.show("请选择地区", { 
                    theme: "primary", 
                    position: "top-center", 
                    duration : 1000
                });
                return false;
            }
            if(this.oneaddress.addressdetail.length<5){
                this.$toasted.show("请填写详细地址", { 
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
    components:{
        Backnav
    }
}
</script>

<style>
.formlist label{
    line-height: 36px;
}
.el-cascader__label{
    padding: 0 45px 0 10px!important;
}
</style>
