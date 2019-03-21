import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import OverMap from '@/components/Map/OverMap/OverMap'
import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import SelectedLayers from '@/store/selectedLayers'
import MapControlBar from '@/components/Map/MapControlBar'

const localVue = createLocalVue()

localVue.use(Vuex)

const mockAreaLayer = {
  setSelectedArea: jest.fn(),
  toGeoJSON: jest.fn()
}
function getAreaLayer () {
  return function () {
    return mockAreaLayer
  }
}

jest.mock('@/store/selectedLayers', () => ({
  updateArea: jest.fn()
}))

const mockActiveArea = jest.fn()

describe('OverMap.vue', () => {
  let wrapper
  beforeEach(() => {
    const getters = {
      activeArea: mockActiveArea
    }
    const store = new Vuex.Store({
      modules: {
        areas: {
          namespaced: true,
          getters
        }
      }
    })
    wrapper = shallowMount(OverMap, {
      store,
      localVue,
      provide: {
        getAreaLayer: getAreaLayer()
      },
      stubs: {
        MapControlBar: MapControlBar
      }
    })
  })

  it('Display SearchLocationResult with result', async () => {
    const locationFound = 'SearchLocationResult'
    const mockGeoJSON = 'mockGeoJSON'
    mockAreaLayer.toGeoJSON.mockReturnValue(mockGeoJSON)
    wrapper.find(AreaSelectionControl).vm.$emit('input', locationFound)
    expect(mockAreaLayer.setSelectedArea).toBeCalledWith(locationFound)
    await wrapper.vm.$nextTick()
    expect(mockAreaLayer.toGeoJSON).toHaveBeenCalledTimes(1)
    expect(SelectedLayers.updateArea).toBeCalledWith(mockGeoJSON)
  })

  it('Display SearchLocationResult without result', () => {
    wrapper.find(AreaSelectionControl).vm.$emit('input')
    expect(wrapper.vm.searchLocationResult).toBeUndefined()
  })

  it('On select reported parameter', () => {
    const selectedReportedParameter = {
      layerUrl: 'layerUrl',
      layerParameters: 'layerParameters'
    }
    wrapper.vm.showSidebar = true
    wrapper.find(MapControlBar).vm.$emit('selectedReportedLayer', selectedReportedParameter)
    expect([...wrapper.emitted().selectedReportedLayer].pop()).toEqual([selectedReportedParameter])
  })
})
