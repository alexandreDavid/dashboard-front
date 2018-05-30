import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map/Map'
import Login from '@/components/Login/Login'
import SettingsPage from '@/components/Settings/SettingsPage'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import Auth from '@/store/authentication'

Vue.use(Router)

function checkAuth (to, from, next) {
  if (!Auth.isAuthenticated()) {
    Auth.handleAuthentication()
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map,
      beforeEnter: checkAuth
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsPage,
      beforeEnter: checkAuth
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
