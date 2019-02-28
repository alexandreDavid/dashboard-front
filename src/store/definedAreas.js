import UserConfiguration from '@/store/userConfiguration'

export default {
  getAll () {
    let allAreas = UserConfiguration.getDefinedAreas()
    // Migration to be removed in few months
    if (!allAreas.length) {
      let activeArea = UserConfiguration.getActiveArea()
      if (activeArea) {
        activeArea.idArea = activeArea.id
        activeArea.id = 1
        allAreas = [activeArea]
      }
    }
    return allAreas
  },
  setAll (allAreas) {
    UserConfiguration.setDefinedAreas(allAreas)
    // Migration to be removed in few months
    UserConfiguration.removeActiveArea()
    return allAreas
  },
  getArea (id) {
    return this.getAll().find(o => o.id === id)
  },
  getActiveArea () {
    const allAreas = this.getAll()
    return allAreas && (allAreas.find(a => a.active) || allAreas[0])
  },
  setActiveArea (area) {
    let allAreas = this.getAll()
    allAreas.forEach(a => { a.active = false })
    allAreas.filter(a => a.id === area.id).forEach(a => { a.active = true })
    return this.setAll(allAreas)
  }
}
