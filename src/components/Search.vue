<template>
    <div>
        <headerbg v-if="!shopid"></headerbg>
        <Shopheaderbg v-if="shopid" v-bind:shopid="shopid"></Shopheaderbg>
        <Rankproduct v-bind:jsons="jsons" v-if="item!='shop'"></Rankproduct>
        <Shoplist v-bind:shoplist="shoplist" v-if="item=='shop'"></Shoplist>
    </div>
</template>

<script>
import Headerbg from './common/Headerbg.vue'
import Shopheaderbg from './shop/Shopheaderbg.vue'
import Rankproduct from './common/Rankproduct.vue'
import Shoplist from './common/Shoplist.vue'
export default {
    data(){
        return{
            jsons:'',
            item:'',
            shoplist:[],
            isshop:false,
            shopid:'',
        }
    },
    created() {
        this.shopid=this.$route.query.shopid;
        console.log(this.shopid);
        document.title='搜索';
        if(this.$route.query.item=='shop'){
            this.item='shop';
            this.fetchdata();
        }else if(this.$route.query.shopid){
            console.log(563);
            let json={};
            json.search=this.$route.query.s;
            json.shopid=this.$route.query.shopid;
            this.jsons=JSON.stringify(json);
            console.log(this.jsons);
        }else{
            let json={};
            json.search=this.$route.query.s;
            //console.log(json.search);
            this.jsons=JSON.stringify(json);
            console.log(this.jsons);
        }
    },
    methods: {
        fetchdata(){
            var _this=this;
            this.$http.get('/static/shoplist.json').then(function(res){
                _this.shoplist = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        }
    },
    components:{
        Headerbg,
        Rankproduct,
        Shoplist,
        Shopheaderbg
    }
}
</script>

<style>

</style>
