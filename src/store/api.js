let dashboard = {
  allContents: []
}

export default {
  async getSettings () {
    return [
      {
        'id': 'temperature',
        'label': 'Temperature units',
        'type': 'unit',
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
            'label': 'K'
          }
        ]
      },
      {
        'id': 'windSpeed',
        'label': 'Wind speed',
        'type': 'unit',
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
      },
      {
        'id': 'precipitations',
        'label': 'precipitations',
        'type': 'unit',
        'values': [
          {
            'key': 'mh',
            'label': 'm/hr'
          },
          {
            'key': 'mmh',
            'label': 'mm/hr'
          // },
          // {
          //   'key': 'Kg/m2/s',
          //   'label': 'Kg/m2/s'
          // },
          // {
          //   'key': 'mm/day',
          //   'label': 'mm/day'
          // },
          // {
          //   'key': 'in/day',
          //   'label': 'in/day'
          }
        ]
      },
      {
        'id': 'floodWarning',
        'label': 'Flood warnings',
        'type': 'alert',
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
        'id': 'pressure',
        'label': 'Pressure',
        'type': 'unit',
        'values': [
          {
            'key': 'Pa',
            'label': 'Pa'
          },
          {
            'key': 'hPa',
            'label': 'hPa'
          }
        ]
      },
      {
        'id': 'stormWarning',
        'label': 'Storm warnings',
        'type': 'alert',
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

    // try {
    //   const response = await axios.get(
    //     `${urlRoot}/mock/settings.json`
    //   )
    //   return response.data
    // } catch (e) {
    //   return false
    // }
  },
  // async setSettings (settings) {
  //   try {
  //     const response = await axios.post(
  //       `${urlRoot}/settings`, settings
  //     )
  //     return response.data
  //   } catch (e) {
  //     return false
  //   }
  // },
  setDashboard (dashboard2Save) {
    dashboard = dashboard2Save
  },
  getDashboard () {
    return dashboard
  }
}
