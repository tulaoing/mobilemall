<template>
  <div class="searchfixedbox">
    <div class="searchbox">
        <span class="searchchoose" @click='showchoose'>{{searchchoose}}<i class="el-icon-caret-bottom"></i></span>
        <input class="headersearchinput"  @keyup="get($event)" v-model="input">
        <span class="el-icon-search" @click="search(input)"></span>
    </div>
    <span @click="" class="cancelbtn" @click="cancel()">取消</span>
    <div>
        <ul class="searchtipul">
            <li v-for="item in searchitem" @click="search(item)">{{item}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    props:['shopid'],
    data() {
        return {
            input: '',
            searchchoose:"宝贝",
            ischoose:false,
            searchitem:[]
        }
    },
    mounted() {
        document.querySelector('body').style.overflow='hidden';
        document.querySelector('.headersearchinput').focus();
    },
    methods: {
        showchoose(){
            this.ischoose=!this.ischoose;
        },
        get(event){
            let inputtext=event.target.value;
            setTimeout(()=>{
                if(this.input==inputtext){
                    var _this=this;
                    this.$http.get('/static/searchitem.json').then(function(res){
                        _this.searchitem = res.data; 
                    }).catch(function(err){
                        console.log("err" + err);
                    });

                }else{
                    return
                }
            },500)
        },
        search(item){
            if(this.shopid){
                window.location.href='/search?s='+item+"&shopid="+this.shopid;
            }else{
                if(this.searchchoose=='店铺'){
                    window.location.href='/search?s='+item+"&item=shop";
                }else{
                    window.location.href='/search?s='+item;
                }
            }
            
            
        },
        cancel(){
            this.$emit('change');
        }

    }
}
</script>

<style scoped>
.searchbox{
    position: relative;
    float: left
}
.searchfixedbox{
    padding: 10px 10px;
}
.cancelbtn{
    width: 45px;
    line-height: 40px;
    padding:  0 10px;
}
.searchfixedbox .searchbox{
    width:-moz-calc(100% - 50px); 
    width:-webkit-calc(100% - 50px); 
    width: calc(100% - 50px);
}
.searchfixedbox .searchbox input{text-align: left}
.searchchoose{position: absolute;line-height:38px;margin-left: 10px;z-index: 555555;color:#555;}
.searchchoose .el-icon-caret-bottom{font-size: 11px;margin-left: 10px;}
.searchchooseul{position: absolute;top: 45px;width: 80px;background-color: rgb(51,51,51);padding: 5px 15px;color:#fff;border-radius:5px;}
.searchchooseul:before{
    content: '';
    border-bottom: 10px solid rgb(51,51,51);
    border-left: 10px solid transparent;
    border-left-width: 10px;
    border-left-style: solid;
    border-left-color: transparent;
    border-right: 10px solid transparent;
    position: absolute;
    top: -7px;
    left: 5px;
    z-index: 888888888888;
}
.searchfixedbox{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 8888888888888888;
}
.headersearchinput{height: 38px;width: 100%;border-radius: 5px;padding-left: 70px;background-color: #f0f0f0;border: none;line-height: 36px}
.headersearchinput:focus{width: 100%;border-radius: 10px;box-shadow: none;outline: none;}
.searchtipul li{height: 40px;line-height: 40px;border-bottom: 1px solid #f0f0f0;padding-left: 3px;margin-top: 5px;}
.el-icon-search{position: absolute;top: 10px;font-size: 18px;right: 10px;}
</style>
