import FutureClimatePage from '@/views/FutureClimatePage'
import config from '@/store/futureClimateConfiguration'
import { shallowMount } from '@vue/test-utils'

jest.mock('@/store/futureClimateConfiguration', () => ({
  getAllMonths: jest.fn()
}))

const mockMonths = [
  {
    value: 'month1'
  }, {
    value: 'month2'
  }
]
config.getAllMonths.mockReturnValue(mockMonths)

describe('FutureClimatePage.vue', () => {
  it('on create', () => {
    let wrapper = shallowMount(FutureClimatePage)
    expect(config.getAllMonths).toHaveBeenCalled()
    expect(wrapper.vm.activeVariable).toEqual(wrapper.vm.variables[0])
    expect(wrapper.vm.months).toEqual(mockMonths)
  })
})
