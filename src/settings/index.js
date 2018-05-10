import Api from '@/api'

let settings = []

export default {
  init (initSettings) {
    settings = initSettings
  },
  getSettings () {
    return settings
  },
  getSettingById (id) {
    return settings.find(s => s.id === id)
  },
  getSettingsFamily (familyId) {
    return settings.filter(s => s.family === familyId)
  },
  getActiveKeyById (id) {
    return this.getSettingById(id).value
  },
  setActiveKeyById (id, key) {
    this.getSettingById(id).value = key
    Api.setSettings(settings)
  }
}
