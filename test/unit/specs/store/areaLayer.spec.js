import AreaLayer from '@/store/areaLayer'
import Area from '@/store/area'
import L from 'leaflet'

const mockGetBounds = {
  isValid: jest.fn().mockReturnValue(true)
}
const mockGeoJSON = {
  addTo: jest.fn().mockReturnThis(),
  getBounds: jest.fn().mockImplementation(() => mockGetBounds),
  remove: jest.fn()
}

L.GeoJSON = jest.fn().mockImplementation(() => mockGeoJSON)

jest.mock('@/store/area', () => ({
  getArea: jest.fn(),
  getSubAreas: jest.fn()
}))
Area.getArea.mockReturnValue({data: 'mockAxiosData'})
Area.getSubAreas.mockReturnValue({data: 'mockAxiosData'})

const mockMap = {
  fitBounds: jest.fn()
}
const mockArea = {
  workspaceName: 'workspaceName',
  paramName: 'paramName'
}
process.env.GEOSERVER_URL = 'TEST_GEOSERVER_URL'

describe('areaLayer.js', () => {
  it('Create object without area', () => {
    const area = new AreaLayer(mockMap)
    expect(area._map).toBe(mockMap)
    expect(area._areaLayer).toBe(false)
  })

  it('Create object with area', () => {
    const area = new AreaLayer(mockMap, {})
    expect(area._map).toBe(mockMap)
    expect(Area.getArea).toHaveBeenCalledTimes(1)
  })

  it('Calls setSelectedArea without areaLayer', async () => {
    const areaLayer = new AreaLayer(mockMap)
    await areaLayer.setSelectedArea(mockArea)

    expect(mockGeoJSON.remove).not.toHaveBeenCalled()
    expect(L.GeoJSON).toHaveBeenCalledWith('mockAxiosData', AreaLayer.getAreaLayerStyle())
    expect(L.GeoJSON).toHaveBeenCalledWith('mockAxiosData', AreaLayer.getSubAreaLayerStyle())
    expect(mockGeoJSON.addTo).toHaveBeenCalledWith(mockMap)
  })

  it('Calls setSelectedArea with areaLayer', async () => {
    const areaLayer = new AreaLayer(mockMap)
    await areaLayer.setSelectedArea(mockArea)
    expect(mockGeoJSON.remove).not.toBeCalled()
    await areaLayer.setSelectedArea(mockArea)
    expect(mockGeoJSON.remove).toBeCalled()

    // expect(axios.get).toHaveBeenCalledWith('TEST_GEOSERVER_URL/boundaries/ows', {
    //   params: AreaLayer.getAreaRequestParams(mockArea)
    // })
    expect(mockGeoJSON.remove).toBeCalled()
    expect(L.GeoJSON).toHaveBeenCalledWith('mockAxiosData', AreaLayer.getAreaLayerStyle())
    expect(L.GeoJSON).toHaveBeenCalledWith('mockAxiosData', AreaLayer.getSubAreaLayerStyle())
    expect(mockGeoJSON.addTo).toHaveBeenCalledWith(mockMap)
  })
  it('Calls setSelectedArea with areaLayer Uganda', async () => {
    const mockArea = {
      workspaceName: 'workspaceName',
      paramName: 'paramName',
      id: 7552
    }
    const areaLayer = new AreaLayer(mockMap)
    await areaLayer.setSelectedArea(mockArea)
    expect(L.GeoJSON).toHaveBeenCalledWith('mockAxiosData', AreaLayer.getAreaLayerStyle())
    expect(L.GeoJSON).toHaveBeenCalledWith('mockAxiosData', AreaLayer.getSubAreaLayerStyle())

    await areaLayer.setSelectedArea(mockArea)
    expect(mockGeoJSON.remove).toBeCalled()
  })

  it('Calls zoomToArea', async () => {
    const areaLayer = new AreaLayer(mockMap)
    await areaLayer.setSelectedArea(mockArea)
    areaLayer.zoomToArea()
    expect(areaLayer._areaLayer).toEqual(mockGeoJSON)
    expect(mockGeoJSON.getBounds).toHaveBeenCalled()
    expect(mockMap.fitBounds).toHaveBeenCalledWith(mockGetBounds)
  })

  it('Calls isReady', async () => {
    const areaLayer = new AreaLayer(mockMap)
    expect(areaLayer.isReady()).toBe(false)
    await areaLayer.setSelectedArea(mockArea)
    expect(areaLayer.isReady()).toBe(true)
  })
})
