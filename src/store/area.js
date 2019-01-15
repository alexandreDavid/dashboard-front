import axios from 'axios'
import UserConfiguration from '@/store/userConfiguration'

const urlRoot = `${process.env.API_URL}/areas`
let selectedArea

let ugandaArea = false
let ugandaSubAreas = false

async function requestGeoserver (area, params, cacheVariable) {
  let areaData
  if (area.id !== 7552 || !cacheVariable) {
    areaData = await axios.get(
      `${process.env.GEOSERVER_URL}/boundaries/ows`, {
        params: Area.getAreaRequestParams(params)
      }
    )
    if (area.id === 7552) {
      cacheVariable = areaData
    }
  } else {
    areaData = ugandaArea
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
  setSelectedArea (area) {
    UserConfiguration.setActiveArea(area)
    selectedArea = area
  },
  getSelectedArea () {
    return selectedArea
  },
  async getArea (area) {
    return requestGeoserver(area, Area.getAreaRequestParams({featureid: area.id}), ugandaArea)
  },
  async getSubAreas (area) {
    return requestGeoserver(area, Area.getAreaRequestParams({cql_filter: `idparent = ${area.id}`}), ugandaSubAreas)
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
