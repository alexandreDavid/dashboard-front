import Dashboard from '@/store/dashboard'
import Dashboards from '@/store/dashboards'

jest.mock('@/store/dashboards', () => ({
  setDashboard: jest.fn()
}))

describe('dashboard.js', () => {
  it('Calls constructor, getWidgets', async () => {
    let dashboard = new Dashboard()
    expect(dashboard.title).toBeFalsy()
    expect(dashboard.widgets.length).toBe(0)

    const title = 'dashboard2'
    const widgets = [{}, {}]
    let dashboard2 = new Dashboard({title, widgets})
    expect(dashboard2.title).toBe(title)
    expect(dashboard2.getWidgets().length).toBe(widgets.length)
  })

  it('Calls addWidget, setWidget, getWidget, removeWidget', () => {
    let dashboard = new Dashboard()

    // add card
    expect(dashboard.addWidget().id).toBe(1)
    expect(dashboard.addWidget().id).toBe(2)
    const adding3 = dashboard.addWidget({id: 2, heightClass: 'heigh-small'})
    expect(adding3.id).toBe(3)
    expect(adding3.heightClass).toBe('heigh-small')

    // set widget
    dashboard.setWidget({id: 1, heightClass: 'heigh-small'})
    const cardSet = dashboard.getWidget(1)
    expect(cardSet.id).toBe(1)
    expect(cardSet.heightClass).toBe('heigh-small')
    // Create new widget if no id
    dashboard.setWidget({heightClass: 'heigh-large'})
    expect(dashboard.getWidget(4).heightClass).toBe('heigh-large')

    // remove card
    dashboard.removeWidget(4)
    expect(dashboard.getWidget(4)).toBeFalsy()
  })

  it('Calls save', () => {
    let dashboard = new Dashboard()
    dashboard.save()
    expect(Dashboards.setDashboard).toBeCalled()
  })
})
