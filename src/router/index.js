import Vue from 'vue'
import Router from 'vue-router'
import MapPage from '@/views/MapPage'
import DashboardPage from '@/components/Dashboard/DashboardPage'
import SettingsPage from '@/components/Settings/SettingsPage'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import GraphPage from '@/components/Graph/GraphPage'
import HistoricalPage from '@/views/HistoricalPage'
import FutureClimatePage from '@/views/FutureClimatePage'
import Auth from '@/store/authentication'
// import Login from '@/components/Login/Login'

Vue.use(Router)

function checkAuth (to, from, next) {
  if (!Auth.isAuthenticated()) {
    // Auth.handleAuthentication()
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
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsPage,
      beforeEnter: checkAuth
    },
    {
      path: '/error',
      name: 'errorPage',
      component: ErrorPage
    },
    {
      path: '*',
      redirect: { name: 'map' }
    }
  ]
})
