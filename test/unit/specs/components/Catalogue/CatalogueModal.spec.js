import CatalogueModal from '@/components/Catalogue/CatalogueModal'
import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal/Modal'
import GeoResourcesGroups from '@/store/geoResourcesGroups'
import MapObj from '@/store/map'
import SelectedLayer from '@/store/selectedLayer'
import SelectedLayers from '@/store/selectedLayers'

jest.mock('@/store/geoResourcesGroups', () => ({
  getAllGroups: jest.fn()
}))

// MapObj mock
const mockMapObj = {
  remove: jest.fn()
}
jest.mock('@/store/map', () => {
  return jest.fn().mockImplementation(() => {
    return mockMapObj
  })
})

// SelectedLayer mock
const mockSelectedLayer = {
  setLayer: jest.fn(),
  addTo: jest.fn(),
  remove: jest.fn()
}
jest.mock('@/store/selectedLayer', () => {
  return jest.fn().mockImplementation(() => {
    return mockSelectedLayer
  })
})

// SelectedLayers mock
jest.mock('@/store/selectedLayers', () => ({
  isSelected: jest.fn(),
  allSelectedLayers: []
}))

jest.useFakeTimers()

describe('CatalogueModal.vue', () => {
  it('Emit event when modal close', () => {
    const wrapper = shallowMount(CatalogueModal, {
      stubs: {
        Modal: Modal
      }
    })
    wrapper.find(Modal).vm.$emit('close')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('On toggle group', () => {
    const group = { id: 1 }
    GeoResourcesGroups.getAllGroups.mockResolvedValue([group])
    const wrapper = shallowMount(CatalogueModal, {
      stubs: {
        Modal: Modal
      }
    })
    expect(wrapper.vm.displayedGroups.length).toBe(0)
    wrapper.vm.toggleGroup(group)
    expect(wrapper.vm.displayedGroups.length).toBe(1)
    wrapper.vm.toggleGroup(group)
    expect(wrapper.vm.displayedGroups.length).toBe(0)
  })

  it('On select resource', async () => {
    const resource = { id: 1 }
    const mockIsSelected = 'mockIsSelected'
    SelectedLayers.isSelected.mockReturnValue(mockIsSelected)
    const wrapper = shallowMount(CatalogueModal, {
      stubs: {
        Modal: Modal
      }
    })
    wrapper.vm.selectResource(resource)
    expect(wrapper.vm.isSelected).toBe(mockIsSelected)
    await wrapper.vm.$nextTick()
    expect(MapObj).toBeCalledWith('preview-map')
    expect(SelectedLayer).toBeCalled()
    expect(mockSelectedLayer.setLayer).toBeCalledWith(resource)
    await wrapper.vm.$nextTick()
    expect(mockSelectedLayer.addTo).toBeCalledWith(mockMapObj)

    wrapper.vm.selectResource(resource)
    await wrapper.vm.$nextTick()
    expect(mockSelectedLayer.remove).toBeCalled()
  })

  it('On change select layers', async () => {
    setTimeout.mockClear()
    const wrapper = shallowMount(CatalogueModal, {
      stubs: {
        Modal: Modal
      }
    })
    expect(wrapper.vm.showAlertMessage).toBe(false)
    wrapper.setData({ selectedLayers: 'new' })
    expect(wrapper.vm.showAlertMessage).toBe(true)
    expect(setTimeout).toBeCalled()
    jest.advanceTimersByTime(3000)
    expect(wrapper.vm.showAlertMessage).toBe(false)
  })

  it('Emit event when add to map', () => {
    const resource = { id: 1 }
    const wrapper = shallowMount(CatalogueModal, {
      stubs: {
        Modal: Modal
      }
    })
    wrapper.vm.addToMap(resource)
    expect(wrapper.emitted().selectedResource[0]).toEqual([ resource ])
  })

  it('On back to list', async () => {
    const resource = { id: 1 }
    const wrapper = shallowMount(CatalogueModal, {
      stubs: {
        Modal: Modal
      }
    })
    wrapper.vm.selectResource(resource)
    await wrapper.vm.$nextTick()
    wrapper.vm.backToList()
    expect(mockMapObj.remove).toBeCalled()
  })
})
