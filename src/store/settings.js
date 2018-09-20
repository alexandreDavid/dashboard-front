import Api from '@/store/api'
import UserConfiguration from '@/store/userConfiguration'

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
  activeSettings: {},
  async init () {
    settings = await Api.getSettings()
    this.activeSettings = UserConfiguration.getActiveSettings()
  },
  getAllSettings () {
    return settings
  },
  getSettingById (id) {
    return settings.find(s => s.id === id)
  },
  getSettingsType (type) {
    return settings.filter(s => s.type === type)
  },
  getActiveKeyById (id) {
    return this.activeSettings[id]
  },
  setActiveKeyById (id, value) {
    this.activeSettings[id] = value
    UserConfiguration.setActiveSettings(this.activeSettings)
  }
}
