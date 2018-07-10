import Area from '@/store/area'
import Data from '@/store/data'
import Api from '@/store/api'

jest.mock('@/store/data', () => ({
  getStructure: jest.fn()
}))

jest.mock('@/store/api', () => ({
  getAreaInfos: jest.fn()
}))

describe('Settings.vue', () => {
  it('Calls getAllAreas', async () => {
    Data.getStructure.mockReturnValue({districts: [
      {
        id: 1
      }, {
        id: 2
      }
    ]})
    const areas = await Area.getAllAreas()
    expect(Data.getStructure).toBeCalled()
    expect(areas).toEqual([
      {
        id: 1,
        type: 'district'
      }, {
        id: 2,
        type: 'district'
      }
    ])
  })

  it('Calls setSelectedArea, getSelectedArea', () => {
    const selectedArea = {id: 1}
    Area.setSelectedArea(selectedArea)
    expect(Area.getSelectedArea()).toEqual(selectedArea)
  })

  it('Calls getAreaInfos', async () => {
    const areaInfos = {
      id: 1,
      info: 'text'
    }
    Api.getAreaInfos.mockReturnValue(areaInfos)
    const areaInfo = await Area.getAreaInfos(1)
    expect(Api.getAreaInfos).toBeCalledWith(1)
    expect(areaInfo).toEqual(areaInfos)
  })
})
