<template>
    <div>
        <Headerview></Headerview>
        <div class="cateslider">
            <swipe class="my-swipe">
                <swipe-item class="slide1">
                    <img src="../../assets/homebanner2.jpg">
                </swipe-item>
                <swipe-item class="slide2">
                    <img src="../../assets/homebanner2.jpg">
                </swipe-item>
                <swipe-item class="slide3">
                    <img src="../../assets/homebanner2.jpg">
                </swipe-item>
            </swipe>
        </div>
        <category v-bind:catearr="catearr"></category>
        <Productlist v-bind:productarr="productarr"></Productlist>
        <div style="height:45px;"></div>
        <Homebottom></Homebottom>
    </div>
</template>
<script>
import Category from '../common/Category.vue'
import Headerview from '../common/Header.vue'
import Backnav from '../common/Backnav.vue'
import Homebottom from '../common/Homebottom.vue'
import Productlist from '../common/Productlist.vue'

export default {
    
    components: {
        Backnav,
        Homebottom,
        Productlist,
        Headerview,
        Category
    },
    data () {
        return{
            productarr:[],
            catearr:[]
        }
    },
    mounted () {
        this.fetchdata();
        console.log(this.$route.path.slice(1));
        document.title=this.$route.path.slice(1);
        this.headershow()
    },
    methods: {
       fetchdata(){
            var _this=this;
            this.$http.get('/static/product.json').then(function(res){
                _this.productarr = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
            // this.$http.post('/static/product.json', {}, {
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // })
            // .then(function (res) {
            //     _this.productarr = res.data; 
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
            this.$http.get('/static/category.json').then(function(res){
                _this.catearr = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        headershow(){
            this.$store.dispatch('Header_Show');
        }
        
    }
}
</script>
<style>
.cateslider{height: 170px;}
.cateslider img{height: 100%;width: 100%;}
.productul{overflow: hidden}
</style>


