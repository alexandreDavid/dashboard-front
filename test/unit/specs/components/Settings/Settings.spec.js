import Settings from '@/components/Settings/Settings'
import { shallowMount } from '@vue/test-utils'
import Api from '@/store/api'
import SettingsFamily from '@/components/Settings/SettingsFamily'

const mockSettings = [
  {id: 1},
  {id: 2}
]

jest.mock('@/store/api', () => ({
  getSettings: jest.fn()
}))

Api.getSettings.mockReturnValue(Promise.resolve(mockSettings))

describe('Settings.vue', () => {
  it('Well created', async () => {
    const wrapper = shallowMount(Settings)
    await wrapper.vm.$nextTick()
    expect(Api.getSettings).toBeCalled()
    expect(wrapper.vm.settings).toEqual(mockSettings)
    expect(wrapper.findAll(SettingsFamily).length).toBe(2)
  })
})
