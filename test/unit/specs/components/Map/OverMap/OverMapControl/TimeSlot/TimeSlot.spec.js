import TimeSlot from '@/components/Map/OverMap/OverMapControl/TimeSerie/TimeSlot'
import { mount } from '@vue/test-utils'

const mockTimes = [
  {startTime: 0, endTime: 1},
  {startTime: 1, endTime: 2},
  {startTime: 2, endTime: 3},
  {startTime: 3, endTime: 4},
  {startTime: 4, endTime: 5}
]

jest.useFakeTimers()

describe('TimeSlot.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(TimeSlot, {
      propsData: {
        model: {
          label: '2 days',
          times: mockTimes,
          type: 'interval',
          layer: 'layer'
        }
      }
    })
  })

  it('Check current date inside time serie', () => {
    const i = 1
    Date.now = jest.genMockFunction().mockReturnValue(i * 1000)
    const wrapper = mount(TimeSlot, {
      propsData: {
        model: {
          label: '2 days',
          times: mockTimes,
          type: 'interval'
        }
      }
    })
    const nowButton = wrapper.find('.now')
    expect(nowButton.isVisible()).toBe(true)
    expect(wrapper.vm.calculateNowPlacement()).toEqual(wrapper.vm.getTransformValues(i))
  })

  it('Check current date outside time serie', () => {
    Date.now = jest.genMockFunction().mockReturnValue(10000000000000)
    const wrapper = mount(TimeSlot, {
      propsData: {
        model: {
          label: '2 days',
          times: mockTimes,
          type: 'interval'
        }
      }
    })
    const nowButton = wrapper.find('.now')
    expect(nowButton.isVisible()).toBe(false)
    expect(wrapper.vm.calculateNowPlacement()).toEqual({
      display: 'none'
    })
  })

  it('Click on play and stop at the end', () => {
    expect(wrapper.vm.isPlaying).toBe(false)

    expect(wrapper.vm.currentIndex).toBe(0)
    setTimeout.mockClear()
    expect(setTimeout).toHaveBeenCalledTimes(0)

    wrapper.find('#time-play').trigger('click')
    expect(wrapper.vm.isPlaying).toBe(true)

    for (let i = 1; i < wrapper.vm.model.times.length - 1; i++) {
      expect(setTimeout).toHaveBeenCalledTimes(i)
      expect(wrapper.vm.currentIndex).toBe(i)
      jest.advanceTimersByTime(wrapper.vm.activeDateDuration)
    }
    jest.advanceTimersByTime(wrapper.vm.activeDateDuration)
    expect(wrapper.vm.isPlaying).toBe(false)
  })

  it('Click on play and click on pause', () => {
    expect(wrapper.vm.isPlaying).toBe(false)

    expect(wrapper.vm.currentIndex).toBe(0)
    setTimeout.mockClear()

    const timePlayButton = wrapper.find('#time-play')
    const timePauseButton = wrapper.find('#time-pause')

    // Click play
    timePlayButton.trigger('click')
    expect(timePlayButton.isVisible()).toBe(false)
    expect(timePauseButton.isVisible()).toBe(true)
    expect(wrapper.vm.isPlaying).toBe(true)

    function checkCallTimeout (idx) {
      expect(setTimeout).toHaveBeenCalledTimes(idx)
      expect(wrapper.vm.currentIndex).toBe(idx)
      jest.advanceTimersByTime(wrapper.vm.activeDateDuration)
    }

    for (let i = 1; i < 3; i++) {
      checkCallTimeout(i)
    }
    expect(wrapper.vm.isPlaying).toBe(true)
    expect(timePlayButton.isVisible()).toBe(false)
    expect(timePauseButton.isVisible()).toBe(true)

    // Click stop
    timePauseButton.trigger('click')

    expect(timePlayButton.isVisible()).toBe(true)
    expect(timePauseButton.isVisible()).toBe(false)
    expect(wrapper.vm.isPlaying).toBe(false)

    // Called only one time
    checkCallTimeout(3)
    checkCallTimeout(3)
    checkCallTimeout(3)
  })

  it('Click on a time', () => {
    const timeButtons = wrapper.findAll('.time-slot.with-indicator')
    expect(timeButtons.length).toBe(mockTimes.length + 1)

    expect(wrapper.vm.currentIndex).toBe(0)
    timeButtons.at(2).trigger('click')
    expect(wrapper.vm.currentIndex).toBe(2)
  })
})
