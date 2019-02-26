import { shallowMount, createLocalVue } from '@vue/test-utils'
import WidgetMap from '@/components/Dashboard/Widgets/WidgetMap.vue'

import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import SelectedLayer from '@/store/selectedLayer'
import GeoResources from '@/store/geoResources'

import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

const mockMap = jest.fn()
jest.mock('@/store/map', () => {
  return jest.fn().mockImplementation(() => {
    return mockMap
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

const mockSelectedLayer = {
  setLayer: jest.fn(),
  addTo: jest.fn(),
  hasTime: jest.fn()
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

describe('WidgetMap.vue', () => {
  let wrapper
  beforeEach(async () => {
    let state = {
      active: 'activeBaseMap'
    }

    let store = new Vuex.Store({
      modules: {
        baseMaps: {
          state
        }
      }
    })
    wrapper = shallowMount(WidgetMap, {
      propsData: {
        config: {
          resource: {
            id: 1
          }
        },
        area: 'area',
        widgetKey: 'widgetKey'
      },
      store,
      localVue
    })
  })

  it('Mount with good data', async () => {
    expect(wrapper.vm.mapHeight).toBe(200)
    const mapId = 'map-container-widgetwidgetKey'
    expect(wrapper.find(`#${mapId}`).exists()).toBe(true)
    expect(MapObj).toBeCalledWith(mapId)
    expect(AreaLayer).toBeCalledWith(mockMap)
    expect(mockAreaLayer.setSelectedArea).toBeCalledWith('area')
    // await wrapper.vm.$nextTick()
    // expect(SelectedLayer).toBeCalled()
    // expect(mockSelectedLayer.setLayer).toBeCalled()
    // expect(mockSelectedLayer.addTo).toBeCalledWith(mockMap)
    // expect(wrapper.vm.isLoaded).toBe(true)
  })

  // it('On watch parameter', () => {
  //   const mockSearchById = {
  //     id: 2,
  //     displayName: 'displayName2'
  //   }
  //   GeoResources.searchById.mockReturnValue(mockSearchById)
  //   wrapper.setProps({
  //     config: {
  //       resource: {
  //         id: 2
  //       }
  //     }
  //   })
  //   expect(GeoResources.searchById).toBeCalledWith(2)
  //   expect(mockSelectedLayer.setLayer).toBeCalledWith(mockSearchById, wrapper.vm.areaLayer.toGeoJSON())
  // })

  // it('Providers are correct', async () => {
  //   expect(wrapper.vm.getMap()).toBe(mockMap)
  //   expect(wrapper.vm.getDisplayedLayer()).toBe(mockSelectedLayer)
  // })
})
