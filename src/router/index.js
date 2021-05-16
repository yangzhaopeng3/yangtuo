import Vue from 'vue'
import VueRouter from 'vue-router'
import config from "./config.js"

Vue.use(VueRouter)
const router = new VueRouter(config);
//  路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {  // 判断该路由是否需要登录权限
    if (localStorage.token) {  // 判断当前的token是否存在 ； 登录存入的token
      next();
    } else {
      next({
        name: 'Passport',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});
export default router;
