<template>
  <div>
      <div class="searchshoplist">
            <ul>
                <li v-for="(item,index) in shoplist" class="paddinglr">
                    <div class="shopre">
                        <div class="displayflex">
                            
                            <img :src="item.imgurl" class="shopicon">
                            <div class="flex1 paddinglr">
                                <h5>{{item.name}}</h5>
                                <div class="gray des"><span>销量 {{item.sales}} </span> <span> 共 {{item.productnum}} 件宝贝</span></div>
                            </div>
                            <div class="enterbtn">进店</div>
                        </div>
                        <div style="clear:both;"></div>
                        <div>
                            <ul class="threeblock">
                                <li v-for="smallitem in item.product">
                                    <a :href="'/' + smallitem.id">
                                        <img :src="smallitem.imgurl">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>

export default {
    props:['shoplist'],

}
</script>

<style scoped>
.shopicon{
    width: 40px;
    height: 40px;
    margin-top: 10px;
}
.searchshoplist h5{font-size: 14px;line-height: 20px;margin-top: 10px;}
.enterbtn{width: 70px;margin-top: 15px;font-size: 12px;border: 1px solid #83BC0D;text-align: center;line-height: 25px;height: 25px;border-radius: 12.5px;}
.des{line-height: 15px;}
.des span{font-size: 6px;line-height: 10px;}
.searchshoplist>ul>li{margin-bottom: 10px;}
.threeblock{overflow: hidden}
.threeblock li{width: 33.3%;float: left}
.threeblock li img{width: 100%;padding: 5px;}
</style>
