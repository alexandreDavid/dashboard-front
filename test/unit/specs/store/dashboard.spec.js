import Dashboard from '@/store/dashboard'
import Parameter from '@/store/parameter'

jest.mock('@/store/parameter', () => ({
  getParams: jest.fn()
}))
Parameter.getParams.mockReturnValue([
  {
    id: 1,
    displayName: 'displayName1'
  }, {
    id: 2,
    displayName: 'displayName1'
  }
])

describe('dashboard.js', () => {
  it('Calls constructor, getCards', async () => {
    let dashboard = new Dashboard()
    expect(dashboard.title).toBeFalsy()
    expect(dashboard.cards.length).toBe(0)

    const title = 'dashboard2'
    const cards = [{}, {}]
    let dashboard2 = new Dashboard(title, cards)
    expect(dashboard2.title).toBe(title)
    expect(dashboard2.getCards()).toBe(cards)
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
})
