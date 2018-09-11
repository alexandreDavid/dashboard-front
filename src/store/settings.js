import Api from '@/store/api'

let settings = [
  {
    'id': 'temperature',
    'value': 'C',
    'label': '°C',
    'family': 'weather'
  }, {
    'id': 'wind-speed',
    'value': 'km/h',
    'label': 'km/h',
    'family': 'weather'
  }, {
    'id': 'flood-warning',
    'value': true,
    'family': 'alerts'
  }, {
    'id': 'storm-warnings',
    'value': false,
    'family': 'alerts'
  }
]

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
    const activeSetting = this.getSettingById(id)
    return activeSetting && activeSetting.value
  },
  setActiveKeyById (id, setting) {
    let key = setting.key
    let label = setting.label
    Object.assign(this.getSettingById(id), { key, label })
    Api.setSettings(settings)
  }
}
