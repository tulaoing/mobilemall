<template>
    <div>
        <Notfound v-if="mes==-1"></Notfound>
        <div v-if="mes!=-1">
            <Shopheaderbg></Shopheaderbg>
            <Rankproduct v-bind:jsons="jsons"></Rankproduct>
        </div>
    </div> 
</template>

<script>
import Notfound from '../Notfound.vue'
import Shopheaderbg from './Shopheaderbg.vue'
import Rankproduct from '../common/Rankproduct.vue'
export default {
    data(){
        return{
            jsons:'',
            mes:1
        }
    },
    created() {
        let json={};
        //this.mes=-1;
        if(this.$route.params.categoryid){
            console.log(this.$route.params.categoryid);
            json.categoryid=this.$route.params.categoryid;
        }
        json.shopid=this.$route.params.shopid;
        this.jsons=JSON.stringify(json);
    },
    components:{
        Rankproduct,
        Shopheaderbg,
        Notfound
    }
}
</script>

<style>

</style>
