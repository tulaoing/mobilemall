<template>
    <div>
        <div class="shopnav">
        <ul>
            <li class="active" @click="changepage(1)">店铺首页</li>
            <li @click="changepage(2)">全部宝贝</li>
            <li @click="changepage(3)">新品上架</li>
        </ul>
    </div>
    <div class="ranknav" v-if="index==2">
        <ul>
            <li class="active2" @click="changerank(1)">综合</li>
            <li @click="changerank(2)">销量</li>
            <li @click="changerank(3)">新品</li>
            <li @click="changerank(4)">价格<span class="el-icon-caret-top"></span><span class="el-icon-caret-bottom"></span></li>
        </ul>
    </div>
    <Productlist v-bind:productarr="productarr"></Productlist>
    </div> 
</template>

<script>
import Headerbg from './Headerbg.vue'
export default {
    props:['productarr'],
    data(){
        return{

        }
    },
    component
}
</script>

<style>

</style>
