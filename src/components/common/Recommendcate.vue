<template>
    <div class="recommendcate">
        <ul>
            <li v-for='item in reccatearr'><a :href="item.url"><img :src="item.img"></a></li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['reccatearr']
}
</script>

<style>
.recommendcate ul{overflow: hidden;background-color: #fff}
.recommendcate ul li{width: 25%;float: left;text-align: center;overflow: hidden}
.recommendcate ul li img{width: 100%;}
</style>
