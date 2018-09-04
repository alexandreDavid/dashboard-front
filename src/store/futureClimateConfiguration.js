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

const months = [
  {
    id: 1,
    value: '01',
    label: 'January',
    shortLabel: 'Jan',
    type: 'months'
  }, {
    id: 2,
    value: '02',
    label: 'February',
    shortLabel: 'Feb',
    type: 'months'
  }, {
    id: 3,
    value: '03',
    label: 'March',
    shortLabel: 'Mar',
    type: 'months'
  }, {
    id: 4,
    value: '04',
    label: 'April',
    shortLabel: 'Apr',
    type: 'months'
  }, {
    id: 5,
    value: '05',
    label: 'May',
    shortLabel: 'May',
    type: 'months'
  }, {
    id: 6,
    value: '06',
    label: 'June',
    shortLabel: 'Jun',
    type: 'months'
  }, {
    id: 7,
    value: '07',
    label: 'July',
    shortLabel: 'Jul',
    type: 'months'
  }, {
    id: 8,
    value: '08',
    label: 'August',
    shortLabel: 'Aug',
    type: 'months'
  }, {
    id: 9,
    value: '09',
    label: 'September',
    shortLabel: 'Sep',
    type: 'months'
  }, {
    id: 10,
    value: '10',
    label: 'October',
    shortLabel: 'Oct',
    type: 'months'
  }, {
    id: 11,
    value: '11',
    label: 'November',
    shortLabel: 'Nov',
    type: 'months'
  }, {
    id: 12,
    value: '12',
    label: 'December',
    shortLabel: 'Dec',
    type: 'months'
  }
]

export default {
  getAllModelsByType (type) {
    return allModels.filter(m => m.type === type)
  },
  getAllMonths () {
    return months
  }
}
