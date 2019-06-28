import BaseMapControl from '@/components/BaseMap/BaseMapControl'
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

describe('BaseMapControl.vue', () => {
  it('On create', async () => {
    const wrapper = shallowMount(BaseMapControl)
    expect(AreaLayer).toBeCalled()
    expect(mockAreaLayer.setSelectedArea).toBeCalledWith({idArea: 7552})
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('On select basemap', () => {
    const wrapper = shallowMount(BaseMapControl)
    wrapper.vm.$store = { dispatch: jest.fn() }
    wrapper.vm.selectBaseMap('selectedBaseMap')
    expect(wrapper.vm.$store.dispatch).toBeCalledWith('baseMaps/setActive', 'selectedBaseMap')
  })
})
