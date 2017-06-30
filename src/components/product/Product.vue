<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <Notfound v-if="productData.mes==-1"></Notfound>
        <div class="productpage" v-bind:class="{height100:isselected}" v-on:click="boxhidden()"  v-if="productData.mes!=-1">
            <div class="floatbacknav">
                <span class="el-icon-arrow-left backbg pull-left" @click="goback()"></span>
                <a href="/shoppingcart"><span class="icon-shopcart cartbg pull-right"></span></a>
            </div>
            <div class="productslider">
                <swipe class="my-swipe" :speed="speed">
                    <swipe-item v-for="(item,index) in productData.img" :key="item.index">
                        <img :src="productData.img[index]">
                    </swipe-item>
                </swipe>
            </div>
            <h3 class="producttitle">{{productData.name}}</h3>
            <h3 class="productprice pull-left" v-if="productData.discountprice" style="padding-right:0">￥{{productData.discountprice}}</h3>
            <h3 class="pull-left paddinglr red" v-bind:class="[linethrough]">￥{{productData.price}}</h3>
            <div class="extra clearfix">
                <span class="text-left" v-if="productData.fees==0">免运费</span>
                <span class="text-left" v-if="productData.fees!=0">{{productData.feep}}</span>
                <span class="text-center">月售{{productData.sales}}件</span>
                <span class="text-right">{{productData.location}}</span>
            </div>
            
            <div class="shopbox">
                <a :href="'/shop/' + productData.shopid">
                    <div>
                        <div class="shopname">
                            <span class="icon-shop"></span>
                            <span>{{productData.shopname}}</span>
                        </div>
                        <span class="viewbtn pull-right">进店看看</span>
                    </div>
                </a>
            </div>
            <div class="clearfix"></div>
            
            <div class="maincontent">
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="宝贝详情" name="first" v-html="productData.description">
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="second">
                        <ul class="attrul">
                            <li v-for="(item,index) in productData.des" class="displayflex"><span class="listkey">{{index}}:</span><span class="listvalue flex1">{{item}}</span></li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="评论" name="third" tab-click="loadcomment" v-loading="loadingcomment" element-loading-text="拼命加载中">
                        <div v-if="this.comments.length==0">暂无评论</div>
                        <ul class="commentsul">
                            <li v-for="item in comments">
                                <div><span class="icon-me iconuser"></span>{{item.name}}</div>
                                <div>{{item.content}}</div>
                                <div class="text-right timeshow">{{item.date}}</div>
                            </li>
                        </ul>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="clearfix text-center darkgray">相关推荐</div>
            <Productlist v-bind:productarr="productData.related"></Productlist>
            <div class="profixbottom">
                <ul class="displayflex">
                    <li style="width:16.6%;padding-top:5px;"  @click="dialogVisible = true">
                        <span class="icon-servie3 bootomicon"></span>
                        <div>客服</div>
                    </li>
                    <li style="width:16.6%;padding-top:5px;">
                        <a :href="'/shop/' + productData.shopid">
                            <span class="icon-shop bootomicon"></span>
                            <div>店铺</div>
                        </a>
                    </li>
                    <li style="width:16.6%;padding-top:5px;" @click="addcollection()">
                        <span class="bootomicon" :class="{'icon-collection':!liked,'icon-collection2':liked,'green':liked}" ></span>
                        <div v-if="!liked">收藏</div>
                        <div v-if="liked">已收藏</div>
                    </li>
                    <li class="buybtn" v-on:click.stop="showbox()">加入购物车</li>
                    <li class="buybtn" v-on:click.stop="showbox()">立即购买</li>
                </ul>
            </div>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                size="large" class="dialogmessage">
                <p>请添加社交账号联系店铺</p>
                <p>QQ：{{productData.qq}}</p>
                <p>微信：{{productData.weixin}}</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
            <div class="selectattr" v-if="isselected==true" v-on:click.stop=''>
                <div style="overflow:hidden">
                    <div class="pull-left">
                        <img :src="productData.img[1]" class="thumbnailbig">
                    </div>
                    <div class="pull-left" style="margin-top:20px;">
                        <div class="red paddinglr">￥{{cateprice}}</div>
                        <div class="paddinglr">库存{{catestock}}件</div>
                    </div>
                </div>
                <ul class="clearfix" style="margin-top:25px;overflow:hidden;">
                    <li v-for="(item,index) in productData.attr" v-bind:class="{chooseitem:item.stock!=0,unchooseitem:item.stock==0,chooseactive:index==chooseattr}" @click="choose(index)">{{item.name}}</li>
                </ul>
                <div class="amoutbox">
                    <span class="pull-left amounttitle">购买数量</span>
                    <el-input-number v-model="amount" @change="handleChange" :min="1" :max="parseInt(productData.stock)" class="pull-right"></el-input-number>
                </div>
                <div class="pbuybtn">
                    <div v-on:click="addcart()">加入购物车</div>
                    <div v-on:click="buy()">购买</div>
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
import Notfound from '../Notfound.vue'
import Productlist from '../common/Productlist.vue'
export default {
    
    data () {
        return{
            productData:{},
            relatedProData:[],
            liked:false,
            speed:1000,
            addshow:false,
            amount: 1,
            decreaseflag: false,
            increaseflag: true,
            comments:[],
            activeName2: 'first',
            linethrough:"",
            isselected:false,
            chooseattr:-1,
            cateprice:'',
            catestock:'',
            dialogVisible:false,
            fullscreenLoading: true,
            loadingcomment:true
        }
    },

    created () {
        this.fetchproductData(this.$route.params.id);
        
    },
    watch:{
        // $route(to){
        //     //console.log(to);
        //     var reg=/\d+/;
        //     if(reg.test(to.path)){
        //         var Id=this.$route.params.id || 0;
        //         this.fetchproductData(Id);
        //     }
        // }
    },
    components:{
        Productlist,
        Notfound
    },
    methods: {
       fetchproductData(Id){
            var _this=this;
            this.$http.get('/static/productData.json').then(function(res){
                _this.productData = res.data; 
                document.title=res.data.name;
                //_this.productData.mes=-1;
                if(_this.productData.discountprice){
                    _this.linethrough="linethrough little gray";
                }
                _this.cateprice=res.data.price;
                _this.catestock=res.data.stock;
                _this.fullscreenLoading=false;
            }).catch(function(err){
                console.log("err" + err);
            });

        },
        goback(){
            this.$router.go(-1);
        },
        addcollection(){
            this.liked = !this.liked;
        },
        handleClick(tab, event) {
            if(tab.name=="third"){
                this.loadcomment();
            }
        },
        showbox(id,num){
            this.isselected=true;
            var wheight=window.screen.availHeight;
            document.querySelector('body').style.height=wheight+'px';
            document.querySelector('body').style.overflow='hidden';
            // console.log(id);
            // console.log(num);
        },
        addcart(){
            if(this.chooseattr==-1){
                let toast = this.$toasted.show("请选择产品属性", { 
                    theme: "primary", 
                    position: "top-center", 
                    duration : 1000
                });
                return false
            }
             let toast = this.$toasted.show("加入成功", { 
                theme: "primary", 
                position: "top-center", 
                duration : 1000
            });
        },
        buy(){
            var json=[{
                shopid:this.productData.shopid,
                shopname:this.productData.shopname,
                product:[{
                    productid:this.productData.id,
                    productname:this.productData.name,
                    imgurl:this.productData.img[0],
                    attr:this.productData.attr[this.chooseattr].name,
                    price:this.cateprice,
                    num:this.amount
                }]
            }]
            sessionStorage.data=JSON.stringify(json);
            console.log(sessionStorage.data);
            window.location.href="/submit"
        },
        loadcomment(){
            var _this=this;
            this.$http.get('/static/comment.json').then(function(res){
                _this.comments = res.data; 
                _this.loadingcomment= false;
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        handleChange(value) {
            //console.log(value);
        },
        choose(index){
            if(this.productData.attr[index].stock==0){
                return false;
            }
            this.chooseattr=index;
            this.cateprice=this.productData.attr[index].price;
            this.catestock=this.productData.attr[index].stock;
        },
        boxhidden(){
            if(this.isselected){
                this.isselected=false;
                var wheight=window.screen.availHeight;
                //document.querySelector('body').style.height=wheight+'px';
                document.querySelector('body').style.overflow='auto';
            }
        },
        handleClose(done) {
            
        }
    }
}
</script>

<style>
.productslider{height: 260px;}
.productslider img{max-width: 100%;max-height: 100%;position: absolute;left: 50%;top: 50%;transform: translateY(-50%) translateX(-50%);}
.producttitle,.productprice{padding: 0 10px;}
.productprice{color: red;font-size: 16px;}
.extra{padding: 0 10px;overflow: hidden}
.extra span{font-size: 12px;color: #aaa;width: 33%;display: block;float: left;}
.maincontent{padding: 0 10px;}
.maincontent img{max-width: 100%;}
.listkey{width: 120px;display: block;float: left;}
.listvalue{display: block;float: left;}
.attrul{padding: 10px;}
.attrul li{border-bottom: 1px solid #ccc;height: 34px;padding-left: 5px;}
.attrul li span{line-height: 34px;}
.backbg,.cartbg{background-color: rgba(0, 0, 0, .5);color: #fff;border-radius: 18px;margin: 15px 15px;font-size: 16px;padding: 10px;}
.profixbottom{height: 48px;text-align: center;border: 1px solid #ccc;box-shadow: 1px 1px 2px #ccc;position: fixed;bottom: 0;width: 100%;background-color:#fff;z-index:999}
.profixbottom ul li div{line-height: 15px;}
.profixbottom ul li{height: 100%;}
.profixbottom ul li{border-right: 1px solid #ccc;height: 50px;;}
.profixbottom span{font-size: 20px;margin-top: 3px;}
.buybtn{width: 25%;line-height: 50px;background-color: #83BC0D;color:#fff;}
.green{color: #83BC0D}
.nav-tabs li{width: 33.3%;text-align: center}
.choosewrap{position: fixed;z-index: 1000;background-color: rgba(0, 0, 0, .6);width: 100%;height: 100%;top: 0;bottom: 0;padding-top: 60%;}
.choosebox{background-color: #fff;padding: 10px 10px 0 10px;height: 100%;}
.choosebox ul{overflow: hidden}
.choosebox ul li{float: left;padding: 2px 10px;border: 1px solid #ccc;margin: 5px 10px 5px 0;}
.amoutbox{clear: both;margin: 20px 10px;overflow: hidden;padding: 10px 10px;margin-top: 30px;}
.amounttitle{font-size: 16px;margin-right: 20px;}
.timeshow{color: #999;font-size: 12px;}
.iconuser{margin-right: 10px;}
.commentsul{padding: 10px 10px;}
.commentsul li{border-bottom: 1px dashed #eee}
.viewbtn{padding: 5px 10px;border-radius: 5px;border: 1px solid #83BC0D}
.shopbox{padding-left: 10px;padding-right: 10px;background-color: #f0f0f0;overflow: hidden;padding: 10px 15px;margin-bottom: 10px;}
.shopname span{line-height: 35px;float: left}
.el-tabs__item.is-active{color: #83BC0D!important}
.productpage{background-color: #fff;}
.linethrough{text-decoration: line-through;}
.amoutbox .el-input-number .el-input__inner{padding-left: 0;padding-right: 0;text-align: center;width: 40px;}
.amoutbox .el-input-number__decrease{left: -35px;}
.amoutbox .el-input-number{width: 80px;}
.amoutbox .el-input-number__decrease,.amoutbox .el-input-number__increase{border-left: none;}
.selectattr{position: fixed;bottom: 0;height: 500px;background-color: #fff;width: 100%;z-index:9999999999999;padding: 10px 20px;box-shadow: 1px -1px 1px #eee;}
.thumbnailbig{width: 100px;height: auto;}
.chooseitem{padding: 2px 20px;background-color: #eee;color:#444;float: left;margin-right: 10px;border-radius:5px;}
.unchooseitem{padding: 2px 20px;background-color: #f0f0f0;color:#aaa;float: left;margin-right: 10px;border-radius:5px;}
.chooseactive{background-color: #83BC0D;color: #fff;}
.pbuybtn{position: fixed;width: 100%;bottom: 0;left: 0;}
.pbuybtn>div{background-color: #83BC0D;color:#fff;width: 50%;float: left;text-align: center;height: 40px;line-height: 40px;border-right: 1px solid #fff;}
.pbuybtn>div:last-child{border-right: none;}
.dialogmessage p{line-height: 25px;}
</style>