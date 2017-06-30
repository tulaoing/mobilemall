<template>
    <div>
        <Backnav title="查看物流"></Backnav>
        <div style="padding:10px 20px;">
            <div>
                <span>物流状态：</span>
                <span>{{express.state}}</span>
            </div>
            <div>
                <span>承运来源：</span>
                <span>{{express.name}}</span>
            </div>
            <div>
                <span>运单编号：</span>
                <span>{{express.id}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'

export default {
    data(){
        return{
            express:{}
        }
    },
    mounted(){
        document.title='物流信息';
        this.fetchdata(this.$route.query.orderid);
        document.querySelector('body').style.background="#fff";
    },
    methods: {
        fetchdata(){
            var _this=this;
            this.$http.get('/static/express.json').then(function(res){
                _this.express = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        }
    },
    components: {
        Backnav
    }
}
</script>

<style>

</style>
