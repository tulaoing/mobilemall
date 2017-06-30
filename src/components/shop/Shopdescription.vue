<template>
    <div>
        <Notfound v-if="shopdata.mes==-1"></Notfound>
        <div class="shopdescription"  v-if="shopdata.mes!=-1">
            <Backnav title="店铺简介"></Backnav>
            <div class="list">
                <img :src="shopdata.imgurl" class="shopavater pull-left">
                <span class="pull-left">{{shopdata.name}}</span>
                <span class="pull-right" v-if="!liked">收藏</span>
                <span class="pull-right" v-if="liked">已收藏</span>
                <span class="collecticon pull-right" :class="{'icon-collection':!liked,'icon-collection2':liked,'white':liked}"  @click="addcollection()"></span>
            </div>
            <div class="list">
                <span class="attrname">店铺名:</span><span>{{shopdata.name}}</span>
            </div>
            <div class="list">
                <div>
                    <span class="attrname">好评率:</span><span>{{shopdata.goodrate}}</span>
                </div>
                <div>
                    <span class="attrname">开店时间:</span><span>{{shopdata.shopcreatetime}}</span>
                </div>
            </div>
            <div class="list">
                <ul>
                    <li><span class="attrname">描述相符:</span><span>{{shopdata.scoredes}}</span></li>
                    <li><span class="attrname">服务态度:</span><span>{{shopdata.scoresev}}</span></li>
                    <li><span class="attrname">物流服务:</span><span>{{shopdata.scoreship}}</span></li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
import Notfound from '../Notfound.vue'
export default {
    data(){
        return{
            shopdata:{},
            liked:true
        }
    },
    mounted(){
        this.fetchData();
    },
    methods: {
        fetchData(Id){
            var _this=this;
            this.$http.get('/static/shop.json').then(function(res){
                _this.shopdata = res.data; 
                document.title="店铺简介";
                //_this.shopdata.mes=-1;
                console.log(res.data);
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        addcollection(){
            this.liked = !this.liked;
        },
    },
    components:{
        Backnav,
        Notfound
    }
}
</script>

<style>
.shopdescription{background-color: #f0f0f0}
.shopavater{width: 30px;height: 30px;margin-right: 10px;}
.shopdescription .collecticon{color: #83BC0D;margin-top: 5px;margin-right: 10px;}
.shopdescription .list{background-color: #fff;padding: 10px 20px;overflow: hidden;margin-bottom: 5px;}
.attrname{margin-right: 15px;}
</style>
