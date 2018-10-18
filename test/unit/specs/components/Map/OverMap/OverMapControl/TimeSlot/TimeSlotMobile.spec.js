import TimeSlotMobile from '@/components/Map/OverMap/OverMapControl/TimeSerie/TimeSlotMobile'
import { mount } from '@vue/test-utils'

const mockTimes = [
  {startTime: 0, endTime: 1},
  {startTime: 1, endTime: 2},
  {startTime: 2, endTime: 3},
  {startTime: 3, endTime: 4},
  {startTime: 4, endTime: 5}
]

jest.useFakeTimers()

describe('TimeSlotMobile.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(TimeSlotMobile, {
      propsData: {
        model: {
          label: '2 days',
          times: mockTimes,
          type: 'interval'
        }
      }
    })
  })

  it('Change with select', () => {
    const timeOptions = wrapper.find('select').findAll('option')
    expect(timeOptions.length).toBe(5)

    expect(wrapper.vm.currentIndex).toBe(0)
    timeOptions.at(3).setSelected()
    expect(wrapper.vm.currentIndex).toBe(3)
  })

  it('Click on previous', () => {
    wrapper.find('select').findAll('option').at(2).setSelected()
    expect(wrapper.vm.currentIndex).toBe(2)

    const previousButton = wrapper.find('#time-slot-previous')

    previousButton.trigger('click')
    expect(wrapper.vm.currentIndex).toBe(1)

    previousButton.trigger('click')
    expect(wrapper.vm.currentIndex).toBe(0)

    // Can't move before 0
    previousButton.trigger('click')
    expect(wrapper.vm.currentIndex).toBe(0)
  })

  it('Click on next', () => {
    let idx = mockTimes.length - 3
    wrapper.find('select').findAll('option').at(idx).setSelected()
    expect(wrapper.vm.currentIndex).toBe(idx)

    const nextButton = wrapper.find('#time-slot-next')

    nextButton.trigger('click')
    expect(wrapper.vm.currentIndex).toBe(idx + 1)

    nextButton.trigger('click')
    expect(wrapper.vm.currentIndex).toBe(idx + 2)

    // Can't move after 12
    nextButton.trigger('click')
    expect(wrapper.vm.currentIndex).toBe(idx + 2)
  })
})
