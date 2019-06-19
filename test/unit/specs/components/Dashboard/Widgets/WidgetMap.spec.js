import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import WidgetMap from '@/components/Dashboard/Widgets/WidgetMap.vue'

import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import GeoResources from '@/store/geoResources'

const localVue = createLocalVue()

localVue.use(Vuex)

const mockMap = {
  remove: jest.fn(),
  setBaseMapLayer: jest.fn()
}
jest.mock('@/store/map', () => {
  return jest.fn().mockImplementation(() => {
    return mockMap
  })
})

const mockAreaLayer = {
  setSelectedArea: jest.fn(),
  toGeoJSON: jest.fn(),
  isReady: jest.fn()
}
jest.mock('@/store/areaLayer', () => {
  return jest.fn().mockImplementation(() => {
    return mockAreaLayer
  })
})

const mockSelectedLayer = {
  setLayer: jest.fn(),
  addTo: jest.fn(),
  hasTime: jest.fn(),
  setUnit: jest.fn(),
  setArea: jest.fn(),
  setOpacity: jest.fn()
}
jest.mock('@/store/selectedLayer', () => {
  return jest.fn().mockImplementation(() => {
    return mockSelectedLayer
  })
})

jest.mock('@/store/geoResources', () => ({
  searchById: jest.fn()
}))
GeoResources.searchById.mockReturnValue({
  id: 1,
  displayName: 'displayName1'
})

const mockGetAreaCallback = 'mockGetAreaCallback'
const mockGetArea = jest.fn()
mockGetArea.mockReturnValue(mockGetAreaCallback)

describe('WidgetMap.vue', () => {
  let wrapper
  let baseMaps
  let settings
  let areas
  let store

  beforeEach(async () => {
    baseMaps = {
      namespaced: true,
      state: {
        active: 'activeBaseMap'
      },
      mutations: {
        setActive (state, active) {
          state.active = active
        }
      }
    }

    settings = {
      namespaced: true,
      state: {
        active: {
          curFamily: 'initVal'
        }
      },
      getters: {
        getActiveKeyById: (state) => (id) => {
          return state.active[id]
        }
      }
    }

    areas = {
      namespaced: true,
      getters: {
        getArea: mockGetArea
      }
    }

    store = new Vuex.Store({
      modules: {
        baseMaps,
        settings,
        areas
      }
    })
    wrapper = shallowMount(WidgetMap, {
      propsData: {
        config: {
          resource: {
            id: 1
          },
          area: {
            id: 'idArea'
          }
        },
        widgetKey: 'widgetKey'
      },
      store,
      localVue
    })
  })

  it('Mount with good data', () => {
    expect(wrapper.vm.mapHeight).toBe(200)
    const mapId = 'map-container-widgetwidgetKey'
    expect(wrapper.find(`#${mapId}`).exists()).toBe(true)
    expect(MapObj).toBeCalledWith(mapId)
    expect(AreaLayer).toBeCalledWith(mockMap)
    expect(areas.getters.getArea).toBeCalled()
  })

  it('On unit changes', () => {
    const unit = 'unit'
    store.commit('baseMaps/setActive', unit)
    expect(mockMap.setBaseMapLayer).toBeCalledWith(unit)
  })

  it('On destroy', () => {
    wrapper.destroy()
    expect(mockMap.remove).toBeCalled()
  })
})
