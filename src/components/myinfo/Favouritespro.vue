<template>
    <div>
        <Backnav title="收藏产品"></Backnav>
        <div class="floattopright" v-on:click="showedit=!showedit" v-if="!showedit">编辑</div>
        <div class="floattopright" v-on:click="showedit=!showedit" v-if="showedit">完成</div>
        <div class="horizontallist paddinglr">
            <div v-if="productlist.length==0||productlist.length==selectc.length" class="gray text-center" style="margin:20px;">您还没有收藏产品...</div>
            <ul>
                <li v-for="(item,index) in productlist" v-if="selectc.indexOf(index)==-1">
                    <a :href="'/'+item.id">
                        <div class="displayflex">
                            <el-checkbox v-if="showedit" @change="handle(item.id,index)"></el-checkbox>
                            <img :src="item.imgurl">
                            <div class="flex1 paddinglr">
                                <h5>{{item.name}}</h5>
                                <p class="red">￥{{item.price}}</p>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="floatbottombtn"  v-if="showedit" @click="deletenum()">删除</div>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'

export default {
    data(){
        return{
            productlist:[],
            showedit:false,
            selectid:[],
            select:[],
            selectc:[]
        }
    },
    mounted(){
        document.title='收藏夹';
        this.fetchdata(this.$route.query.orderid);
    },
    methods: {
        fetchdata(){
            var _this=this;
            this.$http.get('/static/product.json').then(function(res){
                _this.productlist = res.data; 
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
            console.log(this.selectc);
        },
        deletenum(){
            this.selectc=this.select.slice(0);
        }

    },
    components: {
        Backnav
    }
}
</script>

<style>
.horizontallist ul{background-color: #fff;overflow: hidden}
.horizontallist ul li{margin: 5px 0;}
.horizontallist ul li img{width: 100px;height: 100px;}
.floattopright{position: absolute;top: 5px;right: 20px;}
.horizontallist .el-checkbox{padding-top: 30px;padding-right: 10px;}
</style>
