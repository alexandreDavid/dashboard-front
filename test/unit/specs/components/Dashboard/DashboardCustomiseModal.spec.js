import DashboardCustomiseModal from '@/components/Dashboard/DashboardCustomiseModal'
import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal/Modal'
import Dashboard from '@/store/dashboard'

jest.mock('@/store/dashboard', () => ({
  getLayouts: jest.fn()
}))

describe('DashboardCustomiseModal.vue', () => {
  it('Create without layout', () => {
    const defaultLayout = {
      default: true
    }
    Dashboard.getLayouts.mockReturnValue([
      {},
      defaultLayout,
      {}
    ])
    const wrapper = shallowMount(DashboardCustomiseModal, {
      propsData: {
        dashboard: {}
      },
      stubs: {
        Modal: Modal
      }
    })
    expect(wrapper.vm.customisation).toEqual({ layout: defaultLayout })
  })

  it('Emit event when modal close', () => {
    const wrapper = shallowMount(DashboardCustomiseModal, {
      propsData: {
        dashboard: {
          layout: true
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
    const customisation = 'customisation'
    const wrapper = shallowMount(DashboardCustomiseModal, {
      propsData: {
        dashboard: {
          layout: true
        }
      },
      stubs: {
        Modal: Modal
      }
    })
    wrapper.vm.validate(customisation)
    expect(wrapper.emitted().validate[0]).toEqual([ customisation ])
  })
})
