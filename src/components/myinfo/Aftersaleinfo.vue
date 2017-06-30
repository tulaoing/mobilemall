<template>
    <div>
        <Backnav title="退款详情"></Backnav>
        <div class="paddinglrt">
            <ul>
                <li v-if="service.state==6||service.state==7||service.state==8"><span class="paddingright">订单状态: </span><span>退款中</span></li>
                <li v-if="service.state==9"><span class="paddingright">订单状态: </span><span>退款完成</span></li>
                <li><span class="paddingright">服务类型: </span><span>{{service.servicetype}}</span></li>
                <li><span class="paddingright">服务原因: </span><span>{{service.reason}}</span></li>
                <li><span class="paddingright">退款金额: </span><span>{{service.num}}</span></li>
                <li><span class="paddingright">退款说明: </span><span>{{service.description}}</span></li>
            </ul>
            <div v-if="service.state==7">
                <span style="line-height:35px;">卖家已同意退货，请退货</span>
                <span class="btnbg pull-right"><a href="/myorder/orderinfo/aftersaleinfo/sendout">退货</a></span>
            </div>
            <div v-if="service.state==9">
                <div>
                    <span>退货承运来源：</span><span>{{service.expressname}}</span>
                </div>
                <div>
                    <span>退货运单编号：</span><span>{{service.expressid}}</span>
                </div>
                 <div>
                    <span>订单详细状态：</span><span>卖家已签收，退款完成</span>
                </div>
            </div>
            <div v-if="service.state==6"><span>订单详细状态：</span><span>等待卖家同意退款</span></div>
            <div v-if="service.state==8">
                <div>
                    <span>退货承运来源：</span><span>{{service.expressname}}</span>
                </div>
                <div>
                    <span>退货运单编号：</span><span>{{service.expressid}}</span>
                </div>
                 <div>
                    <span>订单详细状态：</span><span>等待卖家签收</span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
export default {
    data(){
        return{
            service:{}
        }
    },
    mounted(){
        document.title='退款详情';
        this.fetchdata();
    },
    methods: {
        fetchdata(){
            var _this=this;
            this.$http.get('/static/service.json').then(function(res){
                _this.service = res.data; 
                console.log(res.data);
            }).catch(function(err){
                console.log("err" + err);
            });
        },
    },
    components: {
        Backnav
    }
}
</script>

<style>
.paddinglrt{padding: 10px 20px;}
.btnbg{background-color: #83BC0D;display: inline-block;padding: 5px 10px;}
.btnbg a{color: #fff;}
</style>
