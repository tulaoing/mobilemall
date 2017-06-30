<template>
    <div>
        <Shopheaderbg></Shopheaderbg>
        <Rankproduct v-bind:jsons="jsons"></Rankproduct>
    </div>
</template>

<script>
import Shopheaderbg from './Shopheaderbg.vue'
import Rankproduct from '../common/Rankproduct.vue'
export default {
    components: {
        Shopheaderbg,
        Rankproduct
    },
    data() {
        return{
            jsons:''
        }
    },
    created() {
        let json={}
        json.search=this.$route.query.s;
        json.shopid=this.$route.query.shopid;
        this.jsons=JSON.stringify(json);
        console.log(this.jsons);
    }
}
</script>

<style>

</style>
