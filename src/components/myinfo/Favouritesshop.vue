<template>
    <div>
        <Backnav title="收藏店铺"></Backnav>
        <div class="floattopright" v-on:click="showedit=!showedit"  v-if="!showedit">编辑</div>
        <div class="floattopright" v-on:click="showedit=!showedit" v-if="showedit">完成</div>
        <div class="shoplist">
            <ul>
                <div v-if="shoplist.length==0||shoplist.length==selects.length" class="gray text-center" style="margin:20px;">您还没有收藏店铺..</div>
                <li v-for="(item,index) in shoplist" class="paddinglr" v-if="selects.indexOf(index)==-1">
                    <div class="displayflex">
                        <el-checkbox  v-if="showedit"  @change="handle(item.shopid,index)"></el-checkbox>
                        <img :src="item.imgurl">
                        <div class="flex1 paddinglr">
                            <h5>{{item.name}}</h5>
                            <p class="gray little des">{{item.des}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="floatbottombtn"  v-if="showedit"  @click="deletenum()">删除</div>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'

export default {
    data(){
        return{
            shoplist:[],
            showedit:false,
            selectid:[],
            select:[],
            selects:[]
        }
    },
    mounted(){
        document.title='收藏店铺';
        this.fetchdata(this.$route.query.orderid);
    },
    methods: {
        fetchdata(){
            var _this=this;
            this.$http.get('/static/shoplist.json').then(function(res){
                _this.shoplist = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        showedit(){
            this.showedit=!this.showedit;
        },
        handle(id,indexnum){
            let index=this.selectid.indexOf(id);
            console.log(index);
            if(index==-1){
                this.selectid.push(id);
                this.select.push(indexnum);
            }else{
                console.log("slice");
                this.selectid.splice(index,1);
                this.select.splice(index,1);
            }
            console.log(this.select);
        },
        deletenum(){
            this.selects=this.select.slice(0);
            
        }
    },
    components: {
        Backnav
    }
}
</script>

<style>
.shoplist {overflow: hidden}
.shoplist ul li{margin: 3px 0 5px 0;background-color: #fff;padding: 5px 5px;}
.shoplist ul li img{width: 60px;height: 60px;}
.shoplist .el-checkbox{padding-top: 10px;padding-right: 10px;}
.shoplist .des{text-overflow: ellipsis;white-space: nowrap;overflow: hidden}
</style>
