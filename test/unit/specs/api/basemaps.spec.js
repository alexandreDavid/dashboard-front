// api/basemaps.spec.js

import Basemaps from '@/api/basemaps'

const mockSecuredInstance = {
  get: jest.fn(),
  put: jest.fn()
}

jest.mock('@/api/securedInstance', () => {
  return jest.fn().mockImplementation(() => mockSecuredInstance)
})

describe('api/basemaps.js', () => {
  beforeEach(() => {
    mockSecuredInstance.get.mockClear()
    mockSecuredInstance.put.mockClear()
  })

  it('Call getAll', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await Basemaps.getAll()
    expect(mockSecuredInstance.get).toBeCalledWith('/basemaps')
    expect(result).toBe(mockData)
  })

  it('Call getAll reject', async () => {
    mockSecuredInstance.get.mockRejectedValue()
    const result = await Basemaps.getAll()
    expect(mockSecuredInstance.get).toBeCalledWith('/basemaps')
    expect(result).toBe(false)
  })

  it('Call getActive', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await Basemaps.getActive()
    expect(mockSecuredInstance.get).toBeCalledWith('/basemaps/active')
    expect(result).toBe(mockData)
  })

  it('Call getActive reject', async () => {
    mockSecuredInstance.get.mockRejectedValue()
    const result = await Basemaps.getActive()
    expect(mockSecuredInstance.get).toBeCalledWith('/basemaps/active')
    expect(result).toBe(false)
  })

  it('Call setActive', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.put.mockResolvedValue({data: mockData})
    const result = await Basemaps.setActive('id')
    expect(mockSecuredInstance.put).toBeCalledWith('/basemaps/active/id')
    expect(result).toBe(mockData)
  })

  it('Call getActive reject', async () => {
    mockSecuredInstance.put.mockRejectedValue()
    const result = await Basemaps.setActive('id')
    expect(mockSecuredInstance.put).toBeCalledWith('/basemaps/active/id')
    expect(result).toBe(false)
  })
})
