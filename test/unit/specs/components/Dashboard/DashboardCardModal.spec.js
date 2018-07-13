import DashboardCardModal from '@/components/Dashboard/DashboardCardModal'
import Dashboard from '@/store/dashboard'
import { mount } from '@vue/test-utils'
import Modal from '@/components/Modal/Modal'

describe('DashboardCardModal.vue', () => {
  let wrapper
  beforeEach(() => {
    let dashboard = new Dashboard()
    dashboard.addCard()

    wrapper = mount(DashboardCardModal, {
      propsData: {
        editedCard: dashboard.cards[0],
        allParameters: []
      }
    })
  })

  it('Calls click delete', () => {
    const button = wrapper.find('.delete')

    button.trigger('click')
    expect(wrapper.emitted().delete).toBeTruthy()
  })

  it('Change selected size', () => {
    const buttons = wrapper.findAll('.change-selected-size .btn')
    const dashboardWidths = Dashboard.getCardWidths()
    expect(buttons.length).toBe(dashboardWidths.length)
    buttons.at(1).trigger('click')
    expect(buttons.at(1).classes()).toContain('active')
    wrapper.vm.activeSize = dashboardWidths[1]

    buttons.at(2).trigger('click')
    expect(buttons.at(1).classes()).not.toContain('active')
    expect(buttons.at(2).classes()).toContain('active')
    wrapper.vm.activeSize = dashboardWidths[2]
  })

  it('Change selected height', () => {
    const buttons = wrapper.findAll('.change-selected-height .btn')
    const dashboardHeights = Dashboard.getCardHeights()
    expect(buttons.length).toBe(dashboardHeights.length)
    buttons.at(1).trigger('click')
    expect(buttons.at(1).classes()).toContain('active')
    wrapper.vm.activeHeight = dashboardHeights[1]

    buttons.at(2).trigger('click')
    expect(buttons.at(1).classes()).not.toContain('active')
    expect(buttons.at(2).classes()).toContain('active')
    wrapper.vm.activeHeight = dashboardHeights[2]
  })

  it('Change selected widget', () => {
    const selectOptions = wrapper.findAll('.change-selected-widget option')
    const dashboardWidgets = Dashboard.getCardWidgets()
    expect(selectOptions.length).toBe(dashboardWidgets.length)
    selectOptions.at(1).setSelected()
    wrapper.vm.activeHeight = dashboardWidgets[1]

    selectOptions.at(2).setSelected()
    wrapper.vm.activeHeight = dashboardWidgets[2]
  })

  it('Emit event when modal close', () => {
    wrapper.find(Modal).vm.$emit('close')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
