import DashboardCardModal from '@/components/Dashboard/DashboardCardModal'
import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal/Modal'

describe('DashboardCardModal.vue', () => {
  it('Emit event when modal close', () => {
    const wrapper = shallowMount(DashboardCardModal, {
      propsData: {
        value: {
          id: 1,
          type: 'graph'
        }
      },
      stubs: {
        Modal: Modal
      }
    })
    wrapper.find(Modal).vm.$emit('close')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
