// store/geoResourcesGroups.spec.js

import geoResourcesGroups from '@/store/geoResourcesGroups'
import axios from 'axios'

jest.mock('axios', () => ({
  get: jest.fn()
}))

describe('store/geoResourcesGroups.js', () => {
  it('Call getAll', async () => {
    const mockCallGroups = 'mockCallGroups'
    axios.get.mockResolvedValueOnce({ data: mockCallGroups })
    await geoResourcesGroups.getAllGroups()
    expect(axios.get).toBeCalled()

    expect(geoResourcesGroups.getAll()).toBe(mockCallGroups)
  })
})
