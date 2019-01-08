import UserConfiguration from '@/store/userConfiguration'

export default {
  getAll () {
    return UserConfiguration.getDefinedAreas()
  },
  setAll (allAreas) {
    this.saveChanges(allAreas)
    return allAreas
  },
  saveChanges (allAreas) {
    UserConfiguration.setDefinedAreas(allAreas)
    this.allAreas = allAreas
  },
  hasAreas () {
    return !!this.getAll().length
  },
  getActiveArea () {
    const allAreas = UserConfiguration.getDefinedAreas()
    return allAreas && (allAreas.find(a => a.active) || allAreas[0])
  },
  setActiveArea (area) {
    let allAreas = this.getAll()
    allAreas.forEach(a => { a.active = false })
    allAreas.filter(a => a.id === area.id).forEach(a => { a.active = true })
    return this.setAll(allAreas)
  }
}
