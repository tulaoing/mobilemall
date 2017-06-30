<template>
    <div>
        <Backnav title="发表评价"></Backnav>
        <ul class="ratelist">
            <li v-for="(item,index) in oneorder.product">
                <div class="paddinglr">
                    <img class="thumbnail" :src="item.imgurl"><span class="proname">{{item.productname}}</span>
                </div>
                <div class="clearfix">
                    <div class="block3" @click="change(index,1)">
                        <span class="icon" v-bind:class="{ 'icon-good': (item.rank==1), 'icon-ungood': (item.rank!=1)}"></span><span>好评</span>
                    </div>
                    <div class="block3" @click="change(index,2)">
                        <span class="icon" v-bind:class="{ 'icon-middle': (item.rank==2), 'icon-unmiddle': (item.rank!=2)}"></span><span>中评</span>
                    </div>
                    <div class="block3" @click="change(index,3)">
                        <span class="icon" v-bind:class="{ 'icon-bad': (item.rank==3), 'icon-unbad': (item.rank!=3)}"></span><span>差评</span>
                    </div>
                </div>
                <div class="paddinglr">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 8}"
                        placeholder="请评论"
                        v-model="textarea[index]">
                    </el-input>
                </div>                
            </li>
        </ul>
        <div class="rate">
            <span>描述相符</span><el-rate v-model="rate1"></el-rate>
            <span>物流服务</span><el-rate v-model="rate2"></el-rate>
            <span>服务态度</span><el-rate v-model="rate3"></el-rate>
        </div>
        <div class="floatbottombtn" @click="submit()">提交评价</div>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
export default {
    data() {
        return{
            oneorder:'',
            rate1:5,
            rate2:5,
            rate3:5,
            rank2:1,
            rank:[],
            textarea:[],
        }
    },
    computed: {
        
    },
    components:{
        Backnav
    },
    mounted() {
        document.title='评价';
        this.fetchdata();
    },
    methods: {
        change(index,n){
            this.oneorder.product[index].rank=n;
            console.log(this.oneorder.product[index].rank);
        },
        submit(){

        },
        fetchdata(){
            var _this=this;
            this.$http.get('/static/oneorder.json').then(function(res){
                _this.oneorder = res.data; 
                var length=res.data.product.length;
                for(let i=0;i<length;i++){
                    _this.oneorder.product[i].rank=1;
                }
            }).catch(function(err){
                console.log("err" + err);
            });
        }
    }
}
</script>

<style>
.block3{width: 33.3%;text-align: center;float: left;}
.block3 .icon{font-size: 16px;margin-right: 10px;line-height: 35px;}
.icon-good,.icon-bad,.icon-middle{color: #83BC0D}
.rate{padding: 10px 20px;}
textarea:focus{border: 1px solid #ccc!important;}
.thumbnail{width: 30px;height: 30px;float: left;margin-right: 10px;}
.ratelist li{margin-top: 10px;}
.proname{white-space:nowrap; overflow:hidden; text-overflow:ellipsis;display: block;width: calc(100% - 40px);float: left}
</style>
