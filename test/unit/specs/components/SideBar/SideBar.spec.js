import SideBar from '@/components/SideBar/SideBar.vue'
import { mount } from '@vue/test-utils'

describe('SideBar.vue', () => {
  it('Slot is well positioned', () => {
    const wrapper = mount(SideBar, {
      slots: {
        default: '<div class="fake-msg"></div>'
      }
    })
    expect(wrapper.find('.sidebar-container .fake-msg')).toBeTruthy()
  })

  it('Emit event on click on close button', () => {
    const wrapper = mount(SideBar)
    const button = wrapper.find('.close')
    button.trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('Emit event on click on click outside', () => {
    const wrapper = mount(SideBar)
    expect(wrapper.emitted().close).toBeFalsy()
    wrapper.vm.handleClickOutside({})
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('Not emit event on click on click inside', () => {
    const wrapper = mount(SideBar)
    expect(wrapper.emitted().close).toBeFalsy()
    wrapper.vm.handleClickOutside({target: wrapper.vm.$el})
    expect(wrapper.emitted().close).toBeFalsy()
  })
})
