import Vue from 'vue'
import Router from 'vue-router'
import MapPage from '@/views/MapPage'
import DashboardPage from '@/views/DashboardPage'
import SettingsPage from '@/components/Settings/SettingsPage'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import GraphPage from '@/components/Graph/GraphPage'
import HistoricalPage from '@/views/HistoricalPage'
import FutureClimatePage from '@/views/FutureClimatePage'
import Auth from '@/store/authentication'
import Login from '@/components/Login/Login'
import AuthentifiedRoot from '@/components/AuthentifiedRoot/AuthentifiedRoot'

Vue.use(Router)

async function checkAuth (to, from, next) {
  try {
    if (!Auth.isAuthenticated()) {
      const isAuthenticated = await Auth.handleAuthentication()
      if (isAuthenticated) {
        next()
      } else {
        Auth.logout()
      }
    } else {
      next()
    }
  } catch (e) {
    Auth.logout(e.errorDescription)
  }
}

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: AuthentifiedRoot,
      beforeEnter: checkAuth,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardPage,
          beforeEnter: checkAuth
        },
        {
          path: '/map',
          name: 'map',
          component: MapPage,
          beforeEnter: checkAuth
        },
        {
          path: '/graph',
          name: 'graph',
          component: GraphPage,
          beforeEnter: checkAuth
        },
        {
          path: '/historical',
          name: 'historical',
          component: HistoricalPage,
          beforeEnter: checkAuth
        },
        {
          path: '/future-climate',
          name: 'future-climate',
          component: FutureClimatePage,
          beforeEnter: checkAuth
        },
        {
          path: '/settings',
          name: 'settings',
          component: SettingsPage,
          beforeEnter: checkAuth
        },
        {
          path: '*',
          redirect: { name: 'dashboard' }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true
    },
    {
      path: '/error',
      name: 'errorPage',
      component: ErrorPage
    }
  ]
})
