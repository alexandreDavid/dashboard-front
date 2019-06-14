import UserConfiguration from '@/store/userConfiguration'
import store from '@/store'

export default async () => {
  if (!store.state.dashboards.all.length) {
    let dashboards = UserConfiguration.getDashboards()
    for (let i in dashboards) {
      await store.dispatch('dashboards/setDashboard', dashboards[i])
    }
  }
  UserConfiguration.removeDashboards()
}
