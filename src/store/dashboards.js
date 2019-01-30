import UserConfiguration from '@/store/userConfiguration'

export default {
  getAll () {
    return UserConfiguration.getDashboards()
  },
  setAll (allDashboards) {
    UserConfiguration.setDashboards(allDashboards)
    return allDashboards
  },
  addDashboard (dashboard = {}) {
    let allDashboards = this.getAll()
    // get max id plus 1
    dashboard.id = Math.max(...allDashboards.map(d => {
      return d.id
    }), 0) + 1
    allDashboards.push(dashboard)
    this.setAll(allDashboards)
    return dashboard
  },
  getDashboard (id) {
    return this.getAll().find((c) => c.id === id)
  },
  setDashboard (dashboard) {
    if (dashboard.id) {
      let allDashboards = this.getAll()
      Object.assign(allDashboards.find((c) => c.id === dashboard.id), dashboard)
      this.setAll(allDashboards)
    } else {
      this.addDashboard(dashboard)
    }
  },
  removeDashboard (dashboard) {
    let allDashboards = this.getAll()
    allDashboards.splice(allDashboards.findIndex(d => d.id === dashboard.id), 1)
    return this.setAll(allDashboards)
  }
}
