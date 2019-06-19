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

  it('On validate valid', () => {
    const card = 'card'
    const wrapper = shallowMount(DashboardCardModal, {
      propsData: {
        value: {
          isValid: true
        }
      },
      stubs: {
        Modal: Modal
      }
    })
    expect(wrapper.vm.showError).toBe(false)
    wrapper.vm.validate(card)
    expect(wrapper.emitted().input[0]).toEqual([ card ])
  })

  it('On validate not valid', () => {
    const wrapper = shallowMount(DashboardCardModal, {
      propsData: {
        value: {
          isValid: false
        }
      },
      stubs: {
        Modal: Modal
      }
    })
    expect(wrapper.vm.showError).toBe(false)
    wrapper.vm.validate({})
    expect(wrapper.vm.showError).toBe(true)
  })
})
