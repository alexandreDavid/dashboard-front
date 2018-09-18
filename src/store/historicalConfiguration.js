const variables = [
  {
    name: 'CDD',
    label: 'Consecutive dry days',
    description: 'Maximum number of consecutive dry days',
    type: 'Daily',
    layerName: 'Rainf_CDD',
    workspaceName: 'historical',
    legendName: 'wfdei_CDD',
    startDate: 1984,
    endDate: 2013
  }, {
    name: 'Chirps',
    label: 'Precipitations',
    description: 'Climate Hazards group InfraRed Precipitation with Stations',
    type: 'Monthly',
    layerName: 'chirps_precip',
    workspaceName: 'historical',
    legendName: 'chirps-20180101_1',
    startDate: 1984,
    endDate: 2013
  }, {
    name: 'ERAI',
    label: '2 metres temperature',
    description: '2 metres temperature',
    type: 'Monthly',
    layerName: 'erai_tmean(2mt)',
    workspaceName: 'historical',
    legendName: 'ERAI_tmean',
    startDate: 1987,
    endDate: 2016
  }, {
    name: 'R95',
    label: 'Rainfall on days > 95th percentile',
    description: 'Total amount of rainfall in a year, occurring on days which exceed the 95th percentile of average rainfall',
    type: 'Daily',
    layerName: 'Rainf_R95p',
    workspaceName: 'historical',
    legendName: 'wfdei_R95p',
    startDate: 1984,
    endDate: 2013
  }, {
    name: 'TX25',
    label: 'Days > 25°C',
    description: 'Number of days in a year exceeding 25°C, based on the WFDEI dataset',
    type: 'Daily',
    layerName: 'Tair_TX25',
    workspaceName: 'historical',
    legendName: 'wfdei_tx25',
    startDate: 1984,
    endDate: 2012
  }, {
    name: 'TX30',
    label: 'Days > 30°C',
    description: 'Number of days in a year exceeding 30°C, based on the WFDEI dataset',
    type: 'Daily',
    layerName: 'Tair_TX30',
    workspaceName: 'historical',
    legendName: 'wfdei_tx30',
    startDate: 1984,
    endDate: 2012
  }
]

const timePeriods = [
  {
    value: '01',
    label: 'January',
    shortLabel: 'Jan',
    type: 'month'
  }, {
    value: '02',
    label: 'February',
    shortLabel: 'Feb',
    type: 'month'
  }, {
    value: '03',
    label: 'March',
    shortLabel: 'Mar',
    type: 'month'
  }, {
    value: '04',
    label: 'April',
    shortLabel: 'Apr',
    type: 'month'
  }, {
    value: '05',
    label: 'May',
    shortLabel: 'May',
    type: 'month'
  }, {
    value: '06',
    label: 'June',
    shortLabel: 'Jun',
    type: 'month'
  }, {
    value: '07',
    label: 'July',
    shortLabel: 'Jul',
    type: 'month'
  }, {
    value: '08',
    label: 'August',
    shortLabel: 'Aug',
    type: 'month'
  }, {
    value: '09',
    label: 'September',
    shortLabel: 'Sep',
    type: 'month'
  }, {
    value: '10',
    label: 'October',
    shortLabel: 'Oct',
    type: 'month'
  }, {
    value: '11',
    label: 'November',
    shortLabel: 'Nov',
    type: 'month'
  }, {
    value: '12',
    label: 'December',
    shortLabel: 'Dec',
    type: 'month'
  }, {
    value: '13',
    label: 'DJF',
    shortLabel: 'DJF',
    type: 'season'
  }, {
    value: '14',
    label: 'MAM',
    shortLabel: 'MAM',
    type: 'season'
  }, {
    value: '15',
    label: 'JJA',
    shortLabel: 'JJA',
    type: 'season'
  }, {
    value: '16',
    label: 'SON',
    shortLabel: 'SON',
    type: 'season'
  }, {
    value: '17',
    label: 'Annual',
    shortLabel: 'Annual',
    type: 'annual'
  }
]

export default {
  getAllVariables () {
    return variables
  },
  getAllTimePeriods () {
    return timePeriods
  }
}
