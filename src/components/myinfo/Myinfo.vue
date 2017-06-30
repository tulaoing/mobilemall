<template>
  <div class="myinfo">
    <div class="myinfoheader" style="background-color: #83BC0D;margin-bottom:0">
        <img :src="myinfo.imgurl">
        <span class="pull-left">{{myinfo.username}}</span>
        <span class="pull-right"><a @click="open2">退出</a></span>
        <span class="pull-right"><a href="/my/settings">设置</a></span>
    </div>
    <!--用户信息-->
    <div class="showfavourites">
        <div>
            <a href="/my/favouritespro">
                <span>{{myinfo.productfavouritesnum}}</span>
                <span>收藏夹</span>
            </a>
        </div>
        <div>
            <a href="/my/favouritesshop">
                <span>{{myinfo.shopfavouritesnum}}</span>
                <span>收藏店铺</span>
            </a>
        </div>
    </div>
    <div class="addressbtn">
        <a href="/my/message">
            我的消息<span v-if="myinfo.message!=0" class="red little">({{myinfo.message}})</span>
            <span class="el-icon-arrow-right" style="margin-left:10px;"></span>
        </a>
    </div>
    <div class="addressbtn"><a href="/my/address">我的收货地址<span class="el-icon-arrow-right" style="margin-left:10px;"></span></a></div>
    <div class="addressbtn" v-if="myinfo.shop==1"><a href="/myshop">我的店铺<span class="el-icon-arrow-right" style="margin-left:10px;"></span></a></div>
    <div class="orderstate">
        <h4><a href="/myorder">我的订单</a></h4>
        <div>
            <ul>
                <li>
                    <a href="/myorder?type=2">
                        <el-badge :value="myinfo.unpaidnum" class="item">
                            <el-button size="small"><span class="icon icon-unpaid"></span></el-button>
                        </el-badge>
                        <span>待付款</span>
                    </a>
                </li>
                <li>
                    <a href="/myorder?type=3">
                        <el-badge :value="myinfo.paidnum" class="item">
                            <el-button size="small"><span class="icon icon-paid"></span></el-button>
                        </el-badge>
                        <span>待发货</span>
                    </a>
                </li>
                <li>
                    <a href="/myorder?type=4">
                        <el-badge :value="myinfo.deliverynum" class="item">
                            <el-button size="small"><span class="icon icon-wuliu"></span></el-button>
                        </el-badge>
                        <span>待收货</span>
                    </a>
                </li>
                <li>
                    <a href="/myorder?type=0">
                        <el-badge :value="myinfo.sevicenum" class="item">
                            <el-button size="small"><span class="icon icon-service"></span></el-button>
                        </el-badge>
                        <span>退款/售后</span>
                    </a>
                </li>
            </ul>
        </div>     
    </div>
    <Homebottom></Homebottom>
  </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
import Homebottom from '../common/Homebottom.vue'
export default {
    data(){
        return{
            myinfo:{},
            Homebottom
        }
    },
    mounted() {
        document.title='我的';
        this.fetchdata()
    },
    methods:{
        fetchdata(){
            let _this=this;
            this.$http.get('/static/myinfo.json').then(function(res){
                _this.myinfo = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
            
        },
        logout(){
            this.$store.dispatch('Logout');
            window.location.href="/login";
        },
        open2() {
            this.$confirm('是否退出', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
                //type: 'warning'
            }).then(() => {
                //console.log("ok");
                //sessionStorage.loginname
                console.log(sessionStorage.loginname);
                //sessionStorage.removeItem(loginname);
                sessionStorage.loginname='';
                console.log(sessionStorage.loginname);
                window.location.href="/login";
            }).catch(() => {        
            });
        }
    },
    components: {
        Backnav,
        Homebottom
    }
}
</script>

<style>
.myinfo{background-color: #f0f0f0;}
.myinfo>div{margin-bottom: 5px;background-color: #fff;}
.myinfoheader{color: #fff;font-size: 15px;overflow: hidden}
.myinfoheader a{color: #fff;}
.myinfoheader img{width: 60px;height: 60px;border-radius: 30px;border: 2px solid #fff;margin: 10px;float: left}
.myinfoheader span{margin-top: 30px;margin-left: 10px;margin-right: 20px;}
.showfavourites{overflow: hidden}
.showfavourites>div{width: 50%;text-align: center;float: left;background-color: #fff;}
.showfavourites>div span{display: block}
.orderstate{padding: 0 0 5px 0;}
.orderstate h4{padding: 5px 20px 10px 20px;}
.orderstate ul{overflow: hidden;padding-top: 10px;}
.orderstate ul li{width: 25%;float: left;text-align: center}
.orderstate span{display: block}
.orderstate .icon{font-size: 20px;}
.myinfo{min-height: 100%;}
.addressbtn{padding: 5px 20px;}
.myinfo .icon-wuliu{font-size: 23px;}
</style>
