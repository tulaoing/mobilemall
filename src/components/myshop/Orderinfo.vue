<template>
    <div class="ordermore">
        <Backnav title="订单详情"></Backnav>
        <div class="displayflex" style="margin-top:2px;">
            <span class="icon-location"></span>
            <div class="flex1 locationwrap">
                <span class="pull-left paddingright">收货人:</span><span class="pull-left">{{oneorder.name}}</span>
                <span class="pull-right">{{oneorder.tel}}</span>
                <div class="clearfix"><span class="paddingright">收货地址:</span><span>{{oneorder.address}}</span></div>
            </div>
        </div>
        <div class="paddinglr">
            <div>
                <span style="line-height:30px;">订单编号: </span><span>{{oneorder.orderid}}</span>
                <span v-if="oneorder.state==1" class="pull-right">未付款</span>
                <span v-if="oneorder.state==2" class="pull-right">未发货</span>
                <span v-if="oneorder.state==3" class="pull-right">未收货</span>
                <span v-if="oneorder.state==4||oneorder.state==5" class="pull-right">订单完成</span>
                <span v-if="oneorder.state==6" class="pull-right">退款中</span>
            </div>
            <ul class="oneorderlist">
                <li v-for="item in oneorder.product">
                    <div class="displayflex">
                        <img :src="item.imgurl" class="orderimg">
                        <div class="flex1 padding">
                            <div class="orderpname">{{item.productname}}</div>
                            <div class="attr">口味: {{item.attr}};</div>
                        </div>
                        <div class="orderprice ">
                            <p class="text-right">￥{{item.price}}</p>
                            <p class="text-right gray little">x{{item.num}}</p>
                        </div>
                    </div>
                    <div v-if="(item.state==2||item.state==3)&&item.state!=6" class="orderbtn"><a :href="'/shoporder/orderinfo/aftersale'">退款</a></div>
                    <div v-if="item.state>=6" class="orderbtn"><a :href="'/shoporder/orderinfo/aftersaleinfo'">退款详情</a></div>
                </li>
            </ul>
            <div>
                <span>买家留言：</span><span>{{oneorder.tip}}</span>
            </div>
            <div class="pull-right" style="padding:10px 0">
                <p class="text-right">运费：￥{{oneorder.freight}}</p>
                <p class="text-right">合计：￥{{oneorder.totalprice}}</p>
            </div>
            <div class="btnwrap">
                <div v-if="oneorder.state==2" class="orderbtn">发货</div>
                <div v-if="oneorder.state==3" class="orderbtn"><a :href="'/shoporder/orderinfo/express?orderid='+oneorder.orderid">查看物流</a></div>
            </div>
        </div>
        <div>
            <ul>
                <li><span  class="paddingright">订单创建时间:</span><span>{{oneorder.ordercreate}}</span></li>
                <li v-if="oneorder.state!=1"><span class="paddingright">订单付款:</span><span>{{oneorder.paytime}}</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
export default {
    data(){
        return{
            oneorder:{}
        }
    },
    mounted() {
        document.title='订单详情';
        this.fetchdata()
    },
    methods:{
        fetchdata(){
            var _this=this;
            this.$http.get('/static/oneorder.json').then(function(res){
                _this.oneorder = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        }
    },
    components:{
        Backnav
    }
}
</script>

<style>
.ordermore{background-color: #f0f0f0}
.ordermore>div{background-color: #fff;margin-top: 5px;padding: 5px 10px;}
.clearfix{clear: both}
.paddingright{padding-right: 10px;}
.locationwrap{padding: 0 10px;overflow: hidden}
.address .icon-location, .ordermore .icon-location{width: 30px;line-height: 50px;margin-left: 10px;font-size: 20px;}
.paddinglr{padding: 0 10px;}
.littlegray{font-size: 10px;color: gray;display: inline-block;margin-right: 5px;}
.gray{color: gray}
.little{font-size: 10px;}
.oneorderlist>li{margin-top: 10px;overflow: hidden}
.ordermore .icon-shop{font-size:16px;margin-right: 10px;}
</style>
