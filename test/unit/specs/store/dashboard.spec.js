import Dashboard from '@/store/dashboard'

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
})
