<template>
    <div>
        <Headerview></Headerview>
        <div class="cateslider">
            <swipe class="my-swipe">
                <swipe-item class="slide1">
                    <img src="../../assets/homebanner2.jpg">
                </swipe-item>
                <swipe-item class="slide2">
                    <img src="../../assets/homebanner2.jpg">
                </swipe-item>
                <swipe-item class="slide3">
                    <img src="../../assets/homebanner2.jpg">
                </swipe-item>
            </swipe>
        </div>
        <category v-bind:catearr="catearr"></category>
        <recommendcate v-bind:reccatearr="reccatearr"></recommendcate>
        <!--<scroller :on-infinite="infinite" ref="my_scroller">
            <div style="height: 837px;"></div>
            <Productlist v-bind:productarr="productarr"></Productlist>
        </scroller>-->
        <Productlist v-bind:productarr="productarr"></Productlist>
        <div @click="loadmore()" class="loadmore">{{loadmoreword}}</div>
        <div style="height:45px;"></div>
        <Homebottom></Homebottom>
    </div>
</template>

<script>
import Category from '../common/Category.vue'
import Headerview from '../common/Header.vue'
import Homebottom from '../common/Homebottom.vue'
import Productlist from '../common/Productlist.vue'
import Recommendcate from '../common/Recommendcate.vue'
export default {
    components: {
        Category,
        Headerview,
        Homebottom,
        Recommendcate,
        Productlist,
    },
    data () {
        return{
            productarr:[],
            catearr:[],
            max:100,
            reccatearr:[],
            loadmoreword:'点击加载更多',
            isload:1,
            time:''
        }
    },
    mounted () {
        this.fetchdata();
    },
    created () {
        window.addEventListener('scroll', this.get);
    },
    destroyed () {
        window.removeEventListener('scroll', this.get);
    },
    methods: {
       fetchdata(){
            var _this=this;
            this.$http.get('/static/product.json').then(function(res){
                _this.productarr = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
            this.$http.get('/static/category.json').then(function(res){
                _this.catearr = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
            this.$http.get('/static/reccate.json').then(function(res){
                _this.reccatearr = res.data;
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        loadmore(){
            console.log('loadmore');
            if (this.productarr.length<this.max) {
                var _this=this;
                this.$http.get('/static/product.json').then(function(res){
                    _this.productarr = _this.productarr.concat(res.data);
                    if (_this.productarr.length>=_this.max){
                        _this.loadmoreword='没有更多了';
                        _this.isload=0;
                    }
                }).catch(function(err){
                    console.log("err" + err);
                });
            }
            
        },
        get(){
            var theight=document.body.scrollHeight;
            var wheight=window.screen.availHeight;
            var stop=document.body.scrollTop;
            if(theight<=wheight+stop){
                if(this.isload==1){
                    this.loadmore();
                }
            }
        }
    }
}
</script>

<style>
.productul li{width: 48%;margin: 1%;float: left}
.productul li img{width: 100%;}
.onelineword{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.shoppingcart{color: #83BC0D;margin-right: 10px;font-size: 16px;}
.price{color: red;margin-left: 5px;}
.loadmore{text-align: center;font-size: 15px;color: #aaa}
</style>
