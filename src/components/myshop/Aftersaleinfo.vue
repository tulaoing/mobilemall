<template>
    <div>
        <Backnav title="退款详情"></Backnav>
        <div class="paddinglrt">
            <ul>
                <li v-if="service.state==6||service.state==7||service.state==8"><span class="paddingright">订单状态: </span><span>退款中</span></li>
                <li v-if="service.state==9"><span class="paddingright">订单状态: </span><span>退款完成</span></li>
                <li><span class="paddingright">服务类型: </span><span>{{service.servicetype}}</span></li>
                <li><span class="paddingright">服务原因: </span><span>{{service.reason}}</span></li>
                <li><span class="paddingright">退款金额: </span><span>{{service.num}}</span></li>
                <li><span class="paddingright">退款说明: </span><span>{{service.description}}</span></li>
            </ul>
            <div v-if="service.state==7">
                <span>订单详细状态：</span><span>等待买家退货</span>
            </div>
            <div v-if="service.state==8">
                <span>订单详细状态：</span><span>买家已退货</span>
                <div>
                    <span>退货承运来源：</span><span>{{service.expressname}}</span>
                </div>
                <div>
                    <span>退货运单编号：</span><span>{{service.expressid}}</span>
                </div>
            </div>
            <div v-if="service.state==6">
                <span style="line-height:35px;">买家发出申请退款，是否同意？</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入拒绝原因"
                    v-model="textarea" v-if="value=='拒绝'" style="margin-top:15px;">
                </el-input>
            </div>
        </div>
        <div @click="save()" class="floatbottombtn" v-if="service.state==6">保存</div>
        <div @click="save()" class="floatbottombtn" v-if="service.state==8">确认收货</div>
    </div>
</template>

<script>
import Backnav from '../common/Backnav.vue'
export default {
    data(){
        return{
            service:{},
            options: [{
                value: '同意',
                label: '同意'
            }, {
                value: '拒绝',
                label: '拒绝'
            }],
            value: '',
            textarea:''
        }
    },
    mounted(){
        document.title='退款详情';
        this.fetchdata();
    },
    methods: {
        fetchdata(){
            var _this=this;
            this.$http.get('/static/service.json').then(function(res){
                _this.service = res.data; 
                console.log(res.data);
            }).catch(function(err){
                console.log("err" + err);
            });
        },
        save(){

        }
    },
    components: {
        Backnav
    }
}
</script>

<style>
.btnbg{color: #fff;}
</style>
