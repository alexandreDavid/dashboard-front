// api/dashboards.spec.js

import Dashboards from '@/api/dashboards'

const mockSecuredInstance = {
  get: jest.fn(),
  patch: jest.fn()
}

jest.mock('@/api/securedInstance', () => {
  return jest.fn().mockImplementation(() => mockSecuredInstance)
})

describe('api/dashboards.js', () => {
  beforeEach(() => {
    mockSecuredInstance.get.mockClear()
    mockSecuredInstance.patch.mockClear()
  })

  it('Call getShared', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await Dashboards.getShared()
    expect(mockSecuredInstance.get).toBeCalledWith('/dashboards/shared')
    expect(result).toBe(mockData)
  })

  it('Call getShared reject', async () => {
    mockSecuredInstance.get.mockRejectedValue()
    const result = await Dashboards.getShared()
    expect(mockSecuredInstance.get).toBeCalledWith('/dashboards/shared')
    expect(result).toBe(false)
  })

  it('Call setShared', async () => {
    const mockData = 'mockData'
    const dashboard = { id: 'idDashboard' }
    mockSecuredInstance.patch.mockResolvedValue({data: mockData})
    const result = await Dashboards.setShared(dashboard, true)
    expect(mockSecuredInstance.patch).toBeCalledWith('/dashboards/idDashboard', { shared: true })
    expect(result).toBe(mockData)
  })

  it('Call setShared reject', async () => {
    const dashboard = { id: 'idDashboard' }
    mockSecuredInstance.patch.mockRejectedValue()
    const result = await Dashboards.setShared(dashboard, true)
    expect(mockSecuredInstance.patch).toBeCalledWith('/dashboards/idDashboard', { shared: true })
    expect(result).toBe(false)
  })
})
