import axios from 'axios'

const urlRoot = process.env.DATA_URL

// let structureCache

export default {
  async getStructure () {
    return {
      parameterGroupings: [
        {
          groupingId: 0,
          displayName: 'Weather forecast'
        }, {
          groupingId: 1,
          displayName: 'Hydrological forecast'
        }, {
          groupingId: 2,
          displayName: 'Satellite derived data'
        }
      ]
    }
    // if (!structureCache) {
    //   try {
    //     const response = await axios.get(
    //       `${urlRoot}/structure`
    //     )
    //     structureCache = response.data
    //     return structureCache
    //   } catch (e) {
    //     return false
    //   }
    // } else {
    //   return structureCache
    // }
  },
  async getAreaParameterData (area, parameter) {
    try {
      const response = await axios.get(
        `${urlRoot}/${area.type}/${area.name}/${parameter.paramName}`
      )
      return response.data[parameter.paramName]
    } catch (e) {
      return false
    }
  }
}
