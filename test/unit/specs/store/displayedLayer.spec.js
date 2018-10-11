import DisplayedLayer from '@/store/displayedLayer'
import axios from 'axios'
import L from 'leaflet'
import Unit from '@/utils/unit'
import UserConfiguration from '@/store/userConfiguration'

let mockTileLayerWMS = {
  addTo: jest.fn().mockReturnThis(),
  remove: jest.fn(),
  setParams: jest.fn(),
  setOpacity: jest.fn(),
  wmsParams: {
    time: 'time'
  },
  options: {},
  _url: '_url'
}

const mockParam = {
  layerUrl: 'layerUrl',
  layerParameters: {},
  unit: 'unit'
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

jest.mock('@/utils/unit', () => ({
  getFamilyUnit: jest.fn()
}))
jest.mock('@/store/userConfiguration', () => ({
  getUnitByFamily: jest.fn()
}))

describe('displayedLayer.js', () => {
  let displayedLayer
  beforeEach(function () {
    displayedLayer = new DisplayedLayer(mockMap)
    mockTileLayerWMS.remove.mockClear()
    mockMap.getBounds.mockClear()
    mockMap.getSize.mockClear()
    mockMap.getZoom.mockClear()
    mockMap.latLngToContainerPoint.mockClear()
    mockMap.toBBoxString.mockClear()
    Unit.getFamilyUnit.mockClear()
    UserConfiguration.getUnitByFamily.mockClear()
  })
  it('Calls setDisplayedLayer and do nothing', () => {
    displayedLayer.setDisplayedLayer()
    expect(mockTileLayerWMS.remove).not.toHaveBeenCalled()
    expect(L.TileLayer.WMS).not.toHaveBeenCalled()
    expect(mockTileLayerWMS.addTo).not.toHaveBeenCalled()
  })

  it('Calls setDisplayedLayer and init displayedLayer', () => {
    displayedLayer.setDisplayedLayer(mockParam)
    expect(mockTileLayerWMS.remove).not.toHaveBeenCalled()
    expect(L.TileLayer.WMS).toHaveBeenCalledWith(mockParam.layerUrl, mockParam.layerParameters)
    expect(mockTileLayerWMS.addTo).toHaveBeenCalledWith(mockMap)
  })

  it('Calls setDisplayedLayer remove and init displayedLayer', () => {
    displayedLayer._displayedLayer = mockTileLayerWMS
    displayedLayer.setDisplayedLayer(mockParam)
    expect(mockTileLayerWMS.remove).toHaveBeenCalled()
    expect(L.TileLayer.WMS).toHaveBeenCalledWith(mockParam.layerUrl, mockParam.layerParameters)
    expect(mockTileLayerWMS.addTo).toHaveBeenCalledWith(mockMap)
  })

  it('Calls getFeatureInfo and do nothing', async () => {
    displayedLayer.getFeatureInfo('evt', mockMap)
    expect(mockMap.getZoom).not.toHaveBeenCalled()
  })

  it('Calls getFeatureInfo with params.version !== 1.3.0', async () => {
    displayedLayer.setDisplayedLayer(mockParam)
    displayedLayer.getFeatureInfo({latlng: 'latlng'})
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
      time: 'time',
      transparent: undefined,
      version: undefined,
      width: 'getSizeX',
      x: 'x',
      y: 'y'
    }})
  })

  it('Calls getFeatureInfo with params.version === 1.3.0', async () => {
    mockTileLayerWMS.options.version = '1.3.0'
    displayedLayer.setDisplayedLayer(mockParam)
    displayedLayer.getFeatureInfo({latlng: 'latlng'})
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
      time: 'time',
      transparent: undefined,
      version: '1.3.0',
      width: 'getSizeX',
      i: 'x',
      j: 'y'
    }})
  })

  it('Calls setTime', async () => {
    displayedLayer.setDisplayedLayer(mockParam)
    displayedLayer.setTime(1000000000, 10000000001)
    expect(mockTileLayerWMS.setParams).toHaveBeenCalled()
  })

  it('Set units', () => {
    Unit.getFamilyUnit.mockReturnValue('getFamilyUnit')
    UserConfiguration.getUnitByFamily.mockReturnValue('getUnitByFamily')
    displayedLayer.setDisplayedLayer(mockParam)
    expect(displayedLayer.getDefaultUnit()).toBe(mockParam.unit)
    expect(displayedLayer.getUnit()).toBe('unit')
    displayedLayer.setUnit('newUnit')
    expect(displayedLayer.getUnit()).toBe('newUnit')
  })
})
