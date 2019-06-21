// api/abstractSecuredApiClass.spec.js

import AbstractSecuredApiClass from '@/api/abstractSecuredApiClass'

const mockSecuredInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}

jest.mock('@/api/securedInstance', () => {
  return jest.fn().mockImplementation(() => mockSecuredInstance)
})

describe('api/abstractSecuredApiClass.js', () => {
  let testedClass
  const path = 'path'

  beforeEach(() => {
    testedClass = new AbstractSecuredApiClass(path)
    mockSecuredInstance.get.mockClear()
    mockSecuredInstance.post.mockClear()
    mockSecuredInstance.put.mockClear()
    mockSecuredInstance.delete.mockClear()
  })

  it('Call getAll', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await testedClass.getAll()
    expect(mockSecuredInstance.get).toBeCalledWith(`/${path}`)
    expect(result).toBe(mockData)
  })

  it('Call getAll reject', async () => {
    mockSecuredInstance.get.mockRejectedValue()
    const result = await testedClass.getAll()
    expect(mockSecuredInstance.get).toBeCalledWith(`/${path}`)
    expect(result).toBe(false)
  })

  it('Call getById', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await testedClass.getById('id')
    expect(mockSecuredInstance.get).toBeCalledWith(`/${path}/id`)
    expect(result).toBe(mockData)
  })

  it('Call getById reject', async () => {
    mockSecuredInstance.get.mockRejectedValue()
    const result = await testedClass.getById('id')
    expect(mockSecuredInstance.get).toBeCalledWith(`/${path}/id`)
    expect(result).toBe(false)
  })

  it('Call add', async () => {
    const mockData = 'mockData'
    const addObj = { addObj: 'addObj' }
    mockSecuredInstance.post.mockResolvedValue({data: mockData})
    const result = await testedClass.add(addObj)
    expect(mockSecuredInstance.post).toBeCalledWith(`/${path}`, addObj)
    expect(result).toBe(mockData)
  })

  it('Call add reject', async () => {
    const addObj = { addObj: 'addObj' }
    mockSecuredInstance.post.mockRejectedValue()
    const result = await testedClass.add(addObj)
    expect(mockSecuredInstance.post).toBeCalledWith(`/${path}`, addObj)
    expect(result).toBe(false)
  })

  it('Call update', async () => {
    const mockData = 'mockData'
    const updateObj = { id: 'idUpdateObj' }
    mockSecuredInstance.put.mockResolvedValue({data: mockData})
    const result = await testedClass.update(updateObj)
    expect(mockSecuredInstance.put).toBeCalledWith(`/${path}/idUpdateObj`, updateObj)
    expect(result).toBe(mockData)
  })

  it('Call update reject', async () => {
    const updateObj = { id: 'idUpdateObj' }
    mockSecuredInstance.put.mockRejectedValue()
    const result = await testedClass.update(updateObj)
    expect(mockSecuredInstance.put).toBeCalledWith(`/${path}/idUpdateObj`, updateObj)
    expect(result).toBe(false)
  })

  it('Call delete', async () => {
    const mockData = 'mockData'
    const deleteObj = { id: 'idDeleteObj' }
    mockSecuredInstance.delete.mockResolvedValue({data: mockData})
    const result = await testedClass.delete(deleteObj)
    expect(mockSecuredInstance.delete).toBeCalledWith(`/${path}/idDeleteObj`)
    expect(result).toBe(mockData)
  })

  it('Call delete reject', async () => {
    const updateObj = { id: 'idDeleteObj' }
    mockSecuredInstance.delete.mockRejectedValue()
    const result = await testedClass.delete(updateObj)
    expect(mockSecuredInstance.delete).toBeCalledWith(`/${path}/idDeleteObj`)
    expect(result).toBe(false)
  })
})
