import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map/Map'
import Login from '@/components/Login/Login'
import DashboardPage from '@/components/Dashboard/DashboardPage'
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
  // mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      beforeEnter: checkAuth
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
      beforeEnter: checkAuth
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsPage,
      beforeEnter: checkAuth
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/error',
      name: 'errorPage',
      component: ErrorPage
    },
    {
      path: '*',
      redirect: { name: 'dashboard' }
    }
  ]
})
