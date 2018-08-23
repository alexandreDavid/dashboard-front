const allModels = [
  {
    type: 'CMIP5',
    label: 'CCSM4',
    name: 'CCSM4',
    styleName: 'CCSM4',
    default: true
  }, {
    type: 'CMIP5',
    label: 'CCSM4 (bis)',
    name: 'CCSM4',
    styleName: 'CCSM4_tx30anom'
  }, {
    type: 'CMIP5',
    label: 'CCSM4 (ter)',
    name: 'CCSM4'
  }
]

export default {
  getAllModelsByType (type) {
    return allModels.filter(m => m.type === type)
  }
}
