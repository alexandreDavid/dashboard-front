import Dashboards from '@/store/dashboards'

export default class Dashboard {
  constructor (config = {}) {
    this.id = config.id
    this.title = config.title
    this.description = config.description || ''
    this.layout = config.layout
    this.area = config.area
    this.widgets = config.widgets || []
  }
  addWidget (widget = {}) {
    // get max id plus 1
    widget.id = Math.max(...this.widgets.map(w => {
      return w.id
    }), 0) + 1
    widget.description = widget.description || ''
    widget.colIndex = 0
    this.widgets.push(widget)
    return widget
  }
  getWidgets () {
    return this.widgets
  }
  getWidget (id) {
    return this.widgets.find(w => w.id === id)
  }
  setWidget (widget) {
    if (widget.id) {
      Object.assign(this.getWidget(widget.id), widget)
    } else {
      this.addWidget(widget)
    }
  }
  setLayout (layout) {
    this.layout = layout
    const lastColIndex = (layout.columns.length - 1)
    this.widgets.forEach(w => {
      if (w.colIndex > lastColIndex) {
        w.colIndex = lastColIndex
      }
    })
  }
  removeWidget (widget) {
    this.widgets.splice(this.widgets.findIndex(c => c.id === widget.id), 1)
  }
  save () {
    Dashboards.setDashboard(this)
  }

  static getLayouts () {
    const sixtysix = {
      name: '66%',
      class: 'col-md-8'
    }
    const fifty = {
      name: '50%',
      class: 'col-md-6'
    }
    const thirtythree = {
      name: '33%',
      class: 'col-md-4'
    }
    const twentyfive = {
      name: '25%',
      class: 'col-6 col-lg-3'
    }
    return [
      {
        id: '100',
        columns: [
          {
            name: '100%',
            class: 'col-12'
          }
        ]
      },
      {
        id: '50-50',
        default: true,
        columns: [
          fifty,
          fifty
        ]
      },
      {
        id: '25-25-25-25',
        columns: [
          twentyfive,
          twentyfive,
          twentyfive,
          twentyfive
        ]
      },
      {
        id: '33-33-33',
        columns: [
          thirtythree,
          thirtythree,
          thirtythree
        ]
      },
      {
        id: '33-66',
        columns: [
          thirtythree,
          sixtysix
        ]
      },
      {
        id: '66-33',
        columns: [
          sixtysix,
          thirtythree
        ]
      }
    ]
  }
}
