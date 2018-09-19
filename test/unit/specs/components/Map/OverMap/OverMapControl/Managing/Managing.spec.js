import Managing from '@/components/Map/OverMap/OverMapControl/Managing/Managing'
import { mount, shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal/Modal'
import ForecastSelection from '@/components/Map/OverMap/OverMapControl/Managing/ForecastSelection/ForecastSelection'
import Parameter from '@/store/parameter'
import GraphModal from '@/components/Graph/GraphModal'
import Area from '@/store/area'

const mockMap = {
  on: jest.fn().mockImplementation((evtName, callback) => {
    mockMap[evtName] = callback
  })
}

function getMapMock () {
  return function () {
    return mockMap
  }
}

const mockDisplayedLayer = {
  setDisplayedLayer: jest.fn()
}
function getDisplayedLayer () {
  return function () {
    return mockDisplayedLayer
  }
}

jest.mock('@/store/parameter', () => ({
  getDisplayedParameter: jest.fn(),
  setDisplayedParameter: jest.fn()
}))

const mockGetSelectedArea = {getSelectedArea: 'getSelectedArea'}
jest.mock('@/store/area', () => ({
  getSelectedArea: jest.fn()
}))
Area.getSelectedArea.mockReturnValue(mockGetSelectedArea)

const mockGetDisplayedLayer = {
  displayName: 'displayName',
  hasGraph: true
}
Parameter.getDisplayedParameter.mockReturnValue(mockGetDisplayedLayer)

describe('Managing.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Managing, {
      provide: {
        getMap: getMapMock(),
        getDisplayedLayer: getDisplayedLayer()
      }
    })
  })

  it('Mounted correctly', () => {
    expect(mockMap.on).toBeCalled()
  })

  it('Toggle ForecastSelection modal', () => {
    const buttonForecastSelection = wrapper.find('#forecast-selection-btn')
    expect(wrapper.vm.showModal).toBe(false)
    buttonForecastSelection.trigger('click')
    expect(wrapper.vm.showModal).toBe(true)

    wrapper.find(Modal).vm.$emit('close')
    expect(wrapper.vm.showModal).toBe(false)
  })

  it('Choose ForecastSelection', () => {
    const wrapper = mount(Managing, {
      provide: {
        getMap: getMapMock(),
        getDisplayedLayer: getDisplayedLayer()
      },
      stubs: {
        ForecastSelection: true,
        ReportedSelection: true,
        Legend: true
      }
    })
    const buttonForecastSelection = wrapper.find('#forecast-selection-btn')
    buttonForecastSelection.trigger('click')
    expect(wrapper.vm.showModal).toBe(true)

    wrapper.find(ForecastSelection).vm.$emit('selectedParameter', 'selectedParameter')
    expect(wrapper.vm.showModal).toBe(false)
    expect(Parameter.setDisplayedParameter).toBeCalledWith('selectedParameter')
    expect(wrapper.emitted().selectedParameter).toEqual([[mockGetDisplayedLayer], ['selectedParameter']])
  })

  it('On layer add', () => {
    mockMap.layeradd()
    expect(wrapper.vm.displayedParameter).toBe(mockGetDisplayedLayer)
  })

  it('On open graph modal', () => {
    wrapper.find('#open-graph-modal').trigger('click')
    expect(wrapper.vm.showModalGraph).toBe(true)
    expect(wrapper.vm.selectedArea).toBe(mockGetSelectedArea)
    expect(wrapper.vm.selectedParameter).toBe(mockGetDisplayedLayer)

    wrapper.find(GraphModal).vm.$emit('close')
    expect(wrapper.vm.showModalGraph).toBe(false)
  })
})
