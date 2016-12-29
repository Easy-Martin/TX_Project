import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    component: resolve => {
      require(['./components/Login'], resolve)
    }
  },
  {
    path: '/login',
    component: resolve => {
      require(['./components/Login'], resolve)
    }
  },
  {
    path: '/index',
    component: resolve => {
      require(['./components/Index'], resolve)
    },
    children:[{
      path:'team',
      component:resolve =>{
        require(['./components/Team'], resolve)
      }
    },
    {
      path:'history',
      component:resolve =>{
        require(['./components/History'], resolve)
      }
    },
    {
      path:'account',
      component:resolve =>{
        require(['./components/Account'], resolve)
      }
    },
    {
      path:'shop',
      component:resolve =>{
        require(['./components/Shop'], resolve)
      }
    },
    {
      path:'article',
      component:resolve =>{
        require(['./components/Article'], resolve)
      }
    },
    {
      path:'setting',
      component:resolve =>{
        require(['./components/Setting'], resolve)
      }
    }]
  }
];

const router =  new VueRouter({
  routes,
  //mode:'history'
})
router.beforeEach((to, from, next) => {
  let userInfo = null;
  try{
    userInfo = JSON.parse(sessionStorage.getItem('LOGIN_SESSION'));
  }
  catch(e){
    console.info(e);
    userInfo = null
  }
  if(userInfo !== null){
    if(to.fullPath === '/login' || to.fullPath === '/'){
      next('/index')
    }else{
      next()
    }
  }else{
    if(to.fullPath === '/login' || to.fullPath === '/'){
      next()
    }else{
      next('/login')
    }
  }
  
  
})

export default router;
