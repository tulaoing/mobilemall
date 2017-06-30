<template>
    <div>
        <Backnav title="我的消息"></Backnav>
        <div class="messagebox">
            <ul>
                <li v-for="item in messagearr">
                    <p class="text-center little">{{item.time}}</p>
                    <div class="card">
                        <a :href="'/myorder/orderinfo?orderid='+item.orderid">
                            <p>{{item.title}}</p>
                            <p class="darkgray">{{item.content}}</p>
                        </a>
                    </div>   
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
export default {
    data(){
      return{
        messagearr:[]
      }
    },
    created(){
        //document.querySelector('body').style.background='#f0f0f0';
    },
    mounted(){
      document.title='我的消息';
      this.fetchdata();
      this.adjustheight();
    },
    methods: {
        adjustheight(){
            console.log(document.body.offsetHeight);
            console.log($("body").height());
        },
        fetchdata(){
            var _this=this;
            this.$http.get('/static/message.json').then(function(res){
                _this.messagearr = res.data; 
            }).catch(function(err){
                console.log("err:" + err);
            });
        }
    },
    components: {
        Backnav
    }
}
</script>

<style>
.messagebox{background-color: #f0f0f0;}
.card{background-color: #fff;border-radius: 10px;width: 95%;margin-right: auto;margin-left: auto;padding: 10px 20px;}
.messagebox ul li{margin-top: 5px;}
.messagebox ul{overflow: hidden}
.darkgray{color: #666}
</style>
