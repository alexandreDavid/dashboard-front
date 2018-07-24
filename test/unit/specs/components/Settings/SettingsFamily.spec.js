import SettingsFamily from '@/components/Settings/SettingsFamily'
import { shallowMount } from '@vue/test-utils'
import SettingControl from '@/components/Settings/SettingControl'

describe('Settings.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(SettingsFamily, {
      propsData: {
        settingsFamily: {
          id: 1,
          label: 'label',
          settingsList: [
            {id: 1},
            {id: 2}
          ]
        }
      }
    })
  })
  it('Well created', () => {
    expect(wrapper.vm.isCollapsed).toBe(false)
    expect(wrapper.find('.card-header').text()).toBe('label')
    expect(wrapper.find('.list-group').isVisible()).toBe(false)
    expect(wrapper.findAll(SettingControl).length).toBe(2)
  })

  it('Toggle collapsation', () => {
    expect(wrapper.vm.isCollapsed).toBe(false)
    wrapper.find('.card-header').trigger('click')
    expect(wrapper.vm.isCollapsed).toBe(true)
    expect(wrapper.find('.list-group').isVisible()).toBe(true)
  })
})
