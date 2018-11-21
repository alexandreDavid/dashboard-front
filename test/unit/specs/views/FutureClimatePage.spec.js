import FutureClimatePage from '@/views/FutureClimatePage'
import config from '@/store/futureClimateConfiguration'
import { shallowMount } from '@vue/test-utils'

jest.mock('@/store/futureClimateConfiguration', () => ({
  getAllTimePeriods: jest.fn()
}))

const mockTimePeriods = [
  {
    value: 'month1'
  }, {
    value: 'month2'
  }
]
config.getAllTimePeriods.mockReturnValue(mockTimePeriods)

describe('FutureClimatePage.vue', () => {
  it('on create', () => {
    let wrapper = shallowMount(FutureClimatePage)
    expect(config.getAllTimePeriods).toHaveBeenCalled()
    expect(wrapper.vm.activeVariable).toEqual(wrapper.vm.variables[0])
    expect(wrapper.vm.timePeriods).toEqual(mockTimePeriods)
  })
})
