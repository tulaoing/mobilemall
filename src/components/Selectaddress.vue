<template>
  <div>
    <Backnav title="选择收货地址"></Backnav>
    <div class="floattopright"><a href="/my/address">管理</a></div>
    <div class="addresslist">
      <ul>
        <li v-for="(item,index) in addressarr" @click="select(index)">
          <div>
            <span class="pull-left">{{item.name}}</span>
            <span class="pull-right">{{item.tel}}</span>
          </div>
          <div class="clearfix">{{item.address}}</div>
        </li>
      </ul>
    </div>
    <div class="savebtn"><a href="/my/address/add">添加新地址</a></div>
  </div>
</template>

<script>
import Backnav from './common/Backnav.vue'
export default {
    data(){
      return{
        addressarr:[],
      }
    },
    mounted(){
      this.fetchdata();
    },
    methods: {
      fetchdata(){
        var _this=this;
        this.$http.get('/static/address.json').then(function(res){
            _this.addressarr = res.data; 
            for(let i=0;i<_this.addressarr.length;i++){
                _this.addressarr[i].address=_this.addressarr[i].area.join('') + _this.addressarr[i].addressdetail;
            }
        }).catch(function(err){
            console.log("err" + err);
        });
      },
      select(index){
          sessionStorage.address='';
          sessionStorage.address=JSON.stringify(this.addressarr[index]);
          console.log(sessionStorage.address);
          this.$router.go(-1);
      }
    },
    components: {
        Backnav
    }
}
</script>

<style>
.addresslist{background-color: #f0f0f0;}
.circle{width: 14px;height: 14px;border: 1px solid #666;border-radius: 7px;}
.addresslist ul li{margin-bottom: 5px;background-color: #fff;padding: 5px 0;}
.addresslist ul li>div{padding: 0 20px;}
.bordertop{ border-top:1px solid #eee;}
.editarea{overflow: hidden;font-size: 12px;}
.editarea i{display: block;margin-top: 6px;margin-right: 6px;}
.savebtn a{color: #fff;}
.el-icon-circle-check{color: #83BC0D;border: 1px solid #83BC0D;}
.el-message-box{width: 300px!important;}
.el-message-box__btns .el-button{padding: 5px 15px;}

</style>
