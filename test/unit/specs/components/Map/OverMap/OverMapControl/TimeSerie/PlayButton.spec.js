import PlayButton from '@/components/Map/OverMap/OverMapControl/TimeSerie/PlayButton'
import { mount } from '@vue/test-utils'

const mockTimes = [1, 2, 3, 4, 5, 6]

jest.useFakeTimers()

describe('PlayButton.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(PlayButton, {
      propsData: {
        value: 1,
        times: mockTimes
      }
    })
  })

  it('toggle playing', () => {
    expect(wrapper.vm.isPlaying).toBe(false)
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.isPlaying).toBe(true)
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.isPlaying).toBe(false)
  })

  it('Click on play and click on pause', () => {
    expect(wrapper.vm.isPlaying).toBe(false)

    expect(wrapper.vm.currentIndex).toBe(0)
    setTimeout.mockClear()

    const playButton = wrapper.find('button')

    // Click play
    playButton.trigger('click')
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

    // Click stop
    playButton.trigger('click')

    expect(wrapper.vm.isPlaying).toBe(false)

    // Called only one time
    checkCallTimeout(3)
    checkCallTimeout(3)
    checkCallTimeout(3)
  })

  it('activePlay without waiting', () => {
    expect(wrapper.vm.isPlaying).toBe(false)
    expect(wrapper.vm.isWaiting).toBe(false)
    expect(wrapper.vm.currentIndex).toBe(0)

    wrapper.vm.isWaiting = true

    const playButton = wrapper.find('button')
    // Click play
    playButton.trigger('click')
    expect(wrapper.vm.isPlaying).toBe(true)
    expect(wrapper.vm.isWaiting).toBe(true)
    expect(wrapper.vm.currentIndex).toBe(0)
  })

  it('activePlay loop to the beginning', () => {
    wrapper.setProps({
      value: wrapper.vm.times[wrapper.vm.times.length - 1]
    })

    const playButton = wrapper.find('button')
    // Click play
    playButton.trigger('click')

    expect(wrapper.vm.currentIndex).toBe(0)
  })

  it('Pause on click outside', () => {
    wrapper.vm.isPlaying = true
    wrapper.vm.handleClickOutside({})
    expect(wrapper.vm.isPlaying).toBe(false)
  })

  it('Not pause on click inside', () => {
    wrapper.vm.isPlaying = true
    wrapper.vm.handleClickOutside({target: wrapper.vm.$el})
    expect(wrapper.vm.isPlaying).toBe(true)
  })

  it('On destroy', () => {
    wrapper.vm.isPlaying = true
    document.removeEventListener = jest.fn()
    wrapper.destroy()
    expect(document.removeEventListener).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isPlaying).toBe(false)
  })
})
