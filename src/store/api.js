import axios from 'axios'
import Settings from '@/store/settings'
import MapObj from '@/store/map'

const urlRoot = process.env.API_URL
let dashboard = {
  allContents: []
}

export default {
  async getInitialEnvironmemt () {
    try {
      const response = await axios.get(
        `${urlRoot}/initialEnvironmemt`
      )
      if (response.data.map) {
        MapObj.setDefaultParams(response.data.map)
      }
      if (response.data.settings) {
        Settings.init(response.data.settings)
      }
      return true
    } catch (e) {
      return false
    }
  },
  async getSettings () {
    return [
      {
        'id': 'weather',
        'label': 'Weather Units',
        'order': 1,
        'settingsList': [
          {
            'id': 'temperature',
            'label': 'Temperature units',
            'order': 1,
            'values': [
              {
                'key': 'C',
                'label': '°C'
              },
              {
                'key': 'F',
                'label': '°F'
              },
              {
                'key': 'K',
                'label': '°K'
              }
            ]
          },
          {
            'id': 'wind-speed',
            'label': 'Wind speed',
            'order': 2,
            'values': [
              {
                'key': 'kt',
                'label': 'kt'
              },
              {
                'key': 'btf',
                'label': 'btf'
              },
              {
                'key': 'm/s',
                'label': 'm/s'
              },
              {
                'key': 'mph',
                'label': 'mph'
              },
              {
                'key': 'km/h',
                'label': 'km/h'
              }
            ]
          }
        ]
      },
      {
        'id': 'alerts',
        'label': 'Alerts/Notifications',
        'order': 2,
        'settingsList': [
          {
            'id': 'flood-warning',
            'label': 'Flood warnings',
            'order': 1,
            'values': [
              {
                'key': true,
                'label': 'ON'
              },
              {
                'key': false,
                'label': 'OFF'
              }
            ]
          },
          {
            'id': 'storm-warnings',
            'label': 'Storm warnings',
            'order': 2,
            'values': [
              {
                'key': true,
                'label': 'ON'
              },
              {
                'key': false,
                'label': 'OFF'
              }
            ]
          }
        ]
      }
    ]

    // try {
    //   const response = await axios.get(
    //     `${urlRoot}/mock/settings.json`
    //   )
    //   return response.data
    // } catch (e) {
    //   return false
    // }
  },
  async setSettings (settings) {
    try {
      const response = await axios.post(
        `${urlRoot}/settings`, settings
      )
      return response.data
    } catch (e) {
      return false
    }
  },
  setDashboard (dashboard2Save) {
    dashboard = dashboard2Save
  },
  getDashboard () {
    return dashboard
  }
}
