import HistoricalPage from '@/views/HistoricalPage'
import config from '@/store/historicalConfiguration'
import { shallowMount } from '@vue/test-utils'

jest.mock('@/store/historicalConfiguration', () => ({
  getAllVariables: jest.fn(),
  getAllTimePeriods: jest.fn()
}))

const mockVariables = [
  {
    name: 'variable1'
  }, {
    name: 'variable2'
  }
]
config.getAllVariables.mockReturnValue(mockVariables)

const mockTimePeriods = [
  {
    value: 'month1',
    type: 'month'
  }, {
    value: 'month2'
  }
]
config.getAllTimePeriods.mockReturnValue(mockTimePeriods)

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
    expect(wrapper.vm.variables).toEqual(mockVariables)
    expect(wrapper.vm.activeVariable).toEqual(mockVariables[0])
    expect(wrapper.vm.timePeriods).toEqual(mockTimePeriods)
    expect(wrapper.vm.isLoaded).toBe(false)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('on change year', () => {
    let wrapper = shallowMount(HistoricalPage)
    wrapper.vm.activeVariable = {
      type: 'Monthly',
      legendName: 'legendName',
      layerName: 'layerName',
      workspaceName: 'workspaceName'
    }
    wrapper.vm.changeYear(1989)
    expect(wrapper.vm.activeYear).toBe(1989)
    expect(wrapper.vm.activePeriod).toEqual(mockTimePeriods[0])
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toEqual('workspaceName:monthly_layerName')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toEqual('1989-month1')
  })

  it('On timePeriodTypeFilter', () => {
    const wrapper = shallowMount(HistoricalPage)
    expect(wrapper.vm.timePeriodTypeFilter(mockTimePeriods, 'month').length).toBe(1)
  })

  it('On select variable daily variable with year', () => {
    const wrapper = shallowMount(HistoricalPage)
    wrapper.vm.onSelectVariable({
      type: 'Daily',
      workspaceName: 'workspaceName',
      layerName: 'layerName'
    }, 1989)
    expect(wrapper.vm.activeYear).toBe(1989)
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toBe('workspaceName:layerName')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toBe('1989-month1')
  })

  it('On select variable daily variable without year', () => {
    const wrapper = shallowMount(HistoricalPage)
    wrapper.vm.onSelectVariable({
      type: 'Daily',
      workspaceName: 'workspaceName',
      layerName: 'layerName',
      endDate: 1989
    })
    expect(wrapper.vm.activeYear).toBe(1989)
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toBe('workspaceName:layerName')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toBe('1989-month1')
  })

  it('On select variable daily variable monthly and period month', () => {
    const wrapper = shallowMount(HistoricalPage)
    wrapper.vm.activePeriod.type = 'month'
    wrapper.vm.activePeriod.value = 'activePeriodValue'
    wrapper.vm.onSelectVariable({
      type: 'Monthly',
      workspaceName: 'workspaceName',
      layerName: 'layerName',
      endDate: 1989
    })
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toBe('workspaceName:monthly_layerName')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toBe('1989-activePeriodValue')
  })

  it('On select variable daily variable monthly and period season', () => {
    const wrapper = shallowMount(HistoricalPage)
    wrapper.vm.activePeriod.type = 'season'
    wrapper.vm.activePeriod.value = 'activePeriodValue'
    wrapper.vm.activePeriod.label = 'Label'
    wrapper.vm.onSelectVariable({
      type: 'Monthly',
      workspaceName: 'workspaceName',
      layerName: 'layerName',
      endDate: 1989
    })
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toBe('workspaceName:layerName_label')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toBe(1989)
  })

  it('On select variable daily variable monthly and period annual', () => {
    const wrapper = shallowMount(HistoricalPage)
    wrapper.vm.activePeriod.type = 'annual'
    wrapper.vm.activePeriod.value = 'activePeriodValue'
    wrapper.vm.onSelectVariable({
      type: 'Monthly',
      workspaceName: 'workspaceName',
      layerName: 'layerName',
      endDate: 1989
    })
    expect(wrapper.vm.displayedLayer.layerParameters.layers).toBe('workspaceName:annual_layerName')
    expect(wrapper.vm.displayedLayer.layerParameters.time).toBe(1989)
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
