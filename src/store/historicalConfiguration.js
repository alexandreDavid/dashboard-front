const variables = [
  {
    name: 'CDD',
    label: 'Consecutive dry days',
    description: 'Maximum number of consecutive dry days',
    type: 'Daily',
    layerName: 'historical:Rainf_CDD',
    legendName: 'wfdei_CDD',
    startDate: 1984,
    endDate: 2013
  }, {
    name: 'Chirps',
    label: 'Precipitations',
    description: 'Climate Hazards group InfraRed Precipitation with Stations',
    type: 'Monthly',
    layerName: 'historical:monthly_chirps_precip',
    legendName: 'chirps-20180101_1',
    startDate: 1984,
    endDate: 2013
  }, {
    name: 'ERAI',
    label: '2 metres temperature',
    description: '2 metres temperature',
    type: 'Monthly',
    layerName: 'historical:monthly_erai_tmean(2mt)',
    legendName: 'ERAI_tmean',
    startDate: 1987,
    endDate: 2016
  }, {
    name: 'R95',
    label: 'Rainfall on days > 95th percentile',
    description: 'Total amount of rainfall in a year, occurring on days which exceed the 95th percentile of average rainfall',
    type: 'Daily',
    layerName: 'historical:Rainf_R95p',
    legendName: 'wfdei_R95p',
    startDate: 1984,
    endDate: 2013
  }, {
    name: 'TX25',
    label: 'Days > 25°C',
    description: 'Number of days in a year exceeding 25°C, based on the WFDEI dataset',
    type: 'Daily',
    layerName: 'historical:Tair_TX25',
    legendName: 'wfdei_tx25',
    startDate: 1984,
    endDate: 2012
  }, {
    name: 'TX30',
    label: 'Days > 30°C',
    description: 'Number of days in a year exceeding 30°C, based on the WFDEI dataset',
    type: 'Daily',
    layerName: 'historical:Tair_TX30',
    legendName: 'wfdei_tx30',
    startDate: 1984,
    endDate: 2012
  }
]

const months = [
  {
    value: '01',
    label: 'January',
    shortLabel: 'Jan'
  }, {
    value: '02',
    label: 'February',
    shortLabel: 'Feb'
  }, {
    value: '03',
    label: 'March',
    shortLabel: 'Mar'
  }, {
    value: '04',
    label: 'April',
    shortLabel: 'Apr'
  }, {
    value: '05',
    label: 'May',
    shortLabel: 'May'
  }, {
    value: '06',
    label: 'June',
    shortLabel: 'Jun'
  }, {
    value: '07',
    label: 'July',
    shortLabel: 'Jul'
  }, {
    value: '08',
    label: 'August',
    shortLabel: 'Aug'
  }, {
    value: '09',
    label: 'September',
    shortLabel: 'Sep'
  }, {
    value: '10',
    label: 'October',
    shortLabel: 'Oct'
  }, {
    value: '11',
    label: 'November',
    shortLabel: 'Nov'
  }, {
    value: '12',
    label: 'December',
    shortLabel: 'Dec'
  }
]

export default {
  getAllVariables () {
    return variables
  },
  getAllMonths () {
    return months
  }
}
