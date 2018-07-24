import SettingControl from '@/components/Settings/SettingControl'
import { shallowMount } from '@vue/test-utils'
import Settings from '@/store/settings'

jest.mock('@/store/settings', () => ({
  getActiveKeyById: jest.fn(),
  setActiveKeyById: jest.fn()
}))

Settings.getActiveKeyById.mockReturnValue(1)

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
  it('Well created', async () => {
    const wrapper = shallowMount(SettingControl, {
      propsData: {
        setting
      }
    })
    expect(Settings.getActiveKeyById).toBeCalledWith(1)
    expect(wrapper.find('.card-title').text()).toBe('label')
    const buttons = wrapper.findAll('.btn')
    expect(buttons.length).toBe(2)
    expect(buttons.at(0).classes()).toContain('active')
  })

  it('On change selected value', async () => {
    const wrapper = shallowMount(SettingControl, {
      propsData: {
        setting
      }
    })
    const buttons = wrapper.findAll('.btn')
    expect(buttons.at(0).classes()).toContain('active')
    expect(buttons.at(1).classes()).not.toContain('active')

    buttons.at(1).trigger('click')
    expect(Settings.setActiveKeyById).toBeCalledWith(1, {
      key: 2,
      label: 'label2'
    })
    expect(buttons.at(0).classes()).not.toContain('active')
    expect(buttons.at(1).classes()).toContain('active')
  })
})
