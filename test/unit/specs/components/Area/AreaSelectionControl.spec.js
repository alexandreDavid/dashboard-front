import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import { shallowMount } from '@vue/test-utils'

import AreaSelectionModal from '@/components/Area/AreaSelectionModal'
import DefinedAreas from '@/store/definedAreas'

jest.mock('@/store/definedAreas', () => ({
  getAll: jest.fn(),
  setActiveArea: jest.fn(),
  getActiveArea: jest.fn()
}))

DefinedAreas.getAll.mockReturnValue([1, 2, 3])
DefinedAreas.getActiveArea.mockReturnValue(1)

describe('AreaSelectionControl.vue', () => {
  let wrapper
  beforeEach(async () => {
    DefinedAreas.getAll.mockClear()
    DefinedAreas.getActiveArea.mockClear()
    DefinedAreas.setActiveArea.mockClear()

    wrapper = shallowMount(AreaSelectionControl)
    expect(DefinedAreas.getAll).toHaveBeenCalledTimes(1)
    expect(DefinedAreas.getActiveArea).toHaveBeenCalledTimes(1)
    expect(DefinedAreas.setActiveArea).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted().change[0]).toEqual([1])
  })

  it('Click on edit and close modal', async () => {
    // Click on edit
    expect(wrapper.vm.showModalArea).toBe(false)
    expect(wrapper.find(AreaSelectionModal).exists()).toBe(false)
    wrapper.find('.edit').trigger('click')
    expect(wrapper.vm.showModalArea).toBe(true)
    expect(wrapper.find(AreaSelectionModal).exists()).toBe(true)

    // Click on cancel
    wrapper.find(AreaSelectionModal).vm.$emit('close')
    expect(wrapper.vm.showModalArea).toBe(false)
    expect(wrapper.find(AreaSelectionModal).exists()).toBe(false)
    expect(DefinedAreas.getAll).toHaveBeenCalledTimes(2)
    expect(DefinedAreas.getActiveArea).toHaveBeenCalledTimes(2)
    expect(DefinedAreas.setActiveArea).toHaveBeenCalledTimes(2)
    expect(wrapper.emitted().change[1]).toEqual([1])
  })
})
