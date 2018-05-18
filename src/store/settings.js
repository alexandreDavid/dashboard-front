import Api from '@/store/api'

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
  setActiveKeyById (id, setting) {
    let key = setting.key
    let label = setting.label
    Object.assign(this.getSettingById(id), { key, label })
    Api.setSettings(settings)
  }
}
