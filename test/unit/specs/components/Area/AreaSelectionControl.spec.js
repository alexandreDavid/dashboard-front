import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import AreaSelectionControl from '@/components/Area/AreaSelectionControl'

import AreaSelectionModal from '@/components/Area/AreaSelectionModal'

import areasModule from '@/store/modules/areas'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('AreaSelectionControl.vue', () => {
  let wrapper
  let areas
  beforeEach(() => {
    areas = {
      namespaced: true,
      state: {
        all: [{id: 1}, {id: 2}, {id: 3}]
      },
      getters: areasModule.getters
    }
    // areas.getters.getArea.mockReturnValue(1)
    const store = new Vuex.Store({
      modules: {
        areas
      }
    })
    wrapper = shallowMount(AreaSelectionControl, {
      store,
      localVue,
      propsData: {
        value: {id: 1}
      }
    })
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
  })

  it('On change value', () => {
    const newValue = 'newValue'
    expect(wrapper.vm.val).toEqual({id: 1})
    wrapper.setProps({ value: newValue })
    expect(wrapper.vm.val).toBe(newValue)
  })
})
