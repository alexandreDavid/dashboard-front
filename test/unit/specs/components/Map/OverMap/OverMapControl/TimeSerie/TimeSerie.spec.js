import TimeSerie from '@/components/Map/OverMap/OverMapControl/TimeSerie/TimeSerie'
import { shallowMount } from '@vue/test-utils'

import PlayButton from '@/components/Map/OverMap/OverMapControl/TimeSerie/PlayButton'
import TimeSlider from '@/components/Slider/TimeSlider'

const mockTimes = [1, 2, 3, 4, 5, 6]

describe('TimeSerie.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(TimeSerie, {
      propsData: {
        value: 1,
        times: mockTimes
      }
    })
  })

  it('No times nothing displayed', () => {
    expect(wrapper.find(PlayButton).exists()).toBe(true)
    wrapper.setProps({
      times: []
    })
    expect(wrapper.find(PlayButton).exists()).toBe(false)
  })

  it('Change emitted from play-button', () => {
    const emittedVal = 'valFromPlayButton'
    wrapper.find(PlayButton).vm.$emit('input', emittedVal)
    // expect(wrapper.emitted().input).toEqual([[emittedVal]])
    // expect(wrapper.vm.val).toEqual(emittedVal)
  })

  it('Change emitted from time-slider', () => {
    const emittedVal = 'valFromTimeSlider'
    wrapper.find(TimeSlider).vm.$emit('input', emittedVal)
    expect(wrapper.emitted().input[0]).toEqual([emittedVal])
    // expect(wrapper.vm.val).toEqual(emittedVal)
  })
})
