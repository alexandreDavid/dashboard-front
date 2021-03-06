import SelectedLayer from '@/store/selectedLayer'
import axios from 'axios'
import L from 'leaflet'
import store from '@/store'

let mockTileLayer = {
  addTo: jest.fn().mockReturnThis(),
  remove: jest.fn(),
  setParams: jest.fn(),
  setOpacity: jest.fn(),
  redraw: jest.fn(),
  setZIndex: jest.fn(),
  wmsParams: {
    time: 'time'
  },
  options: {},
  _url: '_url'
}

const mockGeoResource = {
  zIndex: 1,
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
    },
    statistics: {
      link: 'statisticsLink'
    }
  }
}

L.TileLayer = jest.fn().mockImplementation(() => mockTileLayer)

jest.mock('axios', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve({ data: {layer_id: 'layer_id'} })),
  get: jest.fn().mockReturnValue(Promise.resolve({ data: {features: 'features'} })),
  CancelToken: {
    source: jest.fn().mockReturnValue({token: 'token'})
  },
  isCancel: jest.fn().mockReturnValue(false)
}))

const mockMap = {
  getBounds: jest.fn().mockReturnThis(),
  getSize: jest.fn().mockReturnValue({x: 'getSizeX', y: 'getSizeY'}),
  getZoom: jest.fn(),
  latLngToContainerPoint: jest.fn().mockReturnValue({x: 'x', y: 'y'}),
  toBBoxString: jest.fn().mockReturnValue('toBBoxString')
}

jest.mock('@/store', () => ({
  getters: {
    'settings/getIdByKey': jest.fn(),
    'settings/getActiveKeyById': jest.fn()
  }
}))

describe('selectedLayer.js', () => {
  let selectedLayer
  beforeEach(function () {
    selectedLayer = new SelectedLayer()
    mockTileLayer.remove.mockClear()
    mockMap.getBounds.mockClear()
    mockMap.getSize.mockClear()
    mockMap.getZoom.mockClear()
    mockMap.latLngToContainerPoint.mockClear()
    mockMap.toBBoxString.mockClear()
    store.getters['settings/getIdByKey'].mockClear()
    store.getters['settings/getActiveKeyById'].mockClear()
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
    expect(selectedLayer._time).toBe(3)
  })

  it('Set units', async () => {
    store.getters['settings/getIdByKey'].mockReturnValue('getIdByKey')
    store.getters['settings/getActiveKeyById'].mockReturnValue('getActiveKeyById')
    await selectedLayer.setLayer(mockGeoResource)
    expect(selectedLayer.getUnit()).toBe('getActiveKeyById')
    await selectedLayer.setUnit('newUnit')
    expect(selectedLayer.getUnit()).toBe('newUnit')
  })

  it('getStatistics valid', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    axios.post.mockClear()
    axios.post.mockReturnValue(Promise.resolve({ data: 'ok' }))
    const res = await selectedLayer.getStatistics('dateStart', 'dateEnd')
    expect(axios.post).toHaveBeenCalledWith('statisticsLink', {start_date: 'dateStart', end_date: 'dateEnd', area: undefined, unit: 'getActiveKeyById'}, {cancelToken: 'token'})
    expect(res).toBe('ok')
  })

  it('getStatistics valid without dates', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    selectedLayer._unit = false
    axios.post.mockClear()
    axios.post.mockReturnValue(Promise.resolve({ data: 'ok' }))
    const res = await selectedLayer.getStatistics()
    expect(axios.post).toHaveBeenCalledWith('statisticsLink', {area: undefined}, {cancelToken: 'token'})
    expect(res).toBe('ok')
  })

  it('getStatistics too complex', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    axios.post.mockClear()
    axios.get.mockClear()
    axios.post.mockRejectedValueOnce(new Error())
    axios.get.mockResolvedValueOnce({ data: 'ok 2' })
    const res = await selectedLayer.getStatistics('dateStart', 'dateEnd')
    expect(axios.post).toHaveBeenCalledWith('statisticsLink', {start_date: 'dateStart', end_date: 'dateEnd', area: undefined, unit: 'getActiveKeyById'}, {cancelToken: 'token'})
    expect(axios.get).toHaveBeenCalledWith('statisticsLink', {params: {start_date: 'dateStart', end_date: 'dateEnd', unit: 'getActiveKeyById'}, cancelToken: 'token'})
    expect(res).toBe('ok 2')
  })

  it('getStatistics error cancelled', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    axios.post.mockClear()
    axios.isCancel.mockClear()
    axios.get.mockClear()
    axios.post.mockRejectedValueOnce(new Error())
    axios.isCancel.mockReturnValueOnce(true)
    const res = await selectedLayer.getStatistics('dateStart', 'dateEnd')
    expect(axios.post).toHaveBeenCalledWith('statisticsLink', {start_date: 'dateStart', end_date: 'dateEnd', area: undefined, unit: 'getActiveKeyById'}, {cancelToken: 'token'})
    expect(axios.get).not.toHaveBeenCalled()
    expect(res).toBe('cancel')
  })

  it('getStatistics too complex cancelled', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    axios.post.mockClear()
    axios.isCancel.mockClear()
    axios.get.mockClear()
    axios.post.mockRejectedValueOnce(new Error())
    axios.isCancel.mockReturnValueOnce(false)
    axios.isCancel.mockReturnValueOnce(true)
    axios.get.mockRejectedValueOnce(new Error())
    const mockSource = { cancel: jest.fn() }
    selectedLayer.sources.push(mockSource)
    const res = await selectedLayer.getStatistics('dateStart', 'dateEnd', true)
    expect(mockSource.cancel).toBeCalled()
    expect(axios.post).toHaveBeenCalledWith('statisticsLink', {start_date: 'dateStart', end_date: 'dateEnd', area: undefined, unit: 'getActiveKeyById'}, {cancelToken: 'token'})
    expect(axios.get).toHaveBeenCalledWith('statisticsLink', {params: {start_date: 'dateStart', end_date: 'dateEnd', unit: 'getActiveKeyById'}, cancelToken: 'token'})
    expect(res).toBe('cancel')
  })

  it('setZIndex', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    selectedLayer.geoResource = {}
    const zIndex = 'zIndex'
    selectedLayer.setZIndex(zIndex)
    expect(mockTileLayer.setZIndex).toHaveBeenCalledWith(zIndex)
    expect(selectedLayer.geoResource.zIndex).toBe(zIndex)
  })

  it('remove', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    selectedLayer.remove()
    expect(mockTileLayer.remove).toHaveBeenCalledTimes(1)
  })

  it('selected', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    expect(selectedLayer.isSelected()).toBe(false)
    selectedLayer.setSelected(true)
    expect(selectedLayer.isSelected()).toBe(true)
  })

  it('getUnitFamily', async () => {
    store.getters['settings/getIdByKey'].mockReturnValue('getIdByKey')
    await selectedLayer.setLayer(mockGeoResource)
    expect(selectedLayer.getUnitFamily()).toBe('getIdByKey')
  })

  it('getLayerId fail', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    axios.post.mockClear()
    axios.post.mockResolvedValue({ data: {layer_id: 'layer_id ok'} })
    axios.post.mockRejectedValueOnce(new Error('ok'))
    const layerId = await selectedLayer.getLayerId({area: 'area', param1: 'param1'})
    expect(axios.post).toHaveBeenCalledTimes(2)
    expect(layerId).toBe('layer_id ok')
  })

  it('hasGraph', async () => {
    selectedLayer.geoResource = mockGeoResource
    expect(selectedLayer.hasGraph()).toBe(true)

    selectedLayer.geoResource.config.statistics = false
    expect(selectedLayer.hasGraph()).toBe(false)
  })

  it('addTo', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    selectedLayer.addTo(mockMap)
    expect(mockTileLayer.addTo).toHaveBeenCalledWith(mockMap)
  })

  it('setArea', async () => {
    await selectedLayer.setLayer(mockGeoResource)
    await selectedLayer.setArea('area')
    expect(mockTileLayer.redraw).toHaveBeenCalled()
    expect(selectedLayer._area).toBe('area')
  })

  it('getTresholdValue', async () => {
    axios.get.mockClear()
    axios.get.mockResolvedValue({
      data: {
        values: [
          'firstValue', 'secondValue', 'thirdValue'
        ]
      }
    })
    await selectedLayer.setLayer(mockGeoResource)
    await selectedLayer.setLegend()
    const treshold = selectedLayer.getTresholdValue()
    expect(treshold.length).toBe(2)
    expect(treshold[0]).toBe('firstValue')
    expect(treshold[1]).toBe('thirdValue')
  })

  it('getTresholdValue with treshold from georesouce', async () => {
    axios.get.mockClear()
    const firstValue = {value: 1}
    const secondValue = {value: 2}
    axios.get.mockResolvedValue({
      data: {
        values: [
          firstValue, secondValue, 'thirdValue'
        ]
      }
    })
    await selectedLayer.setLayer(mockGeoResource)
    await selectedLayer.setLegend()
    selectedLayer.setTresholdValue([
      {value: 1},
      {value: 2}
    ])
    const treshold = selectedLayer.getTresholdValue()
    expect(treshold.length).toBe(2)
    expect(treshold[0]).toBe(firstValue)
    expect(treshold[1]).toBe(secondValue)
  })
})
