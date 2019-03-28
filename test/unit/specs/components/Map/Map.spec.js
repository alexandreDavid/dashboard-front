import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Map from '@/components/Map/Map'
import MapObj from '@/store/map'
import DisplayedLayer from '@/store/displayedLayer.js'
import AreaLayer from '@/store/areaLayer'
import SelectedLayers from '@/store/selectedLayers'
import OverMap from '@/components/Map/OverMap/OverMap'

const localVue = createLocalVue()

localVue.use(Vuex)

const mockMap = {
  invalidateSize: jest.fn(),
  remove: jest.fn()
}
jest.mock('@/store/map.js', () => {
  return jest.fn().mockImplementation(() => {
    return mockMap
  })
})

const mockDisplayedLayer = jest.fn()
jest.mock('@/store/displayedLayer.js', () => {
  return jest.fn().mockImplementation(() => {
    return mockDisplayedLayer
  })
})

const mockAreaLayer = {
  setSelectedArea: jest.fn(),
  toGeoJSON: jest.fn()
}
jest.mock('@/store/areaLayer', () => {
  return jest.fn().mockImplementation(() => {
    return mockAreaLayer
  })
})

jest.mock('@/store/selectedLayers', () => ({
  getAllSelectedLayers: jest.fn()
}))

describe('Map.vue', () => {
  let wrapper
  let areas
  let baseMaps
  const mockToGeoJSON = 'mockToGeoJSON'
  let mockGetAllSelectedLayers

  beforeEach(() => {
    MapObj.mockClear()
    mockAreaLayer.toGeoJSON.mockReturnValue(mockToGeoJSON)

    mockGetAllSelectedLayers = [{
      addTo: jest.fn()
    }, {
      addTo: jest.fn()
    }]
    SelectedLayers.getAllSelectedLayers.mockReturnValue(mockGetAllSelectedLayers)

    baseMaps = {
      namespaced: true,
      state: {
        active: 'baseMaps/state/active'
      }
    }
    areas = {
      namespaced: true,
      getters: {
        activeArea: () => {
          return 'areas/getters/activeArea'
        }
      },
      actions: {
        setActiveArea: jest.fn()
      }
    }
    const store = new Vuex.Store({
      modules: {
        areas,
        baseMaps
      }
    })
    wrapper = shallowMount(Map, {
      store,
      localVue
    })
  })

  it('Mounted correctly', async () => {
    expect(MapObj).toBeCalledWith('map-container')
    expect(wrapper.vm.map.invalidateSize).toBeCalled()
    expect(DisplayedLayer).toBeCalledWith(mockMap)
    expect(AreaLayer).toBeCalledWith(mockMap)

    expect(wrapper.vm.areaLayer.setSelectedArea).toBeCalledWith('areas/getters/activeArea')
    await wrapper.vm.$nextTick()

    expect(mockAreaLayer.toGeoJSON).toBeCalled()
    expect(SelectedLayers.getAllSelectedLayers).toBeCalledWith(mockToGeoJSON)
    await wrapper.vm.$nextTick()
    expect(mockGetAllSelectedLayers[0].addTo).toBeCalledWith(wrapper.vm.map)
    expect(mockGetAllSelectedLayers[1].addTo).toBeCalledWith(wrapper.vm.map)
    expect(wrapper.vm.mapInitialised).toBe(true)
  })

  it('Providers are correct', async () => {
    expect(wrapper.vm.getMap()).toBe(mockMap)
    expect(wrapper.vm.getDisplayedLayer()).toBe(mockDisplayedLayer)
    wrapper.vm.selectedReportedLayer = 'selectedReportedLayer'
    expect(wrapper.vm.getSelectedReportedLayer()).toBe('selectedReportedLayer')
  })

  it('On selectedReportedLayer', () => {
    wrapper.find(OverMap).vm.$emit('selectedReportedLayer', 'selectedReportedLayerVal')
    expect(wrapper.vm.selectedReportedLayer).toBe('selectedReportedLayerVal')
  })

  it('On destroy', () => {
    wrapper.destroy()
    expect(mockMap.remove).toHaveBeenCalledTimes(1)
  })
})
