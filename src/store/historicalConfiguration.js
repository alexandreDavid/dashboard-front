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
  }, {
    name: 'GHCN_tmean',
    label: 'Monthly mean of surface temperature (GHCN)',
    description: 'Monthly mean of surface temperature (GHCN)',
    type: 'Monthly',
    layerName: 'ghcn_tmean(2mt)',
    workspaceName: 'historical',
    legendName: 'ERAI_tmean',
    startDate: 1987,
    endDate: 2016,
    disabled: true
  }, {
    name: 'GPCC_pr',
    label: 'Monthly total of precipitation (GPCC)',
    description: 'Monthly total of precipitation (GPCC)',
    type: 'Monthly',
    layerName: 'gpcc_precip',
    workspaceName: 'historical',
    legendName: 'chirps_precip_months',
    startDate: 1984,
    endDate: 2013,
    disabled: true
  }, {
    name: 'CRU_tmean',
    label: 'Near-surface temperature (CRU)',
    description: 'Near-surface temperature (CRU)',
    type: 'Monthly',
    layerName: 'cru_tmean(2mt)',
    workspaceName: 'historical',
    legendName: 'ERAI_tmean',
    startDate: 1987,
    endDate: 2016,
    disabled: true
  }, {
    name: 'CHIRPS_pr',
    label: 'Precipitations (CHIRPS)',
    description: 'Climate Hazards group InfraRed Precipitation with Stations',
    type: 'Monthly',
    layerName: 'chirps_precip',
    workspaceName: 'historical',
    legendName: 'chirps_precip_months',
    startDate: 1984,
    endDate: 2013
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
    name: 'ERAI_pr',
    label: 'Total precipitation (ERAI)',
    description: 'Total precipitation (ERAI)',
    type: 'Monthly',
    layerName: 'erai_precip',
    workspaceName: 'historical',
    legendName: 'chirps_precip_months',
    startDate: 1984,
    endDate: 2013,
    disabled: true
  }, {
    name: 'ERAI_tmean',
    label: '2 metres temperature (ERAI)',
    description: '2 metres temperature (ERAI)',
    type: 'Monthly',
    layerName: 'erai_tmean(2mt)',
    workspaceName: 'historical',
    legendName: 'ERAI_tmean',
    startDate: 1987,
    endDate: 2016
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
