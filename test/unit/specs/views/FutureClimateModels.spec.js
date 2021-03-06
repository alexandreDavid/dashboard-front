import FutureClimateModels from '@/views/FutureClimateModels'
import config from '@/store/futureClimateConfiguration'
import { shallowMount } from '@vue/test-utils'
import AreaLayer from '@/store/areaLayer'

const mockAreaLayer = {
  setSelectedArea: jest.fn()
}
jest.mock('@/store/areaLayer', () => {
  return jest.fn().mockImplementation(() => {
    return mockAreaLayer
  })
})

jest.mock('@/store/futureClimateConfiguration', () => ({
  getAllModelsByType: jest.fn(),
  getAllDatasets: jest.fn()
}))

const mockModelTypes = [
  {
    value: 'modelType1',
    label: 'modelType1'
  }, {
    value: 'modelType2',
    label: 'modelType2'
  }
]

config.getAllDatasets.mockReturnValue(mockModelTypes)

const mockModels = [
  {
    value: 'model1',
    label: 'model1',
    default: true
  }, {
    value: 'model2',
    label: 'model2'
  }
]
config.getAllModelsByType.mockReturnValue(mockModels)

describe('FutureClimateModels.vue', () => {
  let wrapper
  it('on create', () => {
    wrapper = shallowMount(FutureClimateModels, {
      propsData: {
        variable: {
          name: 'layerName',
          styleName: 'styleName'
        },
        period: 'period',
        timePeriod: {
          value: 'timePeriod'
        }
      }
    })
    expect(config.getAllDatasets).toHaveBeenCalled()
    expect(config.getAllModelsByType).toHaveBeenCalledWith(mockModelTypes[0].value)
    expect(wrapper.vm.availableModels.length).toBe(1)
    expect(wrapper.vm.models.length).toBe(1)
    expect(AreaLayer).toBeCalled()
    expect(mockAreaLayer.setSelectedArea).toBeCalledWith({id: 7552})
  })

  it('on variable change', () => {
    wrapper.setProps({variable: {
      name: 'layerName2',
      styleName: 'styleName2'
    }})
    expect(wrapper.vm.availableModels.length).toBe(1)
    expect(wrapper.vm.models.length).toBe(1)
  })

  it('on timePeriod change', () => {
    wrapper.setProps({timePeriod: {}})
    expect(wrapper.vm.availableModels.length).toBe(1)
    expect(wrapper.vm.models.length).toBe(1)
  })

  it('on maximize model', () => {
    expect(wrapper.vm.models[0].maximize).toBe(false)
    wrapper.find('.edit').trigger('click')
    expect(wrapper.vm.models[0].maximize).toBe(true)
  })

  it('on minimize model', () => {
    expect(wrapper.vm.models[0].maximize).toBe(true)
    wrapper.find('.edit').trigger('click')
    expect(wrapper.vm.models[0].maximize).toBe(false)
  })

  it('on selectModel2Add', () => {
    expect(wrapper.vm.availableModels.length).toBe(1)
    expect(wrapper.vm.models.length).toBe(1)
    wrapper.vm.selectModel2Add(mockModels[0])
    expect(wrapper.vm.availableModels.length).toBe(0)
    expect(wrapper.vm.models.length).toBe(2)

    wrapper.vm.selectModel2Add()
    expect(wrapper.vm.availableModels.length).toBe(0)
    expect(wrapper.vm.models.length).toBe(2)

    wrapper.vm.selectModel2Add({})
    expect(wrapper.vm.availableModels.length).toBe(0)
    expect(wrapper.vm.models.length).toBe(3)
  })
})
