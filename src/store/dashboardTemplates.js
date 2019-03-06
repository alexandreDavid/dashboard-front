import Dashboard from '@/store/dashboard'
import DefinedAreas from '@/store/definedAreas'

export default {
  getStarterDashboard () {
    const area = DefinedAreas.getActiveArea()
    return {
      title: 'Starter dashboard',
      layout: Dashboard.getLayouts().find(l => l.default),
      widgets: [
        {
          id: 1,
          colIndex: 0,
          area,
          resource: {
            id: 1,
            label: 'Temperature (2-day)'
          },
          title: `${area.name} - Temperature (2-day)`,
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
          area,
          resource: {
            id: 1,
            label: 'Temperature (2-day)'
          },
          title: `${area.name} - Temperature (2-day)`,
          description: '',
          type: 'graph',
          advancedConfig: false
        },
        {
          id: 3,
          colIndex: 1,
          area,
          resource: {
            id: 3,
            label: 'Relative Humidity (2-day)'
          },
          title: `${area.name} - Relative Humidity (2-day)`,
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
          area,
          resource: {
            id: 3,
            label: 'Relative Humidity (2-day)'
          },
          title: `${area.name} - Relative Humidity (2-day)`,
          description: '',
          type: 'graph',
          advancedConfig: false
        }
      ]
    }
  }
}
