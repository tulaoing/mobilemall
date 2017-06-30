<template>
    <div>  
        <div style="clear:both"></div>
        <div  v-if="productarr.length==0" class="notmatcherror">
            <p v-if="jsonb.search">没有找到与“{{jsonb.search}}”相关的产品</p>
            <p v-if="jsonb.search">换个关键词试试</p>
        </div>
        <div class="ranknav" v-if="productarr.length!=0">
            <ul>
                <li v-bind:class="{active2:(index2==1)}" @click="changerank(1)">综合</li>
                <li @click="changerank(2)" v-bind:class="{active2:(index2==2)}">销量</li>
                <li @click="changerank(3)"  v-bind:class="{active2:(index2==3)}">新品</li>
                <li @click="changerank(4)" v-bind:class="{active2:(index2==4)}">价格<span class="el-icon-caret-top" v-bind:class="{active2:(index2==4&&flag==true)}"></span><span class="el-icon-caret-bottom" v-bind:class="{active2:(index2==4&&flag==false)}"></span></li>
            </ul>
        </div>
        <Productlist v-bind:productarr="productarr"></Productlist>
        <p class="text-center gray" style="background-color:#fff;font-style:italic;margin-top:50px;"  v-if="productarr.length==0">您可能喜欢...</p>
        <Productlist v-bind:productarr="recommend"  v-if="productarr.length==0"></Productlist>
    </div> 
</template>

<script>

import Productlist from './Productlist.vue'

export default {
    props:['jsons'],
    data(){
        return{
            productarr:[],
            index2:1,
            flag:true,
            jsonb:{},
            recommend:[]
        }
    },
    components:{
        Productlist
    },
    mounted () {
        console.log(this.jsons);
        //this.jsonb=JSON.parse(this.jsons);
        // console.log(this.jsonb.search);
        // console.log(this.jsonb.shopid);
        //console.log(this.jsonb.categoryid);
        this.fetchdata();
    },
    methods: {
        fetchdata(){
            var _this=this;
            this.$http.get('/static/product.json').then(function(res){
                _this.productarr = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
            if(this.productarr.length==0){
                this.$http.get('/static/product.json').then(function(res){
                    _this.recommend = res.data; 
                }).catch(function(err){
                    console.log("err" + err);
                });
            }
        },
        changerank(m){
            var _this=this;
            if(m==1){
                this.index2=1;
                this.$http.get('/static/product3.json').then(function(res){
                    _this.productarr = res.data; 
                }).catch(function(err){
                    console.log("err" + err);
                });
            }
            if(m==2){
                this.index2=2;
                this.$http.get('/static/product.json').then(function(res){
                    _this.productarr = res.data; 
                }).catch(function(err){
                    console.log("err" + err);
                });
            }
            if(m==3){
                this.index2=3;
                this.$http.get('/static/product.json').then(function(res){
                    _this.productarr = res.data; 
                }).catch(function(err){
                    console.log("err" + err);
                });
            }
            if(m==4){
                if(this.index2=4){
                    this.flag=!this.flag;
                }
                this.index2=4;
                if(this.flag==true){
                    this.$http.get('/static/product2.json').then(function(res){
                        _this.productarr = res.data; 
                    }).catch(function(err){
                        console.log("err" + err);
                    });
                }else{
                    this.$http.get('/static/product.json').then(function(res){
                        _this.productarr = res.data; 
                    }).catch(function(err){
                        console.log("err" + err);
                    });
                }
            }
        }
    }
}
</script>

<style>
.ranknav{background-color: #fff;}
.ranknav ul .active2{color:#83BC0D}
.notmatcherror{padding: 80px 0;text-align: center;background-color: #fff;}
</style>
