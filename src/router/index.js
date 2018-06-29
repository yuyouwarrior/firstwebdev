import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/todo',
      component: layout
    }
  ]
})
