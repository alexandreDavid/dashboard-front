import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import areasModule from '@/store/modules/areas'

import AreaSelectionModal from '@/components/Area/AreaSelectionModal'

// import DefinedAreas from '@/store/definedAreas'
import Modal from '@/components/Modal/Modal'
import AreaDetails from '@/components/Area/AreaDetails'

const localVue = createLocalVue()

localVue.use(Vuex)

// jest.mock('@/store/definedAreas', () => ({
//   getAll: jest.fn(),
//   setAll: jest.fn()
// }))

describe('AreaSelectionModal.vue', () => {
  let wrapper
  let wrapperNoArea
  let state
  let actions
  beforeEach(async () => {
    // DefinedAreas.getAll.mockClear()
    // DefinedAreas.setAll.mockClear()

    // DefinedAreas.getAll.mockReturnValue([
    //   {
    //     id: 1,
    //     isEditing: true
    //   }, {
    //     id: 2,
    //     isEditing: false
    //   }, {
    //     id: 3,
    //     isEditing: false
    //   }]
    // )

    state = {
      all: [
        {
          id: 1
        }, {
          id: 2
        }, {
          id: 3
        }
      ]
    }

    actions = {
      removeArea: jest.fn(areasModule.actions.removeArea),
      setArea: jest.fn(areasModule.actions.setArea)
      // removeArea: areasModule.actions.removeArea,
      // setArea: areasModule.actions.setArea
    }
    const store = new Vuex.Store({
      modules: {
        areas: {
          namespaced: true,
          state,
          actions
        }
      }
    })
    wrapper = shallowMount(AreaSelectionModal, {
      store,
      localVue
    })

    wrapperNoArea = shallowMount(AreaSelectionModal, {
      store: new Vuex.Store({
        modules: {
          areas: {
            namespaced: true,
            state: {
              all: []
            },
            actions
          }
        }
      }),
      localVue
    })

    // wrapper = shallowMount(AreaSelectionModal)
    // expect(DefinedAreas.getAll).toHaveBeenCalledTimes(1)
  })

  it('created without value', () => {
    // DefinedAreas.getAll.mockReturnValue([])
    // const wrapper = shallowMount(AreaSelectionModal, {
    //   store: new Vuex.Store({
    //     modules: {
    //       areas: {
    //         namespaced: true,
    //         state: {
    //           all: []
    //         },
    //         actions
    //       }
    //     }
    //   }),
    //   localVue
    // })
    expect(wrapperNoArea.vm.areas.length).toBe(0)
    expect(wrapperNoArea.vm.editedArea.id).toBeFalsy()
  })

  it('created with value', () => {
    expect(wrapper.vm.areas.length).toBe(3)
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
    wrapper.find(AreaDetails).vm.$emit('input', { label: 'newArea' })
    expect(actions.setArea).toHaveBeenCalled()
    // expect(wrapper.vm.areas.length).toBe(4)
    // // expect(DefinedAreas.setAll).toHaveBeenLastCalledWith(wrapper.vm.areas)
    // expect(wrapper.vm.editedArea).toBe(wrapper.vm.areas[3])
    // expect(wrapper.vm.editedArea.id).toBe(4)
  })

  it('created without value and new area', () => {
    // DefinedAreas.getAll.mockReturnValue([])
    // const wrapper = shallowMount(AreaSelectionModal)
    expect(wrapperNoArea.vm.areas.length).toBe(0)
    expect(wrapperNoArea.vm.editedArea.id).toBeFalsy()
    wrapperNoArea.find(AreaDetails).vm.$emit('input', { label: 'newArea' })
    expect(actions.setArea).toHaveBeenCalled()
    // expect(wrapperNoArea.vm.areas.length).toBe(1)
    // expect(DefinedAreas.setAll).toHaveBeenLastCalledWith(wrapper.vm.areas)
    // expect(wrapperNoArea.vm.editedArea).toBe(wrapperNoArea.vm.areas[0])
    // expect(wrapperNoArea.vm.editedArea.id).toBe(1)
  })

  it('After edit with existing area', () => {
    expect(wrapper.vm.editedArea).toBe(false)
    wrapper.find('.managing-modal-list-container a').trigger('click')
    expect(wrapper.vm.editedArea).toBeTruthy()
    expect(wrapper.vm.editedArea.id).toBe(1)
    wrapper.find(AreaDetails).vm.$emit('input', { id: 1, label: 'existingArea' })
    expect(actions.setArea).toHaveBeenCalled()
    // expect(wrapper.vm.areas).toBe('existingArea')
    // expect(wrapper.vm.areas[0].label).toBe('existingArea')
    // expect(wrapper.vm.areas.length).toBe(3)
    // // expect(DefinedAreas.setAll).toHaveBeenLastCalledWith(wrapper.vm.areas)
    // expect(wrapper.vm.editedArea).toBe(wrapper.vm.areas[0])
    // expect(wrapper.vm.editedArea.id).toBe(1)
  })
})
