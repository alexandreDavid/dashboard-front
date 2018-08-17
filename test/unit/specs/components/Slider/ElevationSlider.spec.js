import ElevationSlider from '@/components/Slider/ElevationSlider'
import { mount } from '@vue/test-utils'

describe('ElevationSlider.vue', () => {
  it('Init without value', () => {
    const wrapper = mount(ElevationSlider)
    wrapper.vm.$nextTick()
    expect(wrapper.vm.val).toBe(0)
  })

  it('Init with value', () => {
    const wrapper = mount(ElevationSlider, {
      propsData: {
        value: 50
      }
    })
    wrapper.vm.$nextTick()
    expect(wrapper.vm.val).toBe(50)
  })

  it('Change value', (done) => {
    const wrapper = mount(ElevationSlider, {
      propsData: {
        value: 50
      }
    })
    wrapper.setProps({value: 20})
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.val).toBe(20)
      done()
    })
  })
})
