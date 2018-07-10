import Settings from '@/store/settings'
import Api from '@/store/api'

jest.mock('@/store/api', () => ({
  setSettings: jest.fn()
}))

describe('Settings.vue', () => {
  it('Calls getSettings', () => {
    const initVal = ['test']
    Settings.init(initVal)
    expect(Settings.getSettings()).toBe(initVal)
  })

  it('Calls getSettingById', () => {
    const initVal = [{
      id: 1
    }]
    Settings.init(initVal)
    expect(Settings.getSettingById(1)).toBe(initVal[0])
    expect(Settings.getSettingById(-1)).toBeFalsy()
  })

  it('Calls getSettingsFamily', () => {
    const initVal = [{
      id: 1,
      family: 1
    }, {
      id: 2,
      family: 1
    }, {
      id: 3,
      family: 2
    }]
    Settings.init(initVal)
    expect(Settings.getSettingsFamily(1)).toEqual([{
      id: 1,
      family: 1
    }, {
      id: 2,
      family: 1
    }])
    expect(Settings.getSettingById(-1)).toBeFalsy()
  })

  it('Calls getActiveKeyById', () => {
    const initVal = [{
      id: 1,
      value: 'value'
    }]
    Settings.init(initVal)
    expect(Settings.getActiveKeyById(1)).toBe('value')
    expect(Settings.getActiveKeyById(-1)).toBeFalsy()
  })

  it('Calls setActiveKeyById', () => {
    const initVal = [{
      id: 1,
      value: 'value'
    }]
    Settings.init(initVal)
    Settings.setActiveKeyById(1, { key: 'key', label: 'label' })
    expect(Settings.getSettingById(1)).toEqual({
      id: 1,
      value: 'value',
      key: 'key',
      label: 'label'
    })
    expect(Api.setSettings).toBeCalledWith(Settings.getSettings())
  })
})
