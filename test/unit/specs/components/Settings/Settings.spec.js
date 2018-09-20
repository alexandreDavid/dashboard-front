import Settings from '@/components/Settings/Settings'
import { shallowMount } from '@vue/test-utils'
import SettingsService from '@/store/settings'

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

jest.mock('@/store/settings', () => ({
  getAllSettings: jest.fn(),
  getSettingsType: jest.fn()
}))

SettingsService.getAllSettings.mockReturnValue(mockSettings)
SettingsService.getSettingsType.mockReturnValue(mockSettings)

describe('Settings.vue', () => {
  it('Well created', async () => {
    const wrapper = shallowMount(Settings)
    await wrapper.vm.$nextTick()
    expect(SettingsService.getAllSettings).toBeCalled()
    expect(SettingsService.getSettingsType).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.settings).toEqual(mockSettings)
    expect(wrapper.findAll('.card-header').length).toBe(2)
    expect(wrapper.vm.openedFamilyType).toBe('unit')
    expect(wrapper.find('.card-header').text()).toBe('Weather units')
    expect(wrapper.find('.list-group').isVisible()).toBe(true)
  })

  it('Toggle collapsation', () => {
    const wrapper = shallowMount(Settings)
    expect(wrapper.vm.openedFamilyType).toBe('unit')
    wrapper.find('.card-header').trigger('click')
    expect(wrapper.vm.openedFamilyType).toBe('unit')
    expect(wrapper.find('.list-group').isVisible()).toBe(true)
  })
})
