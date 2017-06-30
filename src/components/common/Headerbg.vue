<template>
  <div class="searchheader">
      <span class="el-icon-arrow-left logo" @click="goback()"></span>
       <div class="searchbox" @click="isserach=!isserach">搜索<span class="el-icon-search pull-right"></span></div>
      <div class="headermes"><a href="/my/message"><span class="icon-message2"></span></a></div>
      <Searchfixed v-if="isserach" @change="change"></Searchfixed>
  </div>
</template>
<script>
import Searchfixed from './Searchfixed.vue'
export default {
    data() {
        return {
            isserach:false
        }
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
            this.isserach=!this.isserach
        }
    }
}
</script>
<style scoped>
.searchheader{
    width: 100%;
    padding: 5px 5px;
    background-color: #83BC0D;
    overflow: hidden;
}

.searchheader .logo{
    color: #fff;
    padding: 10px 10px;
    float: left;
    font-size: 20px;
}
.headersearch{
    background-color: rgba(256,256,256,.8);
    width:100%;
    border-radius: 4px;
    line-height: 28px;
}
.searchbox{
    float:left;
    width:-moz-calc(100% - 105px); 
    width:-webkit-calc(100% - 105px); 
    width: calc(100% - 105px);
    margin-top: 5px; 
    border: 1px solid #fff;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    background-color: #fff;
}
.searchheader .el-icon-search{color: #333;}
.headersearch .el-input__icon{color: #333;}
.headermes{margin-left: 15px;margin-top: 9px;}
.headermes .icon-message2{
    font-size: 22px;
    color: #fff;
    margin-left:10px;
}
.searchbox{
    width: calc(100% - 85px);
}
.el-icon-search{margin-top: 6px;margin-right: 8px;}
</style>

