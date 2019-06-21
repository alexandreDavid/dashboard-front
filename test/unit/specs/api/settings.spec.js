// api/settings.spec.js

import Settings from '@/api/settings'

const mockSecuredInstance = {
  get: jest.fn(),
  put: jest.fn()
}

jest.mock('@/api/securedInstance', () => {
  return jest.fn().mockImplementation(() => mockSecuredInstance)
})

describe('api/settings.js', () => {
  beforeEach(() => {
    mockSecuredInstance.get.mockClear()
    mockSecuredInstance.put.mockClear()
  })

  it('Call getAll', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await Settings.getAll()
    expect(mockSecuredInstance.get).toBeCalledWith('/settings')
    expect(result).toBe(mockData)
  })

  it('Call getAll reject', async () => {
    mockSecuredInstance.get.mockRejectedValue()
    const result = await Settings.getAll()
    expect(mockSecuredInstance.get).toBeCalledWith('/settings')
    expect(result).toBe(false)
  })

  it('Call getActive', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await Settings.getActive()
    expect(mockSecuredInstance.get).toBeCalledWith('/settings/active')
    expect(result).toBe(mockData)
  })

  it('Call getActive reject', async () => {
    mockSecuredInstance.get.mockRejectedValue()
    const result = await Settings.getActive()
    expect(mockSecuredInstance.get).toBeCalledWith('/settings/active')
    expect(result).toBe(false)
  })

  it('Call setActive', async () => {
    const mockData = 'mockData'
    const id = 'idSetting'
    mockSecuredInstance.put.mockResolvedValue({data: mockData})
    const result = await Settings.setActive(id, true)
    expect(mockSecuredInstance.put).toBeCalledWith('/settings/active/idSetting', { key: true })
    expect(result).toBe(mockData)
  })

  it('Call setActive reject', async () => {
    const id = 'idSetting'
    mockSecuredInstance.put.mockRejectedValue()
    const result = await Settings.setActive(id, true)
    expect(mockSecuredInstance.put).toBeCalledWith('/settings/active/idSetting', { key: true })
    expect(result).toBe(false)
  })
})
