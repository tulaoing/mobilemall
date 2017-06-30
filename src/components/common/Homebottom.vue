<template>
    <div class="homebottomfixed">
        <ul>
            <li>
                <a href="/">
                    <span class="icon icon-wxbhome"></span>
                    <span>首页</span>
                </a>
            </li>
            <li>
                <a href="/shoppingcart">
                    <span class="icon icon-shopcart"></span>
                    <span>购物车</span>
                </a>
            </li>
            <li>
                <a href="/my">
                    <span class="icon icon-me"></span>
                    <span>我的</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return{
        }
    },
}
</script>

<style>
.homebottomfixed{width: 100%;position: fixed;bottom: 0;background-color: #fff;height: 40px;border-top: 1px solid #E7E7E7;z-index: 999;}
.homebottomfixed ul li{width: 33.3%;float: left;text-align: center}
.homebottomfixed ul li span{display: block;line-height: 17px;}
.homebottomfixed ul li .icon{font-size: 18px;margin-top: 5px;}

</style>

