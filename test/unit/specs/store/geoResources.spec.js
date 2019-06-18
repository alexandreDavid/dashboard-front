// store/geoResources.spec.js

import geoResources from '@/store/geoResources'
import axios from 'axios'

jest.mock('axios', () => ({
  get: jest.fn()
}))

describe('store/geoResources.js', () => {
  it('Call getAll', async () => {
    const mockCallResources = 'mockCallResources'
    axios.get.mockResolvedValueOnce({ data: mockCallResources })
    await geoResources.getAllResources()
    expect(axios.get).toBeCalled()

    expect(geoResources.getAll()).toBe(mockCallResources)
  })

  it('Call searchById', async () => {
    const mockResource2find = { id: 2 }
    const mockCallResources = [
      { id: 1 },
      mockResource2find,
      { id: 3 }
    ]
    axios.get.mockResolvedValueOnce({ data: mockCallResources })
    await geoResources.getAllResources()

    expect(geoResources.searchById(2)).toBe(mockResource2find)
  })
})
