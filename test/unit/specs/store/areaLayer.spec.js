import AreaLayer from '@/store/areaLayer'
import axios from 'axios'
import L from 'leaflet'

const mockGeoJSON = {
  addTo: jest.fn().mockReturnThis(),
  getBounds: jest.fn().mockReturnValue('mockGetBounds'),
  remove: jest.fn()
}

L.GeoJSON = jest.fn().mockImplementation(() => mockGeoJSON)

jest.mock('axios', () => ({
  get: jest.fn()
}))
axios.get.mockReturnValue(Promise.resolve({ data: 'mockAxiosData' }))

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
    expect(axios.get).toHaveBeenCalledTimes(1)
  })

  it('Calls setSelectedArea without areaLayer', async () => {
    const areaLayer = new AreaLayer(mockMap)
    await areaLayer.setSelectedArea(mockArea)

    // expect(axios.get).toHaveBeenCalledWith('TEST_GEOSERVER_URL/boundaries/ows', {
    //   params: AreaLayer.getAreaRequestParams(mockArea)
    // })
    expect(mockGeoJSON.remove).not.toHaveBeenCalled()
    expect(L.GeoJSON).toHaveBeenCalledWith('mockAxiosData', AreaLayer.getAreaLayerStyle())
    expect(L.GeoJSON).toHaveBeenCalledWith('mockAxiosData', AreaLayer.getSubAreaLayerStyle())
    expect(mockGeoJSON.addTo).toHaveBeenCalledWith(mockMap)
  })

  it('Calls setSelectedArea with areaLayer', async () => {
    const areaLayer = new AreaLayer(mockMap, mockArea)
    await areaLayer.setSelectedArea(mockArea)

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

    axios.get.mockClear()
    await areaLayer.setSelectedArea(mockArea)
    expect(mockGeoJSON.remove).toBeCalled()
    expect(axios.get).not.toBeCalled()
  })

  it('Calls zoomToArea', async () => {
    const areaLayer = new AreaLayer(mockMap)
    await areaLayer.setSelectedArea(mockArea)
    areaLayer.zoomToArea()
    expect(areaLayer._areaLayer).toEqual(mockGeoJSON)
    expect(mockGeoJSON.getBounds).toHaveBeenCalled()
    expect(mockMap.fitBounds).toHaveBeenCalledWith('mockGetBounds')
  })

  it('Calls isReady', async () => {
    const areaLayer = new AreaLayer(mockMap)
    expect(areaLayer.isReady()).toBe(false)
    await areaLayer.setSelectedArea(mockArea)
    expect(areaLayer.isReady()).toBe(true)
  })
})
