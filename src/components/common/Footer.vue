<template>
  <div class="footer">
    <ul class="footerul">
      <router-link to="/my" v-if="this.username" tag="li">{{this.username}}</router-link>
      <li @click="logout()" v-if="this.username" >退出</li>
      <router-link to="/login" tag="li" v-if="!this.username">登录</router-link>
      <!--<li @click="login()" v-if="!this.$store.getters.loginname">登录</li>-->
      <router-link to="/reg" tag="li" v-if="!this.username">注册</router-link>
      <router-link to="/about" tag="li">关于我们</router-link>
      <router-link to="/contact" tag="li">联系建议</router-link>
    </ul>
    <p>Copyright © 2013 - 2017 Ketwo. All Rights Reserved</p>
  </div>
</template>
<style>
.footerul li{width: 25%;float: left;text-align: center;}
.footer{padding: 5px;position: absolute;bottom: 0;width: 100%;left: 0;}
.footer p{text-align: center;}
</style>
<script>

export default {
  data(){
    return {
      username:''
    }
  },
  mounted(){
    this.init();
  },
  watch:{
			$route(to){
			}
	},
  methods: {
    init(){
      this.username=sessionStorage.loginname;
    },
    logout(){
      this.$store.dispatch('Logout');
      this.username='';
    }
  }
}
</script>

