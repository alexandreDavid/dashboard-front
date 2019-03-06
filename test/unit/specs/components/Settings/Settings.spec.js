import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Settings from '@/components/Settings/Settings'
// import myModule from '@/store/modules/settings'

const localVue = createLocalVue()

localVue.use(Vuex)

const mockSettings = [
  {
    'id': 'temperature',
    'label': 'Temperature units',
    'type': 'unit'
  },
  {
    'id': 'windSpeed',
    'label': 'Wind speed',
    'type': 'unit'
  }
]

describe('Settings.vue', () => {
  let state
  let store

  beforeEach(() => {
    state = {
      all: mockSettings
    }
    store = new Vuex.Store({
      modules: {
        settings: {
          namespaced: true,
          state
        }
      }
    })
  })

  it('Well created', () => {
    const wrapper = shallowMount(Settings, {
      store,
      localVue
    })
    // await wrapper.vm.$nextTick()
    // expect(SettingsService.getAllSettings).toBeCalled()
    // expect(SettingsService.getSettingsType).toHaveBeenCalledTimes(2)
    // expect(getters.getSettingsByType).toHaveBeenCalledTimes(2)
    // expect(wrapper.vm.settings).toEqual(mockSettings)
    expect(wrapper.findAll('.card-header').length).toBe(2)
    expect(wrapper.vm.openedFamilyType).toBe('unit')
    expect(wrapper.find('.card-header').text()).toBe('Weather units')
    expect(wrapper.find('.list-group').isVisible()).toBe(true)
  })

  it('Toggle collapsation', () => {
    // const wrapper = shallowMount(Settings)
    // expect(wrapper.vm.openedFamilyType).toBe('unit')
    // wrapper.find('.card-header').trigger('click')
    // expect(wrapper.vm.openedFamilyType).toBe('unit')
    // expect(wrapper.find('.list-group').isVisible()).toBe(true)
  })
})
