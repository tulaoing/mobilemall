<template>
    <div class="backnav">
        <span class="el-icon-arrow-left" @click="goback()"></span>
        <span class="text-center">{{title}}</span>
    </div>
</template>
<script>
export default {
    props:['title'],
    methods: {
        goback(){
            this.$router.go(-1);
        },
    }
}
</script>

<style scoped>
span{width: 31%;display: inline-block;line-height: 35px;font-size: 16px;}
.backnav{height: 35px;line-height: 35px;border-bottom: 1px solid #ccc;box-shadow: 1px 1px 1px #ccc;background-color: #fff;padding: 0;}
.backnav .el-icon-arrow-left{margin-left: 15px;}
</style>

