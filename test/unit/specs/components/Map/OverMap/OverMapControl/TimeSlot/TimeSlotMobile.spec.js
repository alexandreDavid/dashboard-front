import TimeSlotMobile from '@/components/Map/OverMap/OverMapControl/TimeSlot/TimeSlotMobile'
import { mount } from '@vue/test-utils'

const mockSetDate = jest.fn()
function getDisplayedLayer () {
  return function () {
    return {
      setDate: mockSetDate
    }
  }
}

jest.useFakeTimers()

describe('TimeSlotMobile.vue', () => {
  let wrapper
  let currentDaysModel
  beforeEach(() => {
    wrapper = mount(TimeSlotMobile, {
      provide: {
        getDisplayedLayer: getDisplayedLayer()
      }
    })
    currentDaysModel = wrapper.vm.getDaysModels()[0]
  })

  it('Change selected model', () => {
    expect(wrapper.vm.activeModel).toEqual(currentDaysModel)
    const buttons = wrapper.findAll('.change-selected-model')
    expect(buttons.length).toBe(3)
    wrapper.vm.currentIndex = 2
    expect(wrapper.vm.currentIndex).toBe(2)
    buttons.at(1).trigger('click')
    expect(wrapper.vm.activeModel).toEqual(wrapper.vm.getDaysModels()[1])
    expect(wrapper.vm.currentIndex).toBe(0)
  })

  it('Change with select', () => {
    const timeOptions = wrapper.find('select').findAll('option')
    expect(timeOptions.length).toBe(13)

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
    wrapper.find('select').findAll('option').at(10).setSelected()
    expect(wrapper.vm.currentIndex).toBe(10)

    const nextButton = wrapper.find('#time-slot-next')

    nextButton.trigger('click')
    expect(wrapper.vm.currentIndex).toBe(11)

    nextButton.trigger('click')
    expect(wrapper.vm.currentIndex).toBe(12)

    // Can't move after 12
    nextButton.trigger('click')
    expect(wrapper.vm.currentIndex).toBe(12)
  })
})
