import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    component: resolve => {
      require(['./components/Hello'], resolve)
    }
  }
];

const router =  new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
   
// })

export default router;
