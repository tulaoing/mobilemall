<template>
     <div class="myinfo">
        <Backnav title="我的店铺"></Backnav>
        <div class="myinfoheader" style="background-color: #83BC0D;margin-top:-4px;">
            <img :src="shopinfo.imgurl">
            <span class="pull-left">{{shopinfo.name}}</span>
            <span class="pull-right"><a href="/myshop/settings">设置</a></span>
        </div>
        <div class="addressbtn"><a :href="'/shop/'+shopinfo.shopid">店铺链接<span class="el-icon-arrow-right" style="margin-left:5px;font-size:13px;"></span></a></div>
        <div style="padding:5px 0;">
            <h4 class="addressbtn"><a href="/shoporder">店铺订单</a></h4>
            <div class="orderstate">
                <ul>
                    <li>
                        <a href="/shoporder?type=2">
                            <el-badge :value="shopinfo.unpaidnum" class="item">
                                <el-button size="small"><span class="icon icon-unpaid"></span></el-button>
                            </el-badge>
                            <span>待付款</span>
                        </a>
                    </li>
                    <li>
                        <a href="/shoporder?type=3">
                            <el-badge :value="shopinfo.paidnum" class="item">
                                <el-button size="small"><span class="icon icon-paid"></span></el-button>
                            </el-badge>
                            <span>待发货</span>
                        </a>
                    </li>
                    <li>
                        <a href="/shoporder?type=4">
                            <el-badge :value="shopinfo.deliverynum" class="item">
                                <el-button size="small"><span class="icon icon-logistics"></span></el-button>
                            </el-badge>
                            <span>待收货</span>
                        </a>
                    </li>
                    <li>
                        <a href="/shoporder?type=0">
                            <el-badge :value="shopinfo.sevicenum" class="item">
                                <el-button size="small"><span class="icon icon-service"></span></el-button>
                            </el-badge>
                            <span>退款/售后</span>
                        </a>
                    </li>
                </ul>
            </div>   
        </div>
        <div style="padding: 5px 20px;">
            <div><span>好评率：</span><span>{{shopinfo.goodrate}}</span></div>
            <div class="ratelist">
                <span class="pull-left">描述相符：</span>
                <el-rate
                    v-model="shopinfo.scoredes"
                    disabled
                    show-text
                    text-color="#ff9900"
                    text-template="{value}">
                </el-rate>
            </div>
            <div class="ratelist">
                <span class="pull-left">服务态度：</span>
                <el-rate
                    v-model="shopinfo.scoresev"
                    disabled
                    show-text
                    text-color="#ff9900"
                    text-template="{value}">
                </el-rate>
            </div>
            <div class="ratelist">
                <span class="pull-left">物流服务：</span>
                <el-rate
                    v-model="shopinfo.scoreship"
                    disabled
                    show-text
                    text-color="#ff9900"
                    text-template="{value}">
                </el-rate>
            </div>
        </div>
    </div>   
</template>

<script>
import Backnav from '../common/Backnav.vue'
import Homebottom from '../common/Homebottom.vue'
export default {
    data(){
        return{
            shopinfo:{},
            Homebottom
        }
    },
    mounted() {
        document.title='我的店铺';
        this.fetchdata()
    },
    methods:{
        fetchdata(){
            let _this=this;
            this.$http.get('/static/shop.json').then(function(res){
                _this.shopinfo = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
            
        },
        logout(){
            this.$store.dispatch('Logout');
            window.location.href="/login";
        }
    },
    components: {
        Backnav,
        Homebottom
    }
}
</script>

<style>
.ratelist{clear: both;overflow: hidden;margin: 5px 0;}
.ratelist .el-rate{float: left}
</style>
