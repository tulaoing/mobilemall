<template>
    <div class="buyerinfo">
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
        <div class="addressbtn"><a href="/my/address">我的收货地址<span class="el-icon-arrow-right" style="margin-left:10px;"></span></a></div>
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
                                <el-button size="small"><span class="icon icon-logistics"></span></el-button>
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
import Homebottom from '../common/Homebottom.vue'
export default {
    props:['myinfo'],
    components: {
        Homebottom
    }
}
</script>

<style>

</style>
