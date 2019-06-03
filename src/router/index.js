import Vue from 'vue'
import Router from 'vue-router'
import MapPage from '@/components/Map/Map'
import AdminPage from '@/components/Admin/AdminPage'
import DashboardPage from '@/components/Dashboard/DashboardPage'
import AccountPage from '@/components/Profile/AccountPage'
import ProfileNav from '@/components/Profile'
import ProfilePage from '@/components/Profile/ProfilePage'
import PasswordPage from '@/components/Profile/PasswordPage'
import SettingsPage from '@/components/Settings/SettingsPage'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import GraphPage from '@/components/Graph/GraphPage'
import HistoricalPage from '@/views/HistoricalPage'
import FutureClimatePage from '@/views/FutureClimatePage'
import Auth from '@/store/authentication'
import Login from '@/components/Login/Login'
import AuthentifiedRoot from '@/components/AuthentifiedRoot/AuthentifiedRoot'

Vue.use(Router)

async function checkAuth (_to, _from, next) {
  try {
    if (!Auth.isAuthenticated()) {
      Auth.logout()
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
      path: '/token/:hash',
      beforeEnter: (_to, _from, next) => {
        if (Auth.isAuthenticated()) {
          next('/')
        } else {
          next()
        }
      },
      component: Login,
      props: true
    },
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
          path: '/profile',
          component: ProfileNav,
          beforeEnter: checkAuth,
          children: [
            {
              path: '',
              name: 'profile',
              component: ProfilePage
            },
            {
              path: 'account',
              name: 'account',
              component: AccountPage
            },
            {
              path: 'password',
              name: 'password',
              component: PasswordPage
            },
            {
              path: '*',
              redirect: { name: 'profile' }
            }
          ]
        },
        {
          path: '/settings',
          name: 'settings',
          component: SettingsPage,
          beforeEnter: checkAuth
        },
        {
          path: '/admin',
          name: 'admin',
          component: AdminPage,
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
