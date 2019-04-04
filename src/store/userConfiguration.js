let configuration = {
  dashboard: {
    'title': 'Dashboard',
    'cards': [
      {
        'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'title': 'Temperature',
        'id': 3,
        'widgetId': 'graph',
        'parameter': {id: 1},
        'graphType': {'value': 'BarChart', 'label': 'Bar chart'}
      }, {
        'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'title': 'Temperature',
        'id': 4,
        'widgetId': 'map',
        'parameter': {id: 1}
      }
    ]
  },
  dashboards: [],
  activeArea: false,
  activeSettings: {
    temperature: 'C',
    windSpeed: 'mph',
    pressure: 'Pa',
    precipitations: 'Kg/m2/s',
    floodWarning: false,
    stormWarning: false
  },
  activeBaseMapLayer: false,
  selectedLayers: [],
  displayHelp: true,
  definedAreas: [],
  updateIndex: 0
}

function getConfiguration (configName) {
  let foundConfig
  if (localStorage.getItem(configName)) {
    try {
      foundConfig = JSON.parse(localStorage.getItem(configName))
    } catch (e) {
      localStorage.removeItem(configName)
    }
  }
  return (typeof foundConfig !== 'undefined') ? foundConfig : configuration[configName]
}
function setConfiguration (configName, value) {
  const parsed = JSON.stringify(value)
  localStorage.setItem(configName, parsed)
}

let userConfiguration = {}

Object.keys(configuration).forEach(config => {
  const configFuncName = config.charAt(0).toUpperCase() + config.slice(1)
  userConfiguration[`get${configFuncName}`] = function () {
    return getConfiguration(config)
  }
  userConfiguration[`set${configFuncName}`] = function (value) {
    return setConfiguration(config, value)
  }
  userConfiguration[`remove${configFuncName}`] = function (value) {
    return localStorage.removeItem(config)
  }
})

export default userConfiguration
