import DisplayedLayer from '@/store/displayedLayer'
import axios from 'axios'
import L from 'leaflet'

let mockTileLayerWMS = {
  addTo: jest.fn().mockReturnThis(),
  remove: jest.fn(),
  setParams: jest.fn(),
  options: {},
  _url: '_url'
}

L.TileLayer.WMS = jest.fn().mockImplementation(() => mockTileLayerWMS)

jest.mock('axios', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve({ data: 'mockAxiosData' }))
}))

const mockMap = {
  getBounds: jest.fn().mockReturnThis(),
  getSize: jest.fn().mockReturnValue({x: 'getSizeX', y: 'getSizeY'}),
  getZoom: jest.fn(),
  latLngToContainerPoint: jest.fn().mockReturnValue({x: 'x', y: 'y'}),
  toBBoxString: jest.fn().mockReturnValue('toBBoxString')
}

describe('displayedLayer.js', () => {
  let displayedLayer
  beforeEach(function () {
    displayedLayer = new DisplayedLayer()
    mockTileLayerWMS.remove.mockClear()
    mockMap.getBounds.mockClear()
    mockMap.getSize.mockClear()
    mockMap.getZoom.mockClear()
    mockMap.latLngToContainerPoint.mockClear()
    mockMap.toBBoxString.mockClear()
  })
  it('Calls setDisplayedLayer and do nothing', () => {
    displayedLayer.setDisplayedLayer()
    expect(mockTileLayerWMS.remove).not.toHaveBeenCalled()
    expect(L.TileLayer.WMS).not.toHaveBeenCalled()
    expect(mockTileLayerWMS.addTo).not.toHaveBeenCalled()
  })

  it('Calls setDisplayedLayer and init displayedLayer', () => {
    displayedLayer.setDisplayedLayer(mockMap, 'layerUrl')
    expect(mockTileLayerWMS.remove).not.toHaveBeenCalled()
    expect(L.TileLayer.WMS).toHaveBeenCalledWith('layerUrl', {})
    expect(mockTileLayerWMS.addTo).toHaveBeenCalledWith(mockMap)
  })

  it('Calls setDisplayedLayer remove and init displayedLayer', () => {
    displayedLayer._displayedLayer = mockTileLayerWMS
    displayedLayer.setDisplayedLayer(mockMap, 'layerUrl')
    expect(mockTileLayerWMS.remove).toHaveBeenCalled()
    expect(L.TileLayer.WMS).toHaveBeenCalledWith('layerUrl', {})
    expect(mockTileLayerWMS.addTo).toHaveBeenCalledWith(mockMap)
  })

  it('Calls getFeatureInfo and do nothing', async () => {
    displayedLayer.getFeatureInfo('evt', mockMap)
    expect(mockMap.getZoom).not.toHaveBeenCalled()
  })

  it('Calls getFeatureInfo with params.version !== 1.3.0', async () => {
    displayedLayer.setDisplayedLayer(mockMap, 'layerUrl')
    displayedLayer.getFeatureInfo({latlng: 'latlng'}, mockMap)
    expect(mockMap.getZoom).toHaveBeenCalledTimes(1)
    expect(mockMap.latLngToContainerPoint).toHaveBeenCalledWith('latlng', mockMap.getZoom())
    expect(mockMap.getSize).toHaveBeenCalledTimes(1)
    expect(mockMap.getBounds).toHaveBeenCalledTimes(1)
    expect(mockMap.toBBoxString).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('_url', {params: {
      bbox: 'toBBoxString',
      format: undefined,
      height: 'getSizeY',
      info_format: 'application/json',
      layers: undefined,
      query_layers: undefined,
      request: 'GetFeatureInfo',
      service: 'WMS',
      srs: 'EPSG:4326',
      styles: undefined,
      transparent: undefined,
      version: undefined,
      width: 'getSizeX',
      x: 'x',
      y: 'y'
    }})
  })

  it('Calls getFeatureInfo with params.version === 1.3.0', async () => {
    mockTileLayerWMS.addTo.mockReturnValue({...mockTileLayerWMS, options: {version: '1.3.0'}})
    displayedLayer.setDisplayedLayer(mockMap, 'layerUrl')
    displayedLayer.getFeatureInfo({latlng: 'latlng'}, mockMap)
    expect(mockMap.getZoom).toHaveBeenCalled()
    expect(mockMap.latLngToContainerPoint).toHaveBeenCalledWith('latlng', mockMap.getZoom())
    expect(mockMap.getSize).toHaveBeenCalledTimes(1)
    expect(mockMap.getBounds).toHaveBeenCalledTimes(1)
    expect(mockMap.toBBoxString).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('_url', {params: {
      bbox: 'toBBoxString',
      format: undefined,
      height: 'getSizeY',
      info_format: 'application/json',
      layers: undefined,
      query_layers: undefined,
      request: 'GetFeatureInfo',
      service: 'WMS',
      srs: 'EPSG:4326',
      styles: undefined,
      transparent: undefined,
      version: '1.3.0',
      width: 'getSizeX',
      i: 'x',
      j: 'y'
    }})
  })

  it('Calls setDate', async () => {
    displayedLayer.setDisplayedLayer(mockMap, 'layerUrl')
    displayedLayer.setDate(1000000000, 10000000001)
    expect(mockTileLayerWMS.setParams).toHaveBeenCalled()
  })
})
