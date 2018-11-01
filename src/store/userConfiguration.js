let configuration = {
  dashboard: {
    'title': 'Dashboard',
    'cards': [
      {
        'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'title': 'Air pressure at sea level',
        'id': 1,
        'widgetId': 'graph',
        'parameter': {'label': 'Air pressure at sea level (2 days forecast)'},
        'graphType': {'value': 'LineChart', 'label': 'Line chart'}
      }, {'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'title': 'Air pressure at sea level',
        'id': 2,
        'widgetId': 'map',
        'parameter': {'label': 'Air pressure at sea level (2 days forecast)'}
      }, {
        'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'title': 'Air temperature',
        'id': 3,
        'widgetId': 'graph',
        'parameter': {'label': 'Air temperature (2 days forecast)'},
        'graphType': {'value': 'LineChart', 'label': 'Line chart'}
      }, {
        'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'title': 'Air temperature',
        'id': 4,
        'widgetId': 'map',
        'parameter': {'label': 'Air temperature (2 days forecast)'}
      }
    ]
  },
  activeArea: {
    id: 7552,
    name: 'Uganda',
    type: 'country'
  },
  activeSettings: {
    temperature: 'C',
    windSpeed: 'mph',
    pressure: 'Pa',
    precipitations: 'Kg/m2/s',
    floodWarning: false,
    stormWarning: false
  },
  activeBaseMapLayer: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
}

export default {
  getDashboardConfiguration () {
    let dashboard
    if (localStorage.getItem('dashboard')) {
      try {
        dashboard = JSON.parse(localStorage.getItem('dashboard'))
      } catch (e) {
        localStorage.removeItem('dashboard')
      }
    }
    return dashboard || configuration.dashboard
  },
  setDashboardConfiguration (dashboard) {
    const parsed = JSON.stringify(dashboard)
    localStorage.setItem('dashboard', parsed)
  },
  getArea () {
    let activeArea
    if (localStorage.getItem('activeArea')) {
      try {
        activeArea = JSON.parse(localStorage.getItem('activeArea'))
      } catch (e) {
        localStorage.removeItem('activeArea')
      }
    }
    return activeArea || configuration.activeArea
  },
  setActiveArea (activeArea) {
    const parsed = JSON.stringify(activeArea)
    localStorage.setItem('activeArea', parsed)
  },
  getActiveSettings () {
    let activeSettings
    if (localStorage.getItem('activeSettings')) {
      try {
        activeSettings = JSON.parse(localStorage.getItem('activeSettings'))
      } catch (e) {
        localStorage.removeItem('activeSettings')
      }
    }
    return activeSettings || configuration.activeSettings
  },
  setActiveSettings (activeSettings) {
    const parsed = JSON.stringify(activeSettings)
    localStorage.setItem('activeSettings', parsed)
  },
  getActiveBaseMapLayer () {
    let activeBaseMapLayer
    if (localStorage.getItem('activeBaseMapLayer')) {
      try {
        activeBaseMapLayer = JSON.parse(localStorage.getItem('activeBaseMapLayer'))
      } catch (e) {
        localStorage.removeItem('activeBaseMapLayer')
      }
    }
    return activeBaseMapLayer || configuration.activeBaseMapLayer
  },
  setActiveBaseMapLayer (activeBaseMapLayer) {
    const parsed = JSON.stringify(activeBaseMapLayer)
    localStorage.setItem('activeBaseMapLayer', parsed)
  },
  getSelectedLayers () {
    let selectedLayers
    if (localStorage.getItem('selectedLayers')) {
      try {
        selectedLayers = JSON.parse(localStorage.getItem('selectedLayers'))
      } catch (e) {
        localStorage.removeItem('selectedLayers')
      }
    }
    return selectedLayers || []
  },
  setSelectedLayers (selectedLayers) {
    const parsed = JSON.stringify(selectedLayers)
    localStorage.setItem('selectedLayers', parsed)
  }
}
