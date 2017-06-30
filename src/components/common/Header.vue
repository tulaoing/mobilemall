<template>
  <div class="header">
      <div class="logo">LSSP</div>
      <div class="searchbox" @click="isserach=!isserach">搜索<span class="el-icon-search pull-right"></span></div>
      <div class="headermes"><a href="/my/message"><span class="icon-message2"></span></a></div>
      <Searchfixed v-if="isserach" @change="change"></Searchfixed>
  </div>
</template>
<<script>
import Searchfixed from './Searchfixed.vue'
export default {
    data() {
        return {
            isserach:false,
        }
    },
    components: {
        Searchfixed
    },
    methods: {
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
.logo{
    color: #fff;
    padding: 10px 15px;
    float: left;
}
.headersearchbtn{
    position: absolute;
    color: #fff;
    right: 30px;
    top: 13px;
}
.searchbox{
    float:left;
    width:-moz-calc(100% - 105px); 
    width:-webkit-calc(100% - 105px); 
    width: calc(100% - 105px);
    margin-top: 5px; 
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    background-color: rgba(256, 256, 256, 0.2);
}
.headermes{
    width: 30px;
    float: left;
    height: 30px;
    margin-left: 10px;
    margin-top: 10px;
}
.headermes .icon-message2{
    font-size: 22px;
    color: #fff
}
.headermes .el-badge__content{background-color:#fff!important;}
.el-icon-search{margin-top: 6px;margin-right: 8px;}
</style>


