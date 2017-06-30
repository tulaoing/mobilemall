<template>
  <div>
    <Backnav title="管理收货地址"></Backnav>
    <div class="addresslist">
      <ul>
        <li v-for="(item,index) in addressarr" @click="select()">
          <div>
            <span class="pull-left">{{item.name}}</span>
            <span class="pull-right">{{item.tel}}</span>
          </div>
          <div class="clearfix">{{item.address}}</div>
          <div class="clearfix editarea">
            <i class="circle pull-left" v-on:click="setdefault(item.id,index)" v-bind:class="{ 'el-icon-circle-check': item.default }"></i>
            <span class="pull-left">默认地址</span>
            <span class="pull-right" v-on:click="deleteaddress(item.id,index)">删除</span>
            <i class="pull-right el-icon-delete2" v-on:click="deleteaddress(item.id,index)"></i>
            <span class="pull-right paddingright"><a :href="'/my/address/edit?id='+item.id">编辑</a></span>
            <a :href="'/my/address/edit?id='+item.id"><i class="pull-right el-icon-edit"></i></a>
          </div>
        </li>
      </ul>
    </div>
    <div class="savebtn"><a href="/my/address/add">添加新地址</a></div>
  </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
export default {
    data(){
      return{
        addressarr:[],
      }
    },
    mounted(){
      document.title='我的地址';
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
      setdefault(id,index){
        this.addressarr.forEach(function(element) {
          element.default=false;
        });
        this.addressarr[index].default=true;
      },
      deleteaddress(id,index) {
        console.log(id);
        console.log(index);
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addressarr.splice(index,1);
          this.addressarr[0].default = true;
              this.$toasted.show("删除成功", { 
                  theme: "primary", 
                  position: "top-center", 
                  duration : 1000
              });
          console.log("删除");
        }).catch(() => {    
        });
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
