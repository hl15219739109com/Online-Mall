import Vue from 'vue'
import Router from 'vue-router'
import login from "./components/xm/Login"
import register from "./components/xm/Register"
import index from "./components/xm/Index"
import product from "./components/xm/Product"
Vue.use(Router)

export default new Router({
  routes: [
    {path:"/login",component:login},
    {path:"/register",component:register},
    {path:"/",component:index},
    {path:"/index",component:index},
    {path:"/product/:id",component:product,props:true},
  ]
})
