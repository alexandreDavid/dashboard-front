import TimeSlider from '@/components/Slider/TimeSlider'
import { mount } from '@vue/test-utils'

const date1 = new Date('2018-08-01T00:00:00') / 1000
const date2 = new Date('2018-09-01T00:00:00') / 1000
const date3 = new Date('2018-10-01T00:00:00') / 1000
const date4 = new Date('2018-11-01T00:00:00') / 1000
const mockTimes = [
  date1, date2, date3, date4
]

describe('TimeSlider.vue', () => {
  it('Init with value', () => {
    const wrapper = mount(TimeSlider, {
      propsData: {
        value: date1,
        model: {
          times: mockTimes
        }
      }
    })
    wrapper.vm.$nextTick()
    expect(wrapper.vm.val).toBe(date1)
    expect(wrapper.find('.vue-slider-dot .vue-slider-tooltip').text()).toBe('1/08')
  })

  it('Change value from ext', () => {
    const wrapper = mount(TimeSlider, {
      propsData: {
        value: date1,
        model: {
          times: mockTimes
        }
      }
    })
    wrapper.setProps({value: date4})
    expect(wrapper.vm.val).toBe(date4)
    expect(wrapper.find('.vue-slider-dot .vue-slider-tooltip').text()).toBe('1/11')
  })
})
