import DashboardNewModal from '@/components/Dashboard/New/DashboardNewModal'
import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal/Modal'

describe('DashboardNewModal.vue', () => {
  it('Emit event when modal close', () => {
    const wrapper = shallowMount(DashboardNewModal, {
      stubs: {
        Modal: Modal
      }
    })
    wrapper.find(Modal).vm.$emit('close')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('On validate', () => {
    const wrapper = shallowMount(DashboardNewModal, {
      stubs: {
        Modal: Modal
      }
    })
    wrapper.vm.validate({})
    expect(wrapper.emitted().validate[0]).toEqual([ {} ])
  })
})
