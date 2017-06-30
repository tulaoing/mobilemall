<template>
    <div>
        <headerbg></headerbg>
        <img src="../assets/img/404found.png" class="imgstyle">
        <p class="boldbig">出错了</p>
        <p>找不到您访问的页面</p>
        <div class="bgbtn"><a href="/">返回首页</a></div>
        <div class="bgbtn" v-on:click="back()">返回上一步</div>
        <p class="gray">您可以看看...</p>
        <productlist v-bind:productarr="productarr"></productlist>
    </div>
</template>

<script>
import Headerbg from './common/Headerbg.vue'
import Productlist from './common/Productlist.vue'
export default {
    components: {
        Headerbg,
        Productlist
    },
    data() {
        return {
            productarr:[]
        }
    },
    mounted () {
        document.title='404错误';
        this.fetchdata();
        document.querySelector('body').style.background='#fff';
    },
    methods: {
        back(){
            this.$router.go(-1);
        },
        fetchdata(){
            var _this=this;
            this.$http.get('/static/product.json').then(function(res){
                _this.productarr = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        }
    }
}
</script>

<style scoped>
.imgstyle{width: 60%;margin-left: auto;margin-right: auto;display: block;margin-top: 50px;}
p{text-align: center;margin-bottom: 5px;}
.boldbig{font-weight: bold;font-size: 26px;}
.bgbtn{margin-left: auto;margin-right: auto;padding: 5px 10px;background-color: #83BC0D;color: #fff;width: 120px;text-align: center;margin-bottom: 10px;}
.bgbtn a{color:#fff;}
.gray{margin-top: 50px;margin-bottom: 0;}
</style>