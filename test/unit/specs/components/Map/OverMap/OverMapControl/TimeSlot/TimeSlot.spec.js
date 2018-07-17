import TimeSlot from '@/components/Map/OverMap/OverMapControl/TimeSlot/TimeSlot'
import { mount } from '@vue/test-utils'

const currentDaysModel = TimeSlot.methods.getDaysModels()[0]

jest.useFakeTimers()

describe('TimeSlot.vue', () => {
  it('Check current date inside time serie', () => {
    Date.now = jest.genMockFunction().mockReturnValue(currentDaysModel.times[2] * 1000)
    const wrapper = mount(TimeSlot)
    const nowButton = wrapper.find('.now')
    expect(nowButton.isVisible()).toBe(true)
    // This check doesn't work
    // expect(nowButton.hasStyle('transform', 'translateX(100px)')).toBe(true)
    expect(wrapper.vm.calculateNowPlacement()).toEqual(wrapper.vm.getTransformValues(2))
  })

  it('Check current date outside time serie', () => {
    Date.now = jest.genMockFunction().mockReturnValue(10000000000000)
    const wrapper = mount(TimeSlot)
    const nowButton = wrapper.find('.now')
    expect(nowButton.isVisible()).toBe(false)
    expect(wrapper.vm.calculateNowPlacement()).toEqual({
      display: 'none'
    })
  })

  it('Change selected model', () => {
    const wrapper = mount(TimeSlot)
    expect(wrapper.vm.activeModel).toEqual(currentDaysModel)
    const buttons = wrapper.findAll('.change-selected-model')
    expect(buttons.length).toBe(3)
    buttons.at(1).trigger('click')
    expect(wrapper.vm.activeModel).toEqual(wrapper.vm.getDaysModels()[1])
  })

  it('Click on play and stop at the end', () => {
    const wrapper = mount(TimeSlot)
    expect(wrapper.vm.isPlaying).toBe(false)

    expect(wrapper.vm.currentIndex).toBe(0)
    setTimeout.mockClear()

    wrapper.find('#time-play').trigger('click')
    expect(wrapper.vm.isPlaying).toBe(true)

    for (let i = 1; i < currentDaysModel.times.length - 2; i++) {
      expect(setTimeout).toHaveBeenCalledTimes(i)
      expect(wrapper.vm.currentIndex).toBe(i)
      jest.advanceTimersByTime(1000)
    }
    jest.advanceTimersByTime(1000)
    expect(wrapper.vm.isPlaying).toBe(false)
  })

  it('Click on play and click on pause', () => {
    const wrapper = mount(TimeSlot)
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
      jest.advanceTimersByTime(1000)
    }

    for (let i = 1; i < 5; i++) {
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
    checkCallTimeout(5)
    checkCallTimeout(5)
    checkCallTimeout(5)
  })

  it('Click on a time', () => {
    const wrapper = mount(TimeSlot)
    const timeButtons = wrapper.findAll('.time-slot.with-indicator')
    expect(timeButtons.length).toBe(13)

    expect(wrapper.vm.currentIndex).toBe(0)
    timeButtons.at(3).trigger('click')
    expect(wrapper.vm.currentIndex).toBe(3)
  })
})
