import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map/Map'
import Login from '@/components/Login/Login'
import SettingsPage from '@/components/Settings/SettingsPage'
import ErrorPage from '@/components/ErrorPage/ErrorPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/settings',
      name: 'Settings',
      component: SettingsPage
    },
    {
      path: '/error',
      name: 'ErrorPage',
      component: ErrorPage
    },
    {
      path: '*',
      redirect: { name: 'Map' }
    }
  ]
})
