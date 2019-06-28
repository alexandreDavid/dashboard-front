import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import EditAreaField from '@/components/Dashboard/EditWidget/EditAreaField'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('EditAreaField.vue', () => {
  let state
  let getters
  let store

  beforeEach(() => {
    state = {
      all: [{ id: 'id' }],
      active: 'active'
    }
    getters = {
      activeArea: (state) => {
        return state.active
      },
      getArea: (state) => (id) => {
        return state.all.find(o => o.id === id)
      }
    }
    store = new Vuex.Store({
      modules: {
        areas: {
          namespaced: true,
          state,
          getters
        }
      }
    })
  })

  it('Mount without value', async () => {
    const wrapper = shallowMount(EditAreaField, {
      store,
      localVue
    })
    expect(wrapper.vm.selectedArea).toEqual('active')
  })

  it('Mount with value', async () => {
    const wrapper = shallowMount(EditAreaField, {
      propsData: {
        value: {
          id: 'id'
        }
      },
      store,
      localVue
    })
    expect(wrapper.vm.selectedArea).toEqual({ id: 'id' })
    expect(wrapper.vm.hasAdvancedArea).toBe(true)
  })
})
