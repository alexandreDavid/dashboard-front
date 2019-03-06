import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import { shallowMount } from '@vue/test-utils'

import AreaSelectionModal from '@/components/Area/AreaSelectionModal'
import DefinedAreas from '@/store/definedAreas'

jest.mock('@/store/definedAreas', () => ({
  getAll: jest.fn(),
  getArea: jest.fn()
}))

DefinedAreas.getAll.mockReturnValue([1, 2, 3])
DefinedAreas.getArea.mockReturnValue(1)

describe('AreaSelectionControl.vue', () => {
  let wrapper
  beforeEach(async () => {
    DefinedAreas.getAll.mockClear()
    DefinedAreas.getArea.mockClear()

    wrapper = shallowMount(AreaSelectionControl)
    expect(DefinedAreas.getAll).toHaveBeenCalledTimes(1)
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
  })
})
