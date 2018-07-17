import Modal from '@/components/Modal/Modal'
import { mount } from '@vue/test-utils'

describe('Modal.vue', () => {
  it('On click on close button', () => {
    const wrapper = mount(Modal, {
      slots: {
        header: '<p slot-scope="header">mockedHeader</p>'
      }
    })
    expect(wrapper.find('.modal-header').exists()).toBe(true)
    wrapper.find('.close').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('On click outside', () => {
    const wrapper = mount(Modal)
    // With the mask you have to check if it maches exactly
    wrapper.vm.handleClickOutside({target: wrapper.vm.$el})
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('On click inside', () => {
    const wrapper = mount(Modal, {
      slots: {
        header: '<p slot-scope="header" class=\'mocked-header\'>mockedHeader</p>'
      }
    })
    wrapper.vm.handleClickOutside({target: wrapper.find('.mocked-header').vm.$el})
    expect(wrapper.emitted().close).toBeUndefined()
  })

  it('On destroy', () => {
    document.removeEventListener = jest.fn()
    const wrapper = mount(Modal)
    wrapper.destroy()
    expect(document.removeEventListener).toHaveBeenCalledTimes(1)
  })
})
