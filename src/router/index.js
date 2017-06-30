import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home.vue'
import CategoryTem from '@/components/category/CategoryTem.vue'
import Login from '@/components/Login.vue'
import Reg from '@/components/Reg.vue'
import About from '@/components/About.vue'
import Contact from '@/components/Contact.vue'
import Notfound from '@/components/Notfound.vue'
import Search from '@/components/Search.vue'
import Shop from '@/components/shop/Shop.vue'
import Shopcategory from '@/components/shop/Shopcategory.vue'
import Shopdescription from '@/components/shop/Shopdescription.vue'
import Shopproductlist from '@/components/shop/Shopproductlist.vue'
import Shopsearch from '@/components/shop/Shopsearch.vue'
import Product from '@/components/product/Product.vue'
import Myaddress from '@/components/myinfo/Myaddress.vue'
import Addaddress from '@/components/myinfo/Addaddress.vue'
import Editaddress from '@/components/myinfo/Editaddress.vue'
import Myinfo from '@/components/myinfo/Myinfo.vue'
import Myorder from '@/components/myinfo/Myorder.vue'
import Orderinfo from '@/components/myinfo/Orderinfo.vue'
import Settings from '@/components/myinfo/Settings.vue'
import Aftersale from '@/components/myinfo/Aftersale.vue'
import Aftersaleinfo from '@/components/myinfo/Aftersaleinfo.vue'
import Express from '@/components/myinfo/Express.vue'
import Comment from '@/components/myinfo/Comment.vue'
import Favouritespro from '@/components/myinfo/Favouritespro.vue'
import Favouritesshop from '@/components/myinfo/Favouritesshop.vue'
import Searchorder from '@/components/myinfo/Searchorder.vue'
import Message from '@/components/myinfo/Message.vue'
import Shopcart from '@/components/Shopcart.vue'
import Submit from '@/components/Submit.vue'
import Selectaddress from '@/components/Selectaddress.vue'
import Myshop from '@/components/myshop/Myshop.vue'
import Shopinfo from '@/components/myshop/Shopinfo.vue'
import Shoporderlist from '@/components/myshop/Shoporderlist.vue'
import Shoporderinfo from '@/components/myshop/Orderinfo.vue'
import Sendout from '@/components/myshop/Sendout.vue'
import SAftersaleinfo from '@/components/myshop/Aftersaleinfo.vue'

Vue.use(Router);


export default new Router({
  mode: 'history', //切换路径模式，变成history模式
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: Home
    },{
      path: '/home',
      component: Home
    },{
      path: '/fruit',
      component: CategoryTem
    },{
      path: '/vegetable',
      component: CategoryTem
    },{
      path: '/nut',
      component: CategoryTem
    },{
      path: '/drinks',
      component: CategoryTem
    },{
      path: '/grain',
      component: CategoryTem
    },{
      path:'/login',
      component: Login
    },{
      path:'/reg',
      component: Reg
    },{
      path:'/about',
      component: About
    },{
      path:'/contact',
      component: Contact
    },{
      path:'/shop/:shopid',
      component: Shop
    },{
      path:'/shop/:id/category',
      component: Shopcategory
    },{
      path:'/shop/:shopid/products',
      component: Shopproductlist
    },{
      path:'/shop/:shopid/category/:categoryid',
      component: Shopproductlist
    },{
      path:'/shop/:shopid/shopdescription',
      component: Shopdescription
    },{
      path:'/search',
      component: Search  
    },{
      path:'/shopsearch',
      component: Shopsearch  
    },{
      path:'/my',
      component: Myinfo,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/my/favouritespro',
      component: Favouritespro ,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/my/favouritesshop',
      component: Favouritesshop,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/submit',
      component: Submit,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/submit/selectaddress',
      component: Selectaddress,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/shoppingcart',
      component: Shopcart,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/my/settings',
      component: Settings,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/myorder',
      component: Myorder,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/my/address',
      component: Myaddress,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/my/message',
      component: Message,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/my/address/add',
      component: Addaddress,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/my/address/edit',
      component: Editaddress,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/myorder/orderinfo',
      component: Orderinfo,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/myorder/searchorder',
      component: Searchorder,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/myorder/orderinfo/comment',
      component: Comment,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/myorder/orderinfo/express',
      component: Express,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/myorder/orderinfo/aftersale',
      component: Aftersale,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/myorder/orderinfo/aftersaleinfo',
      component: Aftersaleinfo,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/myorder/orderinfo/aftersaleinfo/sendout',
      component: Sendout,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/myshop',
      component: Myshop,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/myshop/settings',
      component: Shopinfo,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/shoporder',
      component: Shoporderlist,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/shoporder/orderinfo',
      component: Shoporderinfo,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/shoporder/orderinfo/express',
      component: Express,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/shoporder/orderinfo/sendout',
      component: Sendout,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/shoporder/orderinfo/aftersaleinfo',
      component: SAftersaleinfo,
      beforeEnter: (to, from, next) => {
        if(!sessionStorage.loginname){
          next({
            path: '/login',
            query: { redirect:to.fullPath }
          })
        }else{
          next();
        }
      }
    },{
      path:'/notfound',
      component: Notfound
    },{
      path:'/:productid',
      component: Product
    },{
      path:'*',
      component: Notfound
    }
  ]
})
