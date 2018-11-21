import HistoricalPage from '@/views/HistoricalPage'
import config from '@/store/historicalConfiguration'
import { shallowMount } from '@vue/test-utils'

jest.mock('@/store/historicalConfiguration', () => ({
  getAllVariables: jest.fn(),
  getAllTimePeriods: jest.fn(),
  getAllDatasets: jest.fn()
}))

const mockVariables = [
  {
    name: 'variable1',
    label: 'variable1',
    description: 'description variable1',
    datasets: [{
      id: 'dataset1',
      layerName: 'Rainf_CDD',
      workspaceName: 'historical',
      legendName: 'wfdei_CDD',
      startDate: 1984,
      endDate: 2013
    }]
  }, {
    name: 'variable2',
    label: 'variable2',
    description: 'description variable2',
    datasets: [{
      id: 'dataset2',
      layerName: 'layerName dataset2',
      workspaceName: 'workspaceName dataset2',
      legendName: 'legendName dataset2',
      startDate: 1984,
      endDate: 2012
    }]
  }
]
config.getAllVariables.mockReturnValue(mockVariables)

const mockTimePeriods = [
  {
    value: 'month1',
    type: 'month'
  }, {
    value: 'month2',
    type: 'season'
  }
]
config.getAllTimePeriods.mockReturnValue(mockTimePeriods)

const mockDatasets = {
  dataset1: {
    id: 'dataset1',
    label: 'dataset1',
    frequency: 'Monthly',
    description: 'description dataset1'
  },
  dataset2: {
    id: 'dataset2',
    label: 'dataset2',
    frequency: 'Monthly',
    description: 'description dataset2'
  }
}
config.getAllDatasets.mockReturnValue(mockDatasets)

const mockAreaLayer = {
  setSelectedArea: jest.fn()
}
jest.mock('@/store/areaLayer', () => {
  return jest.fn().mockImplementation(() => {
    return mockAreaLayer
  })
})

describe('HistoricalPage.vue', () => {
  it('on mounted', async () => {
    const wrapper = shallowMount(HistoricalPage)
    expect(config.getAllVariables).toHaveBeenCalled()
    expect(config.getAllTimePeriods).toHaveBeenCalled()
    expect(config.getAllDatasets).toHaveBeenCalled()
    expect(wrapper.vm.variables).toEqual(mockVariables)
    expect(wrapper.vm.activeVariable).toEqual(mockVariables[0])
    expect(wrapper.vm.timePeriods).toEqual(mockTimePeriods)
    expect(wrapper.vm.datasets).toEqual(mockDatasets)
    expect(wrapper.vm.isLoaded).toBe(false)
    expect(mockAreaLayer.setSelectedArea).toBeCalledWith({id: 7552})
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('on change year', async () => {
    let wrapper = shallowMount(HistoricalPage)
    wrapper.vm.activeVariable = mockVariables[1]
    await wrapper.vm.$nextTick()
    wrapper.vm.changeYear(1989)
    expect(wrapper.vm.activeYear).toBe(1989)
    expect(wrapper.vm.activePeriod).toEqual(mockTimePeriods[0])
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toEqual('workspaceName dataset2:monthly_layerName dataset2')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toEqual('1989-month1')
  })

  it('On timePeriodTypeFilter', () => {
    const wrapper = shallowMount(HistoricalPage)
    expect(wrapper.vm.timePeriodTypeFilter(mockTimePeriods, 'month').length).toBe(1)
  })

  it('On select variable daily variable with year', () => {
    const wrapper = shallowMount(HistoricalPage)
    wrapper.vm.onSelectVariableDataset(mockVariables[1].datasets[0], 1989)
    expect(wrapper.vm.activeYear).toBe(1989)
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toBe('workspaceName dataset2:monthly_layerName dataset2')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toBe('1989-month1')
  })

  it('On select variable daily variable without year', () => {
    const wrapper = shallowMount(HistoricalPage)
    wrapper.vm.onSelectVariableDataset(mockVariables[1].datasets[0])
    expect(wrapper.vm.activeYear).toBe(2012)
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toBe('workspaceName dataset2:monthly_layerName dataset2')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toBe('2012-month1')
  })

  it('On select variable daily variable monthly and period month', () => {
    const wrapper = shallowMount(HistoricalPage)
    wrapper.vm.activePeriod.type = 'month'
    wrapper.vm.activePeriod.value = 'activePeriodValue'
    wrapper.vm.onSelectVariable(mockVariables[1])
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toBe('workspaceName dataset2:monthly_layerName dataset2')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toBe('2012-activePeriodValue')
  })

  it('On select variable daily variable monthly and period season', () => {
    const wrapper = shallowMount(HistoricalPage)
    wrapper.vm.activePeriod.type = 'season'
    wrapper.vm.activePeriod.value = 'activePeriodValue'
    wrapper.vm.activePeriod.label = 'Label'
    wrapper.vm.onSelectVariable(mockVariables[1])
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toBe('workspaceName dataset2:layerName dataset2_label')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toBe(2012)
  })

  it('On select variable daily variable monthly and period annual', () => {
    const wrapper = shallowMount(HistoricalPage)
    wrapper.vm.activePeriod.type = 'annual'
    wrapper.vm.activePeriod.value = 'activePeriodValue'
    wrapper.vm.onSelectVariable(mockVariables[1])
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toBe('workspaceName dataset2:annual_layerName dataset2')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toBe(2012)
  })

  it('On destroy', () => {
    document.removeEventListener = jest.fn()
    const wrapper = shallowMount(HistoricalPage)
    wrapper.vm.areaLayer = 'areaLayer'
    expect(wrapper.vm.areaLayer).toBeDefined()
    wrapper.destroy()
    expect(wrapper.vm.areaLayer).toBeUndefined()
  })
})
