import axios from 'axios'

// const urlRoot = process.env.DATA_URL

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
    const response = await axios.get(
      parameter.config.statistics.link
    )
    return response.data
  }
}
