import Modal from '@/components/Modal/Modal'
import { shallowMount } from '@vue/test-utils'

describe('Modal.vue', () => {
  it('On click on close button', () => {
    const wrapper = shallowMount(Modal, {
      slots: {
        header: '<p>mockedHeader</p>'
      }
    })
    expect(wrapper.find('.modal-header').exists()).toBe(true)
    wrapper.find('.close').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('On click outside', () => {
    const wrapper = shallowMount(Modal)
    // With the mask you have to check if it maches exactly
    wrapper.vm.handleClickOutside({target: wrapper.vm.$el})
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('On click inside', () => {
    const wrapper = shallowMount(Modal, {
      slots: {
        header: '<p class="mocked-header">mockedHeader</p>'
      }
    })
    expect(wrapper.find('.mocked-header').exists()).toBe(true)
    wrapper.vm.handleClickOutside({target: wrapper.find('.mocked-header')})
    expect(wrapper.emitted().close).toBeUndefined()
  })

  it('On destroy', () => {
    document.removeEventListener = jest.fn()
    const wrapper = shallowMount(Modal)
    wrapper.destroy()
    expect(document.removeEventListener).toHaveBeenCalledTimes(1)
  })
})
