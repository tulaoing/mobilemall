<template>
  <div class="comfimorder">
    <Backnav title="确认订单"></Backnav>
    <div class="displayflex address" style="margin-top:2px;" @click="changeaddress()">
        <span class="icon-location"></span>
        <div class="flex1 locationwrap">
            <span class="pull-left paddingright">收货人:</span><span class="pull-left">{{address.name}}</span>
            <span class="pull-right">{{address.tel}}</span>
            <div class="clearfix"><span class="paddingright">收货地址:</span><span>{{address.address}}</span></div>
        </div>
    </div>
    <div class="orderlist">
        <ul>
            <li v-for="item in orderlist">
                <div><span class="icon-shop"></span><span>{{item.shopname}}</span></div>
                <ul>
                    <li v-for="smallitem in item.product">
                        <div class="displayflex">
                            <img :src="smallitem.imgurl" class="orderimg">
                            <div class="flex1 padding">
                                <div class="orderpname">{{smallitem.productname}}</div>
                                <div><span v-for="(attr,index) in smallitem.attr" class="attr">口味: {{attr}}; </span></div>
                            </div>
                            <div class="orderprice">
                                <p class="text-right">￥{{smallitem.price}}</p>
                                <p class="text-right gray little">x{{smallitem.num}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="displayflex">
                    <span style="line-height:30px;">买家留言：</span>
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="item.textarea" class="flex1">
                    </el-input>
                </div>
                <span class="pull-right">合计：￥{{item.totalprice}}</span>
                <span class="pull-right paddingright"  v-if="item.fee!=0">运费：￥{{item.fee}}</span>
                <span class="pull-right paddingright" v-if="item.fee==0">免运费</span>
            </li>
        </ul>
    </div>
    <div class="floatbottom">
        <div class="confirmbtn" @click="comfirm">确认订单</div>
        <span class="pull-right red">￥{{sum}}</span>
        <span class="pull-right">小计：</span>
    </div>
  </div>
</template>

<script>
import Backnav from './common/Backnav.vue'
export default {
    components: {
        Backnav
    },
    data(){
        return{
            address:{},
            orderlist:[]
        }
    },
    mounted(){
        document.title='提交订单';
        this.fetchdata();

    },
    computed: {
        sum: function(){
            let aaa=0;
            for(let i=0;i<this.orderlist.length;i++){
                aaa=aaa+this.orderlist[i].totalprice;
            }
            return aaa
        }
    },
    methods: {
        fetchdata(){
            var _this=this;
            this.$http.get('/static/oneaddress.json').then(function(res){
                _this.address = res.data; 
                _this.address.address = res.data.area.join('') + res.data.addressdetail;
                console.log(_this.address.address);
                if(sessionStorage.address){
                    _this.address=JSON.parse(sessionStorage.address);
                    _this.address.address = _this.address.area.join('') + _this.address.addressdetail;
                    console.log(this.address);
                    console.log(this.address.address);
                }
            }).catch(function(err){
                console.log("err" + err);
            });
            // this.$http.get('/static/orderlist2.json').then(function(res){
            //     _this.orderlist = res.data; 
            // }).catch(function(err){
            //     console.log("err" + err);
            // });
            //console.log(sessionStorage.data);
            console.log(sessionStorage.data);
            this.orderlist=JSON.parse(sessionStorage.data);
            
            for(let i=0;i<this.orderlist.length;i++){
                let sum=0;
                for(let j=0;j<this.orderlist[i].product.length;j++){
                    sum=sum+this.orderlist[i].product[j].num*this.orderlist[i].product[j].price;
                }
                this.orderlist[i].totalprice=sum;
                sum=0;
            }
            console.log(this.address);
            console.log(this.address.address);
            console.log(sessionStorage.address);
            
            
        },
        changeaddress(){
            window.location.href="/submit/selectaddress";
        },
        comfirm(){
            sessionStorage.data="";
        }
    }
}
</script>

<style>
.comfimorder{background-color: #f0f0f0;}
.comfimorder>div{margin-top: 1px;overflow: hidden;background-color: #fff;}
.address{padding: 5px 10px;}
.comfimorder .orderlist{background-color: #f0f0f0;}
.comfimorder .orderlist>ul>li{background-color: #fff;}
.floatbottom{position: fixed;bottom: 0;background-color: #fff;width: 100%;border-top: 1px solid #ccc;}
.confirmbtn{background-color: #83BC0D;height: 40px;line-height: 40px;float: right;width: 100px;text-align: center;color: #fff;}
.floatbottom span{line-height: 40px;margin-right: 10px;}
.orderlist textarea{border: none!important;}
</style>
