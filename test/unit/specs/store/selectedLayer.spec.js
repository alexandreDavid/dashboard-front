import SelectedLayer from '@/store/selectedLayer'
import axios from 'axios'
import L from 'leaflet'
import Unit from '@/utils/unit'
import Settings from '@/store/settings'

let mockTileLayer = {
  addTo: jest.fn().mockReturnThis(),
  remove: jest.fn(),
  setParams: jest.fn(),
  setOpacity: jest.fn(),
  redraw: jest.fn(),
  wmsParams: {
    time: 'time'
  },
  options: {},
  _url: '_url'
}

const mockGeoResource = {
  config: {
    layer_creation: {
      link: 'link',
      params: {
        date: {
          values: [0, 1, 2, 3]
        }
      }
    },
    layer: {
      link: 'link'
    },
    legend: {
      link: 'link'
    },
    units: {
      default: 'default'
    }
  }
}

L.TileLayer = jest.fn().mockImplementation(() => mockTileLayer)

jest.mock('axios', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve({ data: {layer_id: 'layer_id'} })),
  get: jest.fn().mockReturnValue(Promise.resolve({ data: {features: 'features'} }))
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
jest.mock('@/store/settings', () => ({
  getActiveKeyById: jest.fn()
}))

describe('selectedLayer.js', () => {
  let selectedLayer
  beforeEach(function () {
    selectedLayer = new SelectedLayer(mockMap)
    mockTileLayer.remove.mockClear()
    mockMap.getBounds.mockClear()
    mockMap.getSize.mockClear()
    mockMap.getZoom.mockClear()
    mockMap.latLngToContainerPoint.mockClear()
    mockMap.toBBoxString.mockClear()
    Unit.getFamilyUnit.mockClear()
    Settings.getActiveKeyById.mockClear()
  })
  it('Calls setLayer and do nothing', () => {
    selectedLayer.setLayer()
    expect(mockTileLayer.remove).not.toHaveBeenCalled()
    expect(L.TileLayer).not.toHaveBeenCalled()
    expect(mockTileLayer.addTo).not.toHaveBeenCalled()
  })

  it('Calls setLayer and init selectedLayer', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    expect(mockTileLayer.remove).not.toHaveBeenCalled()
    expect(L.TileLayer).toHaveBeenCalledWith(mockGeoResource.config.layer.link, {layer_id: 'layer_id'})
  })

  it('Calls setLayer remove and init selectedLayer', async () => {
    selectedLayer._layer = mockTileLayer
    await selectedLayer.setLayer(mockGeoResource)
    expect(mockTileLayer.remove).toHaveBeenCalled()
    expect(L.TileLayer).toHaveBeenCalledWith(mockGeoResource.config.layer.link, {layer_id: 'layer_id'})
  })

  it('Calls getFeatureInfo and do nothing', async () => {
    selectedLayer.getFeatureInfo('evt', mockMap)
    expect(mockMap.getZoom).not.toHaveBeenCalled()
  })

  it('Calls getFeatureInfo with params.version !== 1.3.0', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    const featureInfo = await selectedLayer.getFeatureInfo({latlng: 'latlng'}, mockMap)
    expect(featureInfo).toBe('features')
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
    mockTileLayer.options.version = '1.3.0'
    await selectedLayer.setLayer(mockGeoResource)
    await selectedLayer.getFeatureInfo({latlng: 'latlng'}, mockMap)
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

  it('Calls setTime valid', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    await selectedLayer.setTime(1)
    expect(selectedLayer._time).toBe(1)
  })

  it('Calls setTime unvalid', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    await selectedLayer.setTime(1000)
    expect(selectedLayer._time).toBe(0)
  })

  it('Set units', async () => {
    Unit.getFamilyUnit.mockReturnValue('getFamilyUnit')
    Settings.getActiveKeyById.mockReturnValue('getUnitByFamily')
    await selectedLayer.setLayer(mockGeoResource)
    expect(selectedLayer.getUnit()).toBe('getUnitByFamily')
    await selectedLayer.setUnit('newUnit')
    expect(selectedLayer.getUnit()).toBe('newUnit')
  })
})
