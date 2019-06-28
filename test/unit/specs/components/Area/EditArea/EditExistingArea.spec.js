import EditExistingArea from '@/components/Area/EditArea/EditExistingArea'
import { shallowMount } from '@vue/test-utils'
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'

const mockMap = {}
jest.mock('@/store/map', () => {
  return jest.fn().mockImplementation(() => {
    return mockMap
  })
})

const mockAreaLayer = {
  setSelectedArea: jest.fn(),
  add: jest.fn(),
  remove: jest.fn(),
  zoomToArea: jest.fn(),
  getSelectedArea: jest.fn()
}
jest.mock('@/store/areaLayer', () => {
  return jest.fn().mockImplementation(() => {
    return mockAreaLayer
  })
})

describe('EditArea/index.vue', () => {
  it('On mount without value', () => {
    shallowMount(EditExistingArea, {
      propsData: {
        value: {}
      }
    })
    expect(MapObj).toBeCalledWith('existing-area-map')
    expect(AreaLayer).toBeCalledWith(mockMap)
    expect(mockAreaLayer.remove).toBeCalled()
    expect(mockAreaLayer.setSelectedArea).not.toBeCalled()
    expect(mockAreaLayer.add).toBeCalled()
    expect(mockAreaLayer.zoomToArea).toBeCalled()
  })

  it('On mount with value', () => {
    shallowMount(EditExistingArea, {
      propsData: {
        value: { id: 'id' }
      }
    })
    expect(mockAreaLayer.setSelectedArea).toBeCalledWith({ id: 'id' })
  })
})
