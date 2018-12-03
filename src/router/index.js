import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)


let baseRouter = [{
  path: '/login',
  name: 'Login',
  component: (resolve) => require(['../views/login.vue'], resolve)
}, {
  path: '/401',
  name: '无权访问',
  component: (resolve) => require(['../views/common/401.vue'], resolve)
}, {
  path: '/404',
  name: '找不到页面',
  component: (resolve) => require(['../views/common/404.vue'], resolve)
}, {
  path: '/',
  name: '首页',
  component: (resolve) => require(['../views/index.vue'], resolve),
}
]

let route = new Router({
  routes: baseRouter
})

route.beforeEach((to, from, next) => {
  let routeName = to.meta.name || to.name;
  window.document.title = (routeName ? routeName + ' - ' : '') + 'Vue-Smart';
  console.log("routeName:" + routeName + "=====FORM======" + from.path);

  console.log(from.component);
  next();
})

export default route
