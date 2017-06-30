<template>
  <div class="header">
      <span class="el-icon-arrow-left pull-left backarrow" @click="goback()"></span>
      <div class="searchbox" @click="isserach=!isserach">搜索<span class="el-icon-search pull-right"></span></div>
      <Searchfixed v-bind:shopid="shopid" v-if="isserach" @change="change"></Searchfixed>
  </div>
</template>
<script>
import Searchfixed from '../common/Searchfixedshop.vue'
export default {
    props:["shopid"],
    data(){
        return{
            input:'',
            isserach:false
        }
    },
    mounted() {
        console.log(this.shopid);
    },
    components: {
        Searchfixed
    },
    methods: {
        goback(){
            this.$router.go(-1);
        },
        change(){
            document.querySelector('body').style.overflow='auto';
            this.isserach=!this.isserach;
        }
    }
}
</script>
<style scoped>
.header{
    position: absolute;
    z-index: 1000;
    width: 100%;
    padding: 5px 5px;
}
.backarrow{
    color: #fff;
    padding: 10px 15px;
}
.searchbox{
    float:left;
    width:-moz-calc(100% - 85px); 
    width:-webkit-calc(100% - 85px); 
    width: calc(100% - 85px);
    margin-top: 2px; 
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    background-color: rgba(256,256,256,0.2)
}
.shopheadersearch input{padding-left: 0;}
.el-icon-search{margin-top: 6px;margin-right: 8px;}
</style>


