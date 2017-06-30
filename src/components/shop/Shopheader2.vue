<template>
  <div class="shopheader">
      <span class="el-icon-arrow-left logo" @click="goback()"></span>
      <div class="searchbox">
         <el-input
                placeholder="搜索店铺内宝贝"
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick" class="headersearch">
        </el-input>
      </div>
  </div>
</template>
<<script>
export default {
    methods: {
        goback(){
            this.$router.go(-1);
        },
    }
}
</script>
<style>
.shopheader{
    z-index: 1000;
    width: 100%;
    padding: 5px 5px;
}
.logo{
    color: #fff;
    padding: 5px 15px;
    float: left;
}
.shopheader, .headersearch{
    background-color: #999;
    width:100%;
    border-radius: 4px;
    line-height: 28px;
}
.shopheader, .headersearchbtn{
    position: absolute;
    color: #fff;
    right: 30px;
    top: 13px;
}

</style>