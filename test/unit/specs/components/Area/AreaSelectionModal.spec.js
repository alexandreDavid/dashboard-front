import AreaSelectionModal from '@/components/Area/AreaSelectionModal'
import { shallowMount } from '@vue/test-utils'

import DefinedAreas from '@/store/definedAreas'
import Modal from '@/components/Modal/Modal'
import AreaEdition from '@/components/Area/AreaEdition'

jest.mock('@/store/definedAreas', () => ({
  getAll: jest.fn(),
  setAll: jest.fn()
}))

describe('AreaSelectionModal.vue', () => {
  let wrapper
  beforeEach(async () => {
    DefinedAreas.getAll.mockClear()
    DefinedAreas.setAll.mockClear()

    DefinedAreas.getAll.mockReturnValue([
      {
        id: 1,
        isEditing: true
      }, {
        id: 2,
        isEditing: false
      }, {
        id: 3,
        isEditing: false
      }]
    )

    wrapper = shallowMount(AreaSelectionModal)
    expect(DefinedAreas.getAll).toHaveBeenCalledTimes(1)
  })

  it('created without value', () => {
    DefinedAreas.getAll.mockReturnValue([])
    const wrapper = shallowMount(AreaSelectionModal)
    expect(wrapper.vm.areas.length).toBe(0)
    expect(wrapper.vm.editedArea.id).toBeFalsy()
  })

  it('created with value', () => {
    expect(wrapper.vm.areas.find(a => a.isEditing)).toBeUndefined()
    expect(wrapper.vm.editedArea).toBeFalsy()
  })

  it('On close', () => {
    expect(wrapper.emitted().close).toBeFalsy()
    wrapper.find(Modal).vm.$emit('close')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('Click on edit area', async () => {
    wrapper.find('.managing-modal-list-container a').trigger('click')
    expect(wrapper.vm.editedArea).toBeTruthy()
    expect(wrapper.vm.editedArea.id).toBe(1)
  })

  it('Click on new area', () => {
    expect(wrapper.vm.editedArea).toBe(false)
    wrapper.find('.new-area').trigger('click')
    expect(wrapper.vm.editedArea).toBeTruthy()
    expect(wrapper.vm.editedArea.id).toBeFalsy()
  })

  it('Click on back to list', () => {
    expect(wrapper.vm.editedArea).toBe(false)
    wrapper.find('.new-area').trigger('click')
    expect(wrapper.vm.editedArea).toBeTruthy()
    expect(wrapper.vm.editedArea.id).toBeFalsy()
    wrapper.find('.back-to-list').trigger('click')
    expect(wrapper.vm.editedArea).toBe(false)
  })

  it('After edit with new area', () => {
    expect(wrapper.vm.editedArea).toBe(false)
    wrapper.find('.new-area').trigger('click')
    expect(wrapper.vm.editedArea).toBeTruthy()
    expect(wrapper.vm.editedArea.id).toBeFalsy()
    wrapper.find(AreaEdition).vm.$emit('input', { label: 'newArea' })
    expect(wrapper.vm.areas.length).toBe(4)
    expect(DefinedAreas.setAll).toHaveBeenLastCalledWith(wrapper.vm.areas)
    expect(wrapper.vm.editedArea).toBe(wrapper.vm.areas[3])
    expect(wrapper.vm.editedArea.id).toBe(4)
  })

  it('created without value and new area', () => {
    DefinedAreas.getAll.mockReturnValue([])
    const wrapper = shallowMount(AreaSelectionModal)
    expect(wrapper.vm.areas.length).toBe(0)
    expect(wrapper.vm.editedArea.id).toBeFalsy()
    wrapper.find(AreaEdition).vm.$emit('input', { label: 'newArea' })
    expect(wrapper.vm.areas.length).toBe(1)
    expect(DefinedAreas.setAll).toHaveBeenLastCalledWith(wrapper.vm.areas)
    expect(wrapper.vm.editedArea).toBe(wrapper.vm.areas[0])
    expect(wrapper.vm.editedArea.id).toBe(1)
  })

  it('After edit with existing area', () => {
    expect(wrapper.vm.editedArea).toBe(false)
    wrapper.find('.managing-modal-list-container a').trigger('click')
    expect(wrapper.vm.editedArea).toBeTruthy()
    expect(wrapper.vm.editedArea.id).toBe(1)
    wrapper.find(AreaEdition).vm.$emit('input', { id: 1, label: 'existingArea' })
    expect(wrapper.vm.areas[0].label).toBe('existingArea')
    expect(wrapper.vm.areas.length).toBe(3)
    expect(DefinedAreas.setAll).toHaveBeenLastCalledWith(wrapper.vm.areas)
    expect(wrapper.vm.editedArea).toBe(wrapper.vm.areas[0])
    expect(wrapper.vm.editedArea.id).toBe(1)
  })
})
