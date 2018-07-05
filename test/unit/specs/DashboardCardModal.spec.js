import DashboardCardModal from '@/components/Dashboard/DashboardCardModal'
import Dashboard from '@/store/dashboard'
import { mount } from '@vue/test-utils'

describe('DashboardCardModal.vue', () => {
  it('Calls click delete', () => {
    let dashboard = new Dashboard()
    dashboard.addCard()

    const wrapper = mount(DashboardCardModal, {
      propsData: { editedCard: dashboard.cards[0] }
    })

    const button = wrapper.find('.delete')
    button.trigger('click')
    expect(wrapper.emitted().delete).toBeTruthy()
  })
})
