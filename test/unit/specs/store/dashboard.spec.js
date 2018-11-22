import Dashboard from '@/store/dashboard'
import GeoResources from '@/store/geoResources'

jest.mock('@/store/geoResources', () => ({
  getAll: jest.fn()
}))
GeoResources.getAll.mockReturnValue([
  {
    id: 1,
    displayName: 'displayName1'
  }, {
    id: 2,
    displayName: 'displayName2'
  }
])

describe('dashboard.js', () => {
  it('Calls constructor, getCards', async () => {
    let dashboard = new Dashboard()
    expect(dashboard.title).toBe(Dashboard.getDefaultTitle())
    expect(dashboard.cards.length).toBe(0)

    const title = 'dashboard2'
    const cards = [{}, {}]
    let dashboard2 = new Dashboard(title, cards)
    expect(dashboard2.title).toBe(title)
    expect(dashboard2.getCards().length).toBe(cards.length)
  })

  it('Calls addCard, setCard, getCard, removeCard', () => {
    let dashboard = new Dashboard()

    // add card
    expect(dashboard.addCard().id).toBe(1)
    expect(dashboard.addCard().id).toBe(2)
    const adding3 = dashboard.addCard({id: 2, heightClass: 'heigh-small'})
    expect(adding3.id).toBe(3)
    expect(adding3.heightClass).toBe('heigh-small')

    // set card
    dashboard.setCard({id: 1, heightClass: 'heigh-small'})
    const cardSet = dashboard.getCard(1)
    expect(cardSet.id).toBe(1)
    expect(cardSet.heightClass).toBe('heigh-small')
    // Create new card if no id
    dashboard.setCard({heightClass: 'heigh-large'})
    expect(dashboard.getCard(4).heightClass).toBe('heigh-large')

    // remove card
    dashboard.removeCard(4)
    expect(dashboard.getCard(4)).toBeFalsy()
  })

  it('Calles field parameter callback for forecast data', () => {
    const fieldForecastParameter = Dashboard.getCardWidgets()[0].formFields[0]
    expect(fieldForecastParameter.value.label).toBe(fieldForecastParameter.options[0].label)
    let card = {}
    fieldForecastParameter.onChange(card)
    expect(card.title).toBe(fieldForecastParameter.value.label)

    fieldForecastParameter.value = fieldForecastParameter.options[1]
    expect(fieldForecastParameter.value.label).toBe(fieldForecastParameter.options[1].label)
    fieldForecastParameter.onChange(card)
    expect(card.title).toBe(fieldForecastParameter.value.label)
  })
})
