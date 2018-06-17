import Parameter from '@/store/parameter.js'

const cardWidths = [
  {
    id: 'XS',
    label: 'XS',
    class: 'col-md-4 col-lg-3'
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

let allParameters = []

export default class Dashboard {
  constructor (title = '', cards = []) {
    this.title = title
    this.cards = cards
  }
  addCard (card = {}) {
    card.id = Math.round(Math.random() * 100)
    let widthClass = Dashboard.getCardWidths()[2].class
    let heightClass = Dashboard.getCardHeights()[1].class
    let widget = Dashboard.getCardWidgets()[0]
    let title = ''
    card = Object.assign({}, {widthClass, heightClass, widget, title}, card)
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
  static getCardWidths () {
    return cardWidths
  }
  static getCardHeights () {
    return cardHeights
  }
  static getCardWidgets () {
    let allParameters = Parameter.getParams()
    let fieldParameter = {
      id: 'parameter',
      label: 'Parameter',
      type: 'select',
      options: allParameters,
      value: allParameters[0]
    }

    return [
      {
        id: 'graph',
        label: 'Graph',
        formFields: [fieldParameter]
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
      }
    ]
  }
}
