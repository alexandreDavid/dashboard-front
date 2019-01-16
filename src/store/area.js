import axios from 'axios'

const urlRoot = `${process.env.API_URL}/areas`

let areaCache = new Map()
let subAreaCache = new Map()

async function requestGeoserver (area, params, cache) {
  if (!area || !area.idArea) {
    return false
  }
  let areaData
  if (cache.has(area.idArea)) {
    areaData = cache.get(area.idArea)
  } else {
    const req = await axios.get(
      `${process.env.GEOSERVER_URL}/boundaries/ows`, {
        params: Area.getAreaRequestParams(params)
      }
    )
    areaData = req.data
    cache.set(area.idArea, areaData)
  }
  return areaData
}

let Area = {
  async searchAreas (areaName) {
    try {
      const response = await axios.get(
        `${urlRoot}/search`, {
          params: {
            name: areaName
          }
        }
      )
      return response.data
    } catch (e) {
      return []
    }
  },
  async getArea (area) {
    return requestGeoserver(area, Area.getAreaRequestParams({featureid: area.idArea}), areaCache)
  },
  async getSubAreas (area) {
    return requestGeoserver(area, Area.getAreaRequestParams({cql_filter: `idparent = ${area.idArea}`}), subAreaCache)
  }
}

Area.getAreaRequestParams = (area) => {
  return {
    ...{
      service: 'WFS',
      version: '1.1.0',
      request: 'GetFeature',
      typeName: `boundaries:boundaries_uganda`,
      outputFormat: 'application/json'
    },
    ...area
  }
}

export default Area
