import Area from '@/store/area'
import Axios from 'axios'

jest.mock('axios', () => ({
  get: jest.fn()
}))

Object.defineProperty(process, 'env', {
  value: {API_URL: 'API_URL'}
})

describe('area.js', () => {
  it('Calls searchAreas and answers', async () => {
    Axios.get.mockReturnValue({data: true})
    const areas = await Area.searchAreas('areaName')
    expect(Axios.get).toBeCalled()
    expect(areas).toBe(true)
  })

  it('Calls searchAreas and throw error', async () => {
    Axios.get.mockRejectedValue(new Error('Async error'))
    const areas = await Area.searchAreas('areaName')
    expect(Axios.get).toBeCalled()
    expect(areas).toEqual([])
  })

  it('Calls getAreaInfos and throw error', async () => {
    Axios.get.mockRejectedValue(new Error('Async error'))
    let areas = false
    try {
      areas = await Area.getArea({id: 1})
    } catch (e) {

    }
    expect(Axios.get).toBeCalled()
    expect(areas).toBeFalsy()
  })
})
