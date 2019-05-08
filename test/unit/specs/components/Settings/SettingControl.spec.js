import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SettingControl from '@/components/Settings/SettingControl'

const localVue = createLocalVue()

localVue.use(Vuex)

const setting = {
  id: 1,
  label: 'label',
  values: [
    {
      key: 1,
      label: 'label1'
    }, {
      key: 2,
      label: 'label2'
    }
  ]
}

describe('SettingControl.vue', () => {
  let wrapper
  let actions
  let getters
  let store

  beforeEach(() => {
    actions = {
      setActiveKeyById: jest.fn()
    }

    getters = {
      getActiveKeyById: (state) => (id) => {
        return 1
      }
    }
    store = new Vuex.Store({
      modules: {
        settings: {
          namespaced: true,
          actions,
          getters
        }
      }
    })
    wrapper = shallowMount(SettingControl, {
      propsData: {
        setting
      },
      store,
      localVue
    })
  })

  it('Well created', async () => {
    expect(wrapper.find('.card-title').text()).toBe('label 1')
    const buttons = wrapper.findAll('.btn')
    expect(buttons.length).toBe(2)
    expect(buttons.at(0).classes()).toContain('active')
    expect(wrapper.vm.activeKey).toBe(1)
  })

  it('On change selected value', async () => {
    const buttons = wrapper.findAll('.btn')
    expect(buttons.at(0).classes()).toContain('active')
    expect(buttons.at(1).classes()).not.toContain('active')

    buttons.at(1).trigger('click')
    expect(actions.setActiveKeyById).toBeCalledWith(expect.any(Object), {id: 1, key: 2}, undefined)
    expect(buttons.at(0).classes()).not.toContain('active')
    expect(buttons.at(1).classes()).toContain('active')
  })
})
