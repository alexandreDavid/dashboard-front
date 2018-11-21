import UserConfiguration from '@/store/userConfiguration'
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

function prepareCard (card) {
  let widget = Dashboard.getCardWidgets().find(w => w.id === card.widgetId)
  if (widget) {
    widget.formFields && widget.formFields.map(field => {
      if (card[field.id]) {
        field.value = card[field.id]
      }
      return field
    })
  }
  return {
    widthClass: card.widthClass,
    heightClass: card.heightClass,
    title: card.title,
    id: card.id,
    widget: widget
  }
}

function prepareCardForSaving (card) {
  const widget = card.widget
  let card2save = {
    widthClass: card.widthClass,
    heightClass: card.heightClass,
    title: card.title,
    id: card.id,
    widgetId: widget.id
  }
  widget.formFields && widget.formFields.forEach(field => {
    card2save[field.id] = field.value
  })
  return card2save
}

export default class Dashboard {
  constructor (title = Dashboard.getDefaultTitle(), cards = []) {
    this.title = title
    this.cards = cards.map(card => prepareCard(card))
  }
  addCard (card = {}) {
    // get max id plus 1
    card.id = Math.max(...this.cards.map(c => {
      return c.id
    }), 0) + 1
    card = Object.assign({}, Dashboard.getDefaultCard(), card)
    this.cards.push(card)
    return card
  }
  getCards () {
    return this.cards
  }
  getCard (id) {
    return this.cards.find((c) => c.id === id)
  }
  setCard (card) {
    if (card.id) {
      Object.assign(this.getCard(card.id), card)
    } else {
      this.addCard(card)
    }
  }
  removeCard (card) {
    this.cards.splice(this.cards.findIndex(c => c.id === card.id), 1)
  }
  save () {
    UserConfiguration.setDashboardConfiguration({
      title: this.title,
      cards: this.cards.map(prepareCardForSaving)
    })
  }
  static getDefaultTitle () {
    return 'Dashboard'
  }
  static getDefaultCard () {
    let widthClass = Dashboard.getCardWidths()[2].class
    let heightClass = Dashboard.getCardHeights()[1].class
    let widget = Dashboard.getCardWidgets()[0]
    let title = Dashboard.getCardWidgets()[0].formFields[0].value.label
    return {widthClass, heightClass, widget, title}
  }
  static getCardWidths () {
    return cardWidths
  }
  static getCardHeights () {
    return cardHeights
  }
  static getCardWidgets () {
    let allParameters = GeoResources.getAll().map(p => {
      return {
        id: p.id,
        label: p.name
      }
    })
    let fieldParameter = {
      id: 'parameter',
      label: 'Data to display',
      type: 'select',
      options: allParameters,
      value: allParameters[0],
      onChange (card) {
        card.title = this.value.label
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
        formFields: [fieldParameter, {
          id: 'graphType',
          label: 'Graph type',
          type: 'select',
          options: graphTypes,
          value: graphTypes[0]
        }]
      }, {
        id: 'map',
        label: 'Map',
        formFields: [fieldParameter]
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
    const savedDashboard = UserConfiguration.getDashboardConfiguration()
    return new Dashboard(savedDashboard.title, savedDashboard.cards)
  }
}
