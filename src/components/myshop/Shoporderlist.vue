<template>
    <div class="myorder">
        <Backnav title="店铺订单"></Backnav>
        <div class="ordernav">
            <ul>
                <li @click="orderall()" v-bind:class="classObject"><a href="/shoporder?type=1">全部</a></li>
                <li @click="orderunpaid()" v-bind:class="classObject2"><a href="/shoporder?type=2">待付款</a></li>
                <li @click="orderpaid()" v-bind:class="classObject3"><a href="/shoporder?type=3">待发货</a></li>
                <li @click="orderdelivery()" v-bind:class="classObject4"><a href="/shoporder?type=4">待收货</a></li>
                <li @click="orderservice()" v-bind:class="classObject5"><a href="/shoporder?type=5">退款/售后</a></li>
            </ul>
        </div>
        <div class="orderlist">
            <ul>
                <li v-for="item in myorder">
                    <a :href="'/shoporder/orderinfo?orderid='+item.orderid">
                        <div>
                            <span style="line-height:30px;">订单编号: </span><span>{{item.orderid}}</span>
                            <span v-if="item.state==1" class="pull-right">未付款</span>
                            <span v-if="item.state==2" class="pull-right">未发货</span>
                            <span v-if="item.state==3" class="pull-right">未收货</span>
                            <span v-if="item.state==4||item.state==5" class="pull-right">订单完成</span>
                            <span v-if="item.state==6" class="pull-right">退款中</span>
                        </div>
                        <ul>
                            <li v-for="smallitem in item.product">
                                <div class="displayflex">
                                    <img :src="smallitem.imgurl" class="orderimg">
                                    <div class="flex1 padding">
                                        <div class="orderpname">{{smallitem.productname}}</div>
                                        <div class="attr">口味: {{smallitem.attr}};</div>
                                    </div>
                                    <div class="orderprice">
                                        <p class="text-right">￥{{smallitem.price}}</p>
                                        <p class="text-right gray little">x{{smallitem.num}}</p>
                                        <p class="text-right red little" v-if="smallitem.state==6">退款中</p>
                                        <p class="text-right orange little" v-if="smallitem.state==9">退款完成</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <span class="pull-right">合计：￥{{item.totalprice}}</span>
                     </a>
                    <div class="btnwrap">
                        <div v-if="item.state==2" class="orderbtn"><a :href="'/shoporder/orderinfo/sendout?orderid='+item.orderid">发货</a></div>
                        <div v-if="item.state==3" class="orderbtn"><a :href="'/shoporder/orderinfo/express?orderid='+item.orderid">查看物流</a></div>
                    </div>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
export default {
    data(){
        return{
            myorder:{},
            type:1
        }
    },
    computed: {
        classObject: function () {
            return {
                active: this.type==1,
            }
        },
        classObject2: function () {
            return {
                active: this.type==2,
            }
        },
        classObject3: function () {
            return {
                active: this.type==3,
            }
        },
        classObject4: function () {
            return {
                active: this.type==4,
            }
        },
        classObject5: function () {
            return {
                active: this.type==5,
            }
        }
    },
    mounted() {
        document.title='店铺订单';
        this.fetchdata(this.$route.query.type)
    },
    methods:{
        fetchdata(id){
            if(id){this.type=id;}else{this.type=1}
            var _this=this;
            this.$http.get('/static/orderlist.json').then(function(res){
                _this.myorder = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        }
    },
    components: {
        Backnav,
    }
}
</script>

<style>

</style>
