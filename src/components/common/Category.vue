<template>
    <div>
        <ul class="cateul">
            <li v-for='item in catearr'><a :href="item.url"><i :class="'category-'+item.categoryeng"></i>{{item.category}}</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['catearr']
}
</script>

<style>
.cateul{overflow: hidden;background-color: #fff;padding-top: 10px;}
.cateul li{width: 19%;margin: 0.5%;float: left;text-align: center;padding-left: 3%;padding-right: 3%;}
.cateul li i{width: 100%;padding-bottom:90%;display: block;background-position:center center;background-size: cover;margin-left: auto;margin-right: auto}
.category-fruit{background-image: url(../../assets/img/category-fruit.png);}
.category-vegetable{background-image: url(../../assets/img/category-vegetable.png);}
.category-nut{background-image: url(../../assets/img/category-nut.png);}
.category-drinks{background-image: url(../../assets/img/category-drinks.png);}
.category-grain{background-image: url(../../assets/img/category-grain.png);}
</style>
