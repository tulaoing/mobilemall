<template>
    <div class="cartlist">
        <Backnav title="购物车"></Backnav>
        <div class="floattopright" v-on:click="showedit=!showedit" v-if="!showedit">编辑</div>
        <div class="floattopright" v-on:click="showedit=!showedit" v-if="showedit">完成</div>
        <div class="orderlist">
            <ul>
                <li v-for="(item,index) in cartpro" v-if="item.product.length!=0">
                    <div>
                        <!--<el-checkbox v-model="" @change="checkchange(item.shopid)"></el-checkbox>-->
                        <span class="icon-shop"></span><span>{{item.shopname}}</span>
                    </div>
                    <ul>
                        <li v-for="(smallitem,index2) in item.product">
                            <div class="displayflex">
                                <el-checkbox v-model="smallitem.checked"></el-checkbox>
                                <img :src="smallitem.imgurl" class="orderimg">
                                <div class="flex1 padding">
                                    <div class="orderpname">{{smallitem.productname}}</div>
                                    <div style="width:125px;line-height:15px;"><span v-for="(attr,index) in smallitem.attr" class="attr">{{index}}: {{attr}}; </span></div>
                                </div>
                                <div class="orderprice">
                                    <p class="text-right">￥{{smallitem.price}}</p>
                                    <p class="text-right gray little" v-if="!showedit">x{{smallitem.num}}</p>
                                </div>
                            </div>
                            <el-input-number v-model="smallitem.num"  v-if="showedit"  :min="0" style="float-right" @change="changenum(item.shopid,index,smallitem.productid,index2,smallitem.num)"></el-input-number>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="cartfloat">
            <div style="margin-top:10px;margin-left:20px;float:left"><el-checkbox v-model="checkAll" @change="selectall()">全选</el-checkbox></div>
            <span style="margin-top:10px;margin-left:20px;float:left" v-if="showedit" @click="removecart()">删除</span>
            <div class="jiesuanbtn pull-right text-center" @click="jiesuan()">去结算</div>
            <div class="pull-right text-center allprice">￥{{totalprice}}</div>
        </div>
        <Homebottom></Homebottom>
    </div>
</template>

<script>
import Backnav from './common/Backnav.vue'
import Homebottom from './common/Homebottom.vue'
export default {
    data(){
        return{
            cartpro:[],
            num1: 1,
            checkAll:false,
            //checklist:[],
            showedit:false
        }
    },
    mounted(){
        document.title='购物车';
        this.fetchdata();
    },
    computed: {
        totalprice: function(){
            let sum=0;
            for(let i=0;i<this.cartpro.length;i++){
                for(let j=0;j<this.cartpro[i].product.length;j++){
                    if(this.cartpro[i].product[j].checked==true){
                        sum = sum + this.cartpro[i].product[j].price*this.cartpro[i].product[j].num;
                    }
                }
            }
            return sum
        }
        //checklist: function(){
        //     let json=this.cartpro.slice();
        //     for(let i=json.length-1;i>=0;i--){
        //         for(let j=json[i].product.length-1;j>=0;j--){
        //             if(json[i].product[j].checked==false){
        //                 json[i].product.splice(j,1);
        //                 json[i].product.splice(1,1)
        //             }
        //         }
        //         if(json[i].product.length==0){
        //             json.splice(i,1);
        //         }
        //     }
        //     console.log(json);
        //     return json
        //     let arr=[];
        //     for(let i=0;i<this.cartpro.length;i++){
        //         for(let j=0;j<this.cartpro[i].product.length;j++){
        //             if(this.cartpro[i].product[j].checked==true){
        //                 let json={
        //                     "shopid":this.cartpro[i].shopid,
        //                     "productid":this.cartpro[i].product[j].productid,
        //                     "price":this.cartpro[i].product[j].price,
        //                     "num":this.cartpro[i].product[j].num,
        //                     "attr":this.cartpro[i].product[j].attr
        //                 }
        //                 arr.push(json);
        //             }
        //         }
        //     }
        //     return arr
        // }
    },
    methods: {
        fetchdata(id){
            var _this=this;
            this.$http.get('/static/cartpro.json').then(function(res){
                _this.cartpro = res.data; 
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        selectall(){
            console.log(this.checkAll);
            for(let i=0;i<this.cartpro.length;i++){
                for(let j=0;j<this.cartpro[i].product.length;j++){
                    this.cartpro[i].product[j].checked=this.checkAll;
                }
            }
        },
        jiesuan(){
            let isselected=false;
            for(let i=0;i<this.cartpro.length;i++){
                for(let j=0;j<this.cartpro[i].product.length;j++){
                    if(this.cartpro[i].product[j].checked==true){
                        isselected=true;break;
                    }
                    
                }
            }
            if(!isselected){
                let toast = this.$toasted.show("您没有提交任何产品", { 
                    theme: "primary", 
                    position: "top-center", 
                    duration : 5000
                });
                return false;
            }
            let a=this.cartpro.slice();
            let json=a;
            for(let i=json.length-1;i>=0;i--){
                for(let j=json[i].product.length-1;j>=0;j--){
                    if(json[i].product[j].checked==false){
                        json[i].product.splice(j,1);
                        json[i].product.splice(1,1)
                    }
                }
                if(json[i].product.length==0){
                    json.splice(i,1);
                }
            }
            console.log(json);
            sessionStorage.data=JSON.stringify(json);
            console.log(sessionStorage.data);
            window.location.href="/submit";
        },
        changenum(shopid,index,productid,index2,num){
            console.log(shopid,index,productid,index2,num);
            if(num==1){
                this.cartpro[index].product.splice(index2,1);
                if(this.cartpro[index].product.length==0){
                    this.cartpro.splice(index,1)
                }
            }
        },
        removecart(){
            for(let i=this.cartpro.length-1;i>=0;i--){
                for(let j=this.cartpro[i].product.length-1;j>=0;j--){
                    if(this.cartpro[i].product[j].checked==true){
                        console.log("ok");
                        this.cartpro[i].product.splice(j,1);
                    }
                }
                if(this.cartpro[i].product.length==0){
                     this.cartpro.splice(i,1);
                 }
            }
        },
        
    },
    components:{
        Backnav,
        Homebottom
    }

}
</script>

<style>
.orderlist ul li{clear: both}
.orderlist .el-input-number{float: right;margin-top: -38px;}
.orderlist .el-input-number{width: 70px;border:none;}
.cartlist{margin-bottom: 40px;}
.orderlist .el-input-number__decrease{left: -25px;}
.el-input-number .el-input{padding-right: 20px;}
.orderlist .el-input-number .el-input__inner{width: 40px;text-align: center;padding: 0;height: 30px;}
.orderlist .el-input-number__decrease,.orderlist .el-input-number__increase{line-height: 30px;width: 30px;border-left: none;}
.orderlist .el-input-number__decrease{width: 25px;text-align: center}
.orderlist .el-checkbox{margin-top: 20px;margin-right: 10px;}
.el-checkbox__input.is-checked .el-checkbox__inner{background-color: #83BC0D!important;border-color:  #83BC0D!important}
.el-checkbox__inner:hover{border-color:  #83BC0D!important}
.el-checkbox__inner:visited{border-color:  #83BC0D!important}
.cartfloat{position: fixed;bottom: 39px;background-color: #fff;width: 100%;z-index: 999999999;height: 40px;box-shadow: 1px -1px 1px #ccc; }
.jiesuanbtn{line-height: 40px;background-color: #83BC0D;display: inline-block;color: #fff;padding: 0 20px;}
.allprice{line-height: 40px;color: red;margin-right: 10px;}
.attr{line-height: 25px;}
</style>
