<template>
  <div>
    <Notfound v-if="shopcategory.mes==-1"></Notfound>
    <div v-if="shopcategory.mes!=-1">
        <Backnav title="店铺分类"></Backnav>
        <div class="productall"><a href="./products">全部宝贝</a></div>
        <ul class="shopcategory">
            <li v-for="item in shopcategory">
                <div><a :href="'./category/'+item.name">{{item.name}}</a></div>
                <ul>
                    <li v-for="smallitem in item.children">
                        <a :href="'./category/'+smallitem.name">{{smallitem.name}}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
import Notfound from '../Notfound.vue'
export default {
    data(){
        return {
            shopcategory:[]
        }
    },
    mounted() {
        this.fetchData();
        document.querySelector('body').style.background="#fff";
    },
    watch:{
	},
    methods: {
        fetchData(Id){
            var _this=this;
            console.log(0);
            this.$http.get('/static/shopcategory.json').then(function(res){
                _this.shopcategory = res.data; 
                document.title='店铺分类';
                //_this.shopcategory.mes = -1;
                console.log(res.data);
            }).catch(function(err){
                console.log("err" + err);
            });
        }
    },
    components: {
        Backnav,
        Notfound
    }
}
</script>

<style>
.shopcategory{padding: 10px 0;width: 100%;}
.shopcategory div{padding: 0 20px;}
.shopcategory>li{clear: both;margin-bottom: 10px;}
.shopcategory ul{width: 100%;overflow: hidden}
.shopcategory ul li{width: 46%;margin: 2%;background-color: #eee;height: 35px;padding-left: 4%;float: left;line-height: 35px;}
.shopcategory a{width: 100%;display: inline-block;}
.productall{padding-left: 15px;line-height: 35px;margin-top: 10px;}
</style>
