import UserConfiguration from '@/store/userConfiguration'
import Dashboards from '@/store/dashboards'
import GeoResources from '@/store/geoResources'

const cardWidths = [
  {
    id: 'XS',
    label: 'XS',
    class: 'col-6 col-lg-3'
  }, {
    id: 'S',
    label: 'S',
    class: 'col-md-4'
  }, {
    id: 'M',
    label: 'M',
    class: 'col-md-6'
  }, {
    id: 'L',
    label: 'L',
    class: 'col-md-8'
  }, {
    id: 'XL',
    label: 'XL',
    class: 'col-12'
  }
]
const cardHeights = [
  {
    id: 'S',
    label: 'S',
    class: 'heigh-small'
  }, {
    id: 'M',
    label: 'M',
    class: 'height-medium'
  }, {
    id: 'L',
    label: 'L',
    class: 'height-large'
  }
]

export default class Dashboard {
  constructor (config = {}) {
    this.id = config.id
    this.title = config.title
    this.layout = config.layout
    this.widgets = config.widgets || []
  }
  addWidget (widget = {}) {
    // get max id plus 1
    widget.id = Math.max(...this.widgets.map(w => {
      return w.id
    }), 0) + 1
    widget.widthClass = 'col-12'
    widget.heightClass = 'height-medium'
    this.widgets.push(widget)
    return widget
  }
  getWidgets () {
    return this.widgets
  }
  getWidget (id) {
    return this.widgets.find((c) => c.id === id)
  }
  setWidget (widget) {
    if (widget.id) {
      Object.assign(this.getWidget(widget.id), widget)
    } else {
      this.addWidget(widget)
    }
  }
  removeWidget (widget) {
    this.widgets.splice(this.widgets.findIndex(c => c.id === widget.id), 1)
  }
  save () {
    Dashboards.setDashboard(this)
  }
  static getDefaultTitle () {
    return 'Dashboard'
  }
  static getDefaultCard () {
    let widthClass = Dashboard.getCardWidths()[2].class
    let heightClass = Dashboard.getCardHeights()[1].class
    return {widthClass, heightClass}
    // let widget = Dashboard.getCardWidgets()[0]
    // let title = Dashboard.getCardWidgets()[0].formFields[0].value.label
    // return {widthClass, heightClass, widget, title}
  }
  static getCardWidths () {
    return cardWidths
  }
  static getCardHeights () {
    return cardHeights
  }
  static getCardWidgets () {
    let allResources = GeoResources.getAll()
    let allParameters = allResources.map(p => ({
      id: p.id,
      label: p.label
    }))
    let allParametersForGraph = allResources.filter(p => p.config.statistics).map(p => ({
      id: p.id,
      label: p.label
    }))
    function getFieldParameter (allParameters) {
      return {
        id: 'parameter',
        label: 'Data to display',
        type: 'select',
        options: allParameters,
        value: allParameters[0],
        onChange (card) {
          card.title = this.value.label
        }
      }
    }

    const graphTypes = [
      {
        value: 'BarChart',
        label: 'Bar chart'
      },
      {
        value: 'LineChart',
        label: 'Line chart'
      },
      {
        value: 'PieChart',
        label: 'Pie chart'
      }
    ]

    return [
      {
        id: 'graph',
        label: 'Graph',
        formFields: [getFieldParameter(allParametersForGraph), {
          id: 'graphType',
          label: 'Graph type',
          type: 'select',
          options: graphTypes,
          value: graphTypes[0]
        }]
      }, {
        id: 'map',
        label: 'Map',
        formFields: [getFieldParameter(allParameters)]
      }, {
        id: 'currentmap',
        label: 'Current map'
      }, {
        id: 'textarea',
        label: 'Text',
        formFields: [{
          id: 'text',
          type: 'textarea',
          value: ''
        }]
      }, {
        id: 'table',
        label: 'Table'
      }
    ]
  }
  static getSavedDashboard () {
    const savedDashboard = UserConfiguration.getDashboard()
    return new Dashboard(savedDashboard.title, savedDashboard.cards)
  }
}
