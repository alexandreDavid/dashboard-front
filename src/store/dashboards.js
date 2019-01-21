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
    return this.setAll(allDashboards)
  },
  getDashboard (id) {
    return this.getAll().find((c) => c.id === id)
  },
  setDashboard (dashboard) {
    console.log(dashboard)
    if (dashboard.id) {
      let allDashboards = this.getAll()
      Object.assign(allDashboards.find((c) => c.id === dashboard.id), dashboard)
      // Object.assign(this.getDashboard(dashboard.id), dashboard)
      // console.log(this.getAll())
      this.setAll(allDashboards)
    } else {
      this.addDashboard(dashboard)
    }
  }
}
