import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map/Map'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: { name: 'Map' }
    }
  ]
})
