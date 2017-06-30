<template>
    <div>
        <Backnav title="申请退款"></Backnav>
        <div class="aftersaleform">
            <el-select v-model="type" placeholder="申请服务">
                <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="reason" placeholder="请选择原因">
                <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="input" placeholder="请输入退款金额"></el-input>
            <span class="gray">最多申请退款{{price}}元</span>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="退款说明"
                v-model="textarea">
            </el-input>
        </div>
        

        <div class="floatbottombtn">提交申请</div>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
export default {
    components:{
        Backnav
    },
    data() {
      return {
        options1: [{
          value: '0',
          label: '退货退款'
        },{
          value: '1',
          label: '仅退款'
        }],
        options2: [{
          value: '1',
          label: '卖家发错货'
        },{
          value: '2',
          label: '收到的商品是盗版'
        },{
          value: '3',
          label: '拍错/效果不好/不喜欢'
        },{
          value: '4',
          label: '材质与商品描述不符'
        },{
          value: '5',
          label: '尺寸不符'
        },{
          value: '6',
          label: '收到商品少件/破损/污渍等'
        },{
          value: '7',
          label: '颜色/款式/图案与描述不符'
        },{
          value: '8',
          label: '和预期不符'
        },{
          value: '9',
          label: '质量问题'
        }],
        type: '',
        reason: '',
        textarea: '',
        price:78
      }
    },
    mounted(){
      document.title='售后/退款';
    },
    methods: {
        shuchu(){
            console.log(this.type);
            console.log(this.reason);
        }
    }
}
</script>

<style>
.aftersaleform{padding: 10px 20px;}
.aftersaleform>div{margin-top: 15px;width: 100%;}
.paddingbottom{padding-bottom: 40px;}
.floatbottombtn{position: fixed;bottom: 0;height: 40px;width: 100%;background-color: #83BC0D;color: #fff;text-align: center;line-height: 40px;z-index: 99999999;}
</style>
