import Parameter from '@/store/parameter.js'

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
  constructor (title = Dashboard.getDefaultTitle(), cards = []) {
    this.title = title
    this.cards = cards
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
    let allParameters = Parameter.getParams().map(param => {
      param.label = param.displayName
      return param
    })
    let fieldParameter = {
      id: 'parameter',
      label: 'Parameter',
      type: 'select',
      options: allParameters,
      value: allParameters[0],
      onChange (card) {
        if (!card.title || this.options.map(({label}) => label).includes(card.title)) {
          card.title = this.value.label
        }
      }
    }

    const graphTypes = [
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
}
