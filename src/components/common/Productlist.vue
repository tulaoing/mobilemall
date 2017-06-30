<template>
    <div>
        <span class="text-center">{{title}}</span>
        <div>
            <ul class="productul">
                <li v-for='item in productarr'>
                    <router-link :to="'/'+ item.id ">
                        <img :src="item.imgurl">
                        <h4 class="onelineword">{{item.name}}</h4>
                        <div>
                            <span class="price">￥{{item.price}}</span>
                            <!--<span class="icon-shoppingcart pull-right shoppingcart" v-on:click.prevent="addcart($event,item.id)"></span>-->
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <!--<div id="trans" class="transduration transbefore" v-show="transhow"></div>-->
    </div>
</template>
<script>
export default {
    props:['productarr','title'],
    data(){
        return{
            transhow:false
        }
        
    },
    mounted() {
        if(this.productarr==[]){

        }
    },
    methods: {
        addcart(event,id){
            console.log(event);
            var para=document.createElement("div");
            para.style.left=event.pageX+'px';
            para.style.top=event.pageY+'px';
            console.log(para.style.left);
            console.log(para.style.top);
            this.transhow=true;
            
                // this.$message({
                //     message: '添加成功',
                //     type: 'success'
                // });
            setTimeout(function() {
                para.style.left='33.3%';
                para.style.top=document.body.scrollHeight+'px';
            }, 100);
            setTimeout(function() {
                para.style.left='';
                para.style.top='';
                this.transhow=false;
            }, 1000);
            

        }
        
        
    }
}
</script>

<style scoped>
.transduration{transition: all 1s;}
.transbefore{width: 20px;height: 20px;background-color: #83BC0D;border-radius: 10px;position: absolute;}
</style>

