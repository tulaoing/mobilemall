<template>
    <div class="myorder">
        <Backnav title="我的订单"></Backnav>
        <div class="ordernav">
            <ul>
                <li @click="fetchdata(1)" v-bind:class="{active:type==1}">全部</li>
                <li @click="fetchdata(2)" v-bind:class="{active:type==2}">待付款</li>
                <li @click="fetchdata(3)" v-bind:class="{active:type==3}">待发货</li>
                <li @click="fetchdata(4)" v-bind:class="{active:type==4}">待收货</li>
                <li @click="fetchdata(5)" v-bind:class="{active:type==5}">退款/售后</li>
            </ul>
        </div>
        <div class="serachbox">
            <el-input
                placeholder="搜索全部订单"
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick">
            </el-input>
        </div>
        <Orderlist v-bind:orderlist="myorder" v-loading="loading"></Orderlist>
  </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
import Orderlist from './common/Orderlist.vue'
export default {
    data(){
        return{
            myorder:[],
            type:1,
            input2:'',
            loading:true
        }
    },
    mounted() {
        document.title='我的订单';
        this.fetchdata(this.$route.query.type);
    },
    methods:{
        fetchdata(id){
            this.myorder=[];
            if(id){this.type=id;}else{this.type=1}
            var _this=this;
            this.$http.get('/static/orderlist.json').then(function(res){
                _this.myorder = res.data; 
                console.log(res.data[1].tip);
                _this.loading=false;
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        cancel(index){
            this.myorder[index].state=0;
        },
        deleteorder(index){
            this.myorder.splice(index,1);
        },
        handleIconClick(){
            window.location.href="/myorder/searchorder?s="+this.input2;
        }
    },
    components: {
        Backnav,
        Orderlist
    }
}
</script>

<style>
.ordernav{border-bottom: 1px solid #eee;overflow: hidden;background-color: #fff;margin-top: 2px;}
.ordernav ul li{float: left;width: 20%;text-align: center}
.ordernav .active{color: #83BC0D;border-bottom: 2px solid #83BC0D}
.orderimg{width: 80px;height: 80px;}
.orderlist{background-color: #f0f0f0;}
.orderlist .icon-shop{margin-right: 10px;}
.orderlist>ul>li{margin-bottom: 3px;background-color: #fff;padding: 5px 15px;margin-top: 3px;overflow: hidden}
.orderprice{width: 50px;}
.orderlist>ul>li ul li{margin-bottom: 5px;}
.padding{padding:0 10px}
.orderpname{overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;font-size: 13px;line-height: 20px;}
.btnwrap{clear: both;padding: 5px 0 5px 0;overflow: hidden}
.orderbtn{padding: 0 15px;border: 1px solid #ccc;float: right;border-radius: 15px;margin-left: 10px;}
.attr{font-size: 10px;color: gray}
.littlelineheight{line-height: 19px;}
.orange{color: orangered;}
.serachbox{margin: 5px 10px;}
</style>
