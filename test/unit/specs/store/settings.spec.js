import Settings from '@/store/settings'
import Api from '@/store/api'
import UserConfiguration from '@/store/userConfiguration'

jest.mock('@/store/api', () => ({
  getSettings: jest.fn()
}))
const mockGetSettings = [{
  id: 1,
  type: 1
}, {
  id: 2,
  type: 1
}, {
  id: 3,
  type: 2
}]
Api.getSettings.mockReturnValue(Promise.resolve(mockGetSettings))

jest.mock('@/store/userConfiguration', () => ({
  getActiveSettings: jest.fn(),
  setActiveSettings: jest.fn()
}))

UserConfiguration.getActiveSettings.mockReturnValue({
  1: 1,
  2: 3
})

describe('Settings.js', () => {
  it('Calls getSettings', async () => {
    await Settings.init()
    expect(Settings.getAllSettings()).toEqual(mockGetSettings)
  })

  it('Calls getSettingById', () => {
    expect(Settings.getSettingById(1)).toEqual(mockGetSettings[0])
    expect(Settings.getSettingById(-1)).toBeFalsy()
  })

  it('Calls getSettingsType', () => {
    expect(Settings.getSettingsType(1)).toEqual([{
      id: 1,
      type: 1
    }, {
      id: 2,
      type: 1
    }])
    expect(Settings.getSettingById(-1)).toBeFalsy()
  })

  it('Calls getActiveKeyById', () => {
    expect(Settings.getActiveKeyById(1)).toBe(1)
    expect(Settings.getActiveKeyById(-1)).toBeFalsy()
  })

  it('Calls setActiveKeyById', () => {
    Settings.setActiveKeyById(1, 'key')
    expect(Settings.activeSettings[1]).toBe('key')
    expect(UserConfiguration.setActiveSettings).toBeCalledWith(Settings.activeSettings)
  })
})
