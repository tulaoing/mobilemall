<template>
  <div id="app">
    <!--<hearderview v-show="headShow"></hearderview>-->
    <!--<div style="height:100%;">-->
    <router-view></router-view>
    <!--</div>-->
    <div style="clear:both"></div>
    <!--<footerview v-show="footerShow"></footerview>-->
    <a href="#0" class="cd-top">Top</a>
  </div>
</template>

<script>
import Footerview from './components/common/Footer.vue'

import {mapGetters} from 'vuex'

export default {
  name: 'app',
  data(){
    return{
    }
  },
  components:{
    Footerview,
  },
  computed:mapGetters([
    'loginname',
    'footerShow',
    'shop'
  ]),
  watch:{
    $route(to){
      var path=to.path.substring(1);
    }
  },
  mounted(){
      var path=this.$route.path.substring(1);
      //document.querySelector('body').style.background="#f0f0f0";
      // console.log(this.$store.getters.loginname);
      // console.log(this.$store.getters.shop);
      // console.log(this.GLOBAL.host);
  },
  methods: {
    
  },
}
</script>

<style>
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
  line-height: 25px;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  color: #333;
  background-color: #f0f0f0;
}
a{color: #333;text-decoration: none}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
body{
	font-size: 15px;
	font-family: '微软雅黑';
}
.displayflex{
	display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex; 
}
.flex1{
	  -webkit-box-flex: 1;
    -moz-box-flex: 1;         
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1; 
}
a:hover{text-decoration: none;color:#333}
.pull-right{float: right;}
.pull-left{float: left;}
.text-center{text-align: center}
.text-right{text-align: right}
/*.el-input__inner{height: 30px!important}*/
html,body{height: 100%;}
.routerviewcon{height: 100%;}
.displayinline{display: inline-block;}
.displayblock{display: block}
.darkgray{color: #666;}
.productul{background-color: #fff}
::-webkit-input-placeholder { /* WebKit browsers */ 
color: #666; font-family: "微软雅黑"
} 
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
color: #666; font-family: "微软雅黑"
} 
::-moz-placeholder { /* Mozilla Firefox 19+ */ 
color: #666; font-family: "微软雅黑"
} 
:-ms-input-placeholder { /* Internet Explorer 10+ */ 
color: #666; font-family: "微软雅黑"
} 


input, textarea{font-family: '微软雅黑'}
.el-radio__input.is-checked .el-radio__inner{border-color:#83BC0D!important;background-color: #83BC0D!important; }
.el-date-table td.current:not(.disabled), .el-date-table td.end-date, .el-date-table td.start-date{background-color: #83BC0D!important;}
#toasted-container{
  min-width: 0!important;
  max-width: 200px;
  padding: 5px 20px;
  bottom: 55%!important;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000000000000!important;
  white-space:nowrap;
}
.shopheadersearch input{padding-left: 10px!important;}
.el-dialog__body{padding: 10px 20px!important;font-size: 16px!important;}
.el-loading-spinner{margin-top: 10px!important}
</style>
