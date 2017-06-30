<template>
    <div>
        <Backnav title="填写物流信息"></Backnav>
        <div class="displayflex formlist2 paddingtop20">
            <span>承运来源：</span>
            <el-select v-model="choosename" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value" class="flex1">
                </el-option>
            </el-select>
        </div>
        <div class="displayflex formlist2" v-if="choosename=='其他'">
            <span>其他物流：</span>
            <el-input v-model="expressname" placeholder="请输入物流名称" class="flex1"></el-input>
        </div>
        <div class="displayflex formlist2">
            <span>运单编号：</span>
            <el-input v-model="expressid" placeholder="请输入订单号" class="flex1"></el-input>
        </div>
        <div class="floatbottombtn" @click="save()">保存</div>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
export default {
    data() {
      return {
        options: [{
          value: '圆通',
          label: '圆通'
        }, {
          value: '申通',
          label: '申通'
        }, {
          value: '韵达',
          label: '韵达'
        }, {
          value: '中通',
          label: '中通'
        }, {
          value: '顺丰',
          label: '顺丰'
        }, {
          value: '天天',
          label: '天天'
        }, {
          value: 'EMS',
          label: 'EMS'
        }, {
          value: '全峰',
          label: '全峰'
        }, {
          value: '百世汇通',
          label: '百世汇通'
        }, {
          value: '优速',
          label: '优速'
        }, {
          value: '其他',
          label: '其他'
        }],
        choosename: '',
        expressid:'',
        expressname:''
      }
    },
    mounted() {
      document.title='发货';
    },
    components: {
      Backnav
    },
    methods: {
      save(){
        if(this.choosename!='其他'){
          this.expressname=this.choosename;
        }
      }
    }
}
</script>

<style>
.formlist2{padding: 5px 20px;}
.paddingtop20{padding-top: 20px;}
</style>
