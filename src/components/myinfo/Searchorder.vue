<template>
    <div>
        <Backnav title="搜索结果"></Backnav>
        <Orderlist v-bind:orderlist="orderlist"></Orderlist>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
import Orderlist from './common/Orderlist.vue'

export default {
    components:{
        Backnav,
        Orderlist
    },
    data() {
        return{
            orderlist:[]
        }
    },
    mounted() {
        document.title='订单搜索';
        console.log(this.$route.query.s);
        this.fetchdata(this.$route.query.s);
    },
    methods: {
        fetchdata(s){
            var _this=this;
            this.$http.get('/static/orderlist.json').then(function(res){
                _this.orderlist = res.data; 
                console.log(res.data[1].tip);
            }).catch(function(err){
                console.log("err" + err);
            });
        },
    }
}
</script>

<style>

</style>
