<template>
    <div>
        <Notfound v-if="shopdata.mes==-1"></Notfound>
        <div style="margin-bottom:45px;"  v-if="shopdata.mes!=-1">
            <div class="shopheader">
                <Shopheader v-bind:shopid="this.$route.params.shopid"></Shopheader>
                <div class="shopdes">
                    <span class="icon-shop pull-left" style="margin-top: 5px;margin-right:5px;"></span>
                    <span class="pull-left">{{shopdata.name}}</span>
                    <span class="pull-right" v-if="!liked" @click="addcollection()">收藏</span>
                    <span class="pull-right" v-if="liked" @click="addcollection()">已收藏</span>
                    <span class="collecticon pull-right" :class="{'icon-collection':!liked,'icon-collection2':liked,'white':liked}"  @click="addcollection()"></span>
                </div>
            </div>
            <div class="shopnav">
                <ul>
                    <li v-bind:class="{active:(index==1)}" @click="changepage(1)">店铺首页</li>
                    <li @click="changepage(2)" v-bind:class="{active:(index==2)}">全部宝贝</li>
                    <li @click="changepage(3)" v-bind:class="{active:(index==3)}">新品上架</li>
                </ul>
            </div>
            <div class="ranknav" v-if="index==2">
                <ul>
                    <li v-bind:class="{active:(index2==1)}" @click="changerank(1)">综合</li>
                    <li @click="changerank(2)" v-bind:class="{active:(index2==2)}">销量</li>
                    <li @click="changerank(3)" v-bind:class="{active:(index2==3)}">新品</li>
                    <li @click="changerank(4)" v-bind:class="{active:(index2==4)}">价格
                        <span class="el-icon-caret-top" v-bind:class="{active:(index2==4&&flag==true)}"></span>
                        <span class="el-icon-caret-bottom" v-bind:class="{active:(index2==4&&flag==false)}"></span>
                    </li>
                </ul>
            </div>
            <Productlist v-bind:productarr="productarr" v-loading="loadingproduct"></Productlist>
            <div class="shopbottomfloat">
                <ul>
                    <ul>
                        <li><a :href="this.$route.path + '/category'">宝贝分类</a></li>
                        <li><a :href="this.$route.path + '/shopdescription'">店铺简介</a></li>
                        <li><a :href="this.$route.path + '/contact'">联系卖家</a></li>
                    </ul>
                </ul>
            </div>
        </div>
    </div>
    
</template>
<script>
import Notfound from '../Notfound.vue'
import Shopheader from './Shopheader.vue'
import Backnav from '../common/Backnav.vue'
import Productlist from '../common/Productlist.vue'
export default {
    components: {
        Backnav,
        Shopheader,
        Productlist,
        Notfound
    },
    data () {
        return{
            productarr:[],
            shopdata:{},
            liked: false,
            msg: 123,
            index: 1,
            index2: 1,
            flag:true,
            loadingproduct:true
        }
    },
    mounted () {
        this.fetchdata();
        $('.shopheader').css('background-image','url(/static/img/shopbg.jpg)');
    },
    methods: {
       fetchdata(){
            var _this=this;
            this.$http.get('../static/shop.json').then(function(res){
                _this.shopdata = res.data; 
                document.title=res.data.name;
                //_this.shopdata.mes=-1;
            }).catch(function(err){
                console.log("err" + err);
            });
            this.changepage(1);
            // this.$http.post('/mock/news/all', {type:"123"})
            // .then(function (res) {
            //     console.log(res.data);
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
        },
        addcollection(){
            this.liked = !this.liked;
        },
        changepage(n){
            this.loadingproduct=true;
            var _this=this;
            if(n==1){
                this.index=1;
                this.$http.get('../static/product.json').then(function(res){
                    _this.productarr = res.data; 
                    _this.loadingproduct=false;
                }).catch(function(err){
                    console.log("err" + err);
                });
            }
            if(n==2){
                this.index=2;
                this.$http.get('../static/product2.json').then(function(res){
                    _this.productarr = res.data; 
                    _this.loadingproduct=false;
                }).catch(function(err){
                    console.log("err" + err);
                });
            }
            if(n==3){
                this.index=3;
                this.$http.get('../static/product3.json').then(function(res){
                    _this.productarr = res.data; 
                    _this.loadingproduct=false;
                }).catch(function(err){
                    console.log("err" + err);
                });
            }
        },
        changerank(m){
            var _this=this;
            if(m==1){
                this.index2=1;
                this.$http.get('../static/product3.json').then(function(res){
                    _this.productarr = res.data; 
                    _this.loadingproduct=false;
                }).catch(function(err){
                    console.log("err" + err);
                });
            }
            if(m==2){
                this.index2=2;
                this.$http.get('../static/product.json').then(function(res){
                    _this.productarr = res.data; 
                    _this.loadingproduct=false;
                }).catch(function(err){
                    console.log("err" + err);
                });
            }
            if(m==3){
                this.index2=3;
                this.$http.get('../static/product.json').then(function(res){
                    _this.productarr = res.data; 
                    _this.loadingproduct=false;
                }).catch(function(err){
                    console.log("err" + err);
                });
            }
            if(m==4){
                if(this.index2==4){
                    this.flag=!this.flag;
                }
                this.index2=4;
                
                if(this.flag==true){
                    this.$http.get('../static/product2.json').then(function(res){
                        _this.productarr = res.data; 
                        _this.loadingproduct=false;
                    }).catch(function(err){
                        console.log("err" + err);
                    });
                }else{
                    this.index2=4;
                    this.$http.get('../static/product.json').then(function(res){
                        _this.productarr = res.data; 
                        _this.loadingproduct=false;
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
.shopheader{height: 120px;background-position: center center;overflow: hidden}
.productul{overflow: hidden}
.shopdes{margin-top: 80px;color: #fff;padding: 5px 10px;}
.shopdes .collecticon{margin-top: 5px;margin-right: 10px;}
.white{color: #fff;}
.shopnav{overflow: hidden;background-color: #fafafa}
.shopnav ul li{width: 33%;text-align: center;line-height: 30px;float: left}
.ranknav ul{overflow: hidden}
.shopnav ul .active{border-bottom: 2px solid #83BC0D}
.ranknav ul li{width: 25%;text-align: center;float: left}
.ranknav ul .active{color:#83BC0D}
.ranknav .el-icon-caret-top, .ranknav .el-icon-caret-bottom{ font-size: 7px;color: #999;margin-left: 2px}
.shopbottomfloat{overflow: hidden;position: fixed;bottom: 0;height: 38px;width: 100%;background-color: rgba(256, 256, 256, .9);border-top: 1px solid #eee}
.shopbottomfloat ul li{width: 33%;float: left;border-right: 1px solid #999;text-align: center;line-height: 20px;margin-top: 10px;}
.shopbottomfloat ul li:last-child{border-right: none}
.shopbox .icon-shop{margin-right: 5px;}
</style>


