import HistoricalPage from '@/views/HistoricalPage'
import config from '@/store/historicalConfiguration'
import { shallowMount } from '@vue/test-utils'

jest.mock('@/store/historicalConfiguration', () => ({
  getAllVariables: jest.fn(),
  getAllMonths: jest.fn()
}))

const mockVariables = [
  {
    name: 'variable1'
  }, {
    name: 'variable2'
  }
]
config.getAllVariables.mockReturnValue(mockVariables)

const mockMonths = [
  {
    value: 'month1'
  }, {
    value: 'month2'
  }
]
config.getAllMonths.mockReturnValue(mockMonths)

describe('HistoricalPage.vue', () => {
  it('on create', () => {
    let wrapper = shallowMount(HistoricalPage)
    expect(config.getAllVariables).toHaveBeenCalled()
    expect(config.getAllMonths).toHaveBeenCalled()
    expect(wrapper.vm.variables).toEqual(mockVariables)
    expect(wrapper.vm.activeVariable).toEqual(mockVariables[0])
    expect(wrapper.vm.months).toEqual(mockMonths)
  })

  it('on change year', () => {
    let wrapper = shallowMount(HistoricalPage)
    wrapper.vm.activeVariable = {
      type: 'Monthly',
      legendName: 'legendName',
      layerName: 'layerName'
    }
    wrapper.vm.changeYear(1989)
    expect(wrapper.vm.activeYear).toBe(1989)
    expect(wrapper.vm.activePeriod).toEqual(mockMonths[0])
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toEqual('layerName')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toEqual('1989-month1')
  })
})
