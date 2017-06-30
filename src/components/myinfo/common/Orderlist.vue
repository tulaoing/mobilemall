<template>
<div class="orderlist">
        <ul>
            <li v-for="(item,index) in orderlist">
                <a :href="'/myorder/orderinfo?orderid='+item.orderid">
                    <div>
                        <span class="icon-shop"></span>
                        <span>{{item.shopname}}</span>
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
                                    <div class="attr">口味: {{smallitem.attr}}</div>
                                </div>
                                <div class="orderprice">
                                    <p class="text-right">￥{{smallitem.price}}</p>
                                    <p class="text-right gray little">x{{smallitem.num}}</p>
                                    <p class="text-right red little" v-if="smallitem.state==6||smallitem.state==7||smallitem.state==8">退款中</p>
                                    <p class="text-right orange little" v-if="smallitem.state==9">退款完成</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="darkgray" v-if="item.tip">
                        <span class="littlelineheight">买家留言：</span><span class="littlelineheight">{{item.tip}}</span>
                    </div>
                    <span class="pull-right">合计：￥{{item.totalprice}}</span>
                </a>
                <div class="btnwrap">
                    <div v-if="item.state==0" class="orderbtn" @click="deleteorder(index)">删除订单</div>
                    <div v-if="item.state==1" class="orderbtn" @click="cancel(index)">取消订单</div>
                    <div v-if="item.state==1" class="orderbtn">付款</div>
                    <div v-if="item.state==3" @click="shouhuo(index)" class="orderbtn">确认收货</div>
                    <div v-if="item.state==4" class="orderbtn"><a :href="'/myorder/orderinfo/comment?orderid='+item.orderid">评价</a></div>
                    <div v-if="item.state==3||item.state==4||item.state==5||item.state==6" class="orderbtn"><a :href="'/myorder/orderinfo/express?orderid='+item.orderid">查看物流</a></div>
                </div>
                
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['orderlist'],
    data() {
        return{

        }
    },
    mounted(){
        console.log(this.orderlist)
    },
    methods: {
        deleteorder(index){
            this.orderlist.splice(index,1);
        },
        cancel(index){
            const h = this.$createElement;
            this.$msgbox({
                title: '确认操作',
                message: "确定取消订单吗？",
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        //成功后调用
                        done();
                        instance.confirmButtonLoading = false;
                        this.orderlist[index].state=0;
                    } else {
                        done();
                    }
                }
            })
            
        },
        shouhuo(index) {
            const h = this.$createElement;
            this.$msgbox({
                title: '确认操作',
                message: "确定收货吗？",
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        //成功后调用
                        done();
                        instance.confirmButtonLoading = false;
                        this.orderlist[index].state=4;
                    } else {
                        done();
                    }
                }
            })
        },
    }
}
    


</script>

<style>

</style>
