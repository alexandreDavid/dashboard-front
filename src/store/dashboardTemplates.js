import Dashboard from '@/store/dashboard'

export default {
  getStarterDashboard () {
    return {
      title: 'Starter dashboard',
      layout: Dashboard.getLayouts().find(l => l.default),
      widgets: [
        {
          id: 1,
          colIndex: 0,
          resource: {
            id: 1,
            label: 'Temperature (2-day)'
          },
          title: 'Temperature (2-day)',
          description: '',
          type: 'map',
          advancedConfig: false,
          advancedOpacity: false,
          advancedHeight: false,
          advancedCustomHeight: false,
          advancedArea: false
        },
        {
          id: 2,
          colIndex: 0,
          resource: {
            id: 1,
            label: 'Temperature (2-day)'
          },
          title: 'Temperature (2-day)',
          description: '',
          type: 'graph'
        },
        {
          id: 3,
          colIndex: 1,
          resource: {
            id: 3,
            label: 'Relative Humidity (2-day)'
          },
          title: 'Relative Humidity (2-day)',
          description: '',
          type: 'map',
          advancedConfig: false,
          advancedOpacity: false,
          advancedHeight: false,
          advancedCustomHeight: false,
          advancedArea: false
        },
        {
          id: 4,
          colIndex: 1,
          resource: {
            id: 3,
            label: 'Relative Humidity (2-day)'
          },
          title: 'Relative Humidity (2-day)',
          description: '',
          type: 'graph'
        }
      ]
    }
  }
}
