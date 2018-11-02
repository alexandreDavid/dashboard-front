const variables = [
  {
    name: 'CDD',
    label: 'Consecutive dry days',
    description: 'Maximum number of consecutive dry days per year, based on the WFDEI dataset',
    datasets: [{
      id: 'WFDEI',
      layerName: 'Rainf_CDD',
      workspaceName: 'historical',
      legendName: 'wfdei_CDD',
      startDate: 1984,
      endDate: 2013
    }]
  }, {
    name: 'TX25',
    label: 'Days > 25°C',
    description: 'Number of days in a year exceeding 25°C, based on the WFDEI dataset',
    datasets: [{
      id: 'WFDEI',
      layerName: 'Tair_TX25',
      workspaceName: 'historical',
      legendName: 'wfdei_tx25',
      startDate: 1984,
      endDate: 2012
    }]
  }, {
    name: 'TX30',
    label: 'Days > 30°C',
    description: 'Number of days in a year exceeding 30°C, based on the WFDEI dataset',
    datasets: [{
      id: 'WFDEI',
      layerName: 'Tair_TX30',
      workspaceName: 'historical',
      legendName: 'wfdei_tx30',
      startDate: 1984,
      endDate: 2012
    }]
  }, {
    name: 'Precipitation',
    label: 'Precipitation',
    description: '{mm/month, mm/season or mm/year}* based on the {dataset}* dataset.',
    datasets: [
      {
        id: 'GPCC',
        layerName: 'gpcc_precip',
        workspaceName: 'historical',
        legendName: 'chirps_precip_months',
        startDate: 1984,
        endDate: 2013,
        disabled: true
      }, {
        id: 'CHIRPS',
        layerName: 'chirps_precip',
        workspaceName: 'historical',
        legendName: 'chirps_precip_months',
        startDate: 1984,
        endDate: 2013
      }, {
        id: 'ERAI',
        layerName: 'erai_precip',
        workspaceName: 'historical',
        legendName: 'chirps_precip_months',
        startDate: 1984,
        endDate: 2013,
        disabled: true
      }
    ]
  }, {
    name: 'R95',
    label: 'Rainfall on days > 95th percentile',
    description: 'Total amount of rainfall in a year, occurring on days which exceed the 95th percentile of average rainfall, based on the WFDEI dataset',
    datasets: [{
      id: 'WFDEI',
      layerName: 'Rainf_R95p',
      workspaceName: 'historical',
      legendName: 'wfdei_R95p',
      startDate: 1984,
      endDate: 2013
    }]
  }, {
    name: 'Temperature',
    label: 'Temperature (2m)',
    description: '{monthly, seasonal or annual}* average temperature, based on the {dataset}* dataset',
    datasets: [
      {
        id: 'GHCN',
        layerName: 'ghcn_tmean(2mt)',
        workspaceName: 'historical',
        legendName: 'ERAI_tmean',
        startDate: 1987,
        endDate: 2016,
        disabled: true
      }, {
        id: 'CRU',
        layerName: 'cru_tmean(2mt)',
        workspaceName: 'historical',
        legendName: 'ERAI_tmean',
        startDate: 1987,
        endDate: 2016,
        disabled: true
      }, {
        id: 'ERAI',
        layerName: 'erai_tmean(2mt)',
        workspaceName: 'historical',
        legendName: 'ERAI_tmean',
        startDate: 1987,
        endDate: 2016
      }
    ]
  }
]

const datasets = {
  CHIRPS: {
    id: 'CHIRPS',
    label: 'CHIRPS',
    frequency: 'Monthly',
    description: 'The Climate Hazards Group InfraRed Precipitation with Stations (CHIRPS) data set uses several different satellite data sets to give an estimate of precipitation, with gaps filled by an atmospheric model. These are compared with the climatological average rainfall at each point and with in situ precipitation observations. Daily, dekad (10-day) and monthly data are available, though this project uses monthly average data. The spatial scale is 0.05o [~5km in Uganda].',
    links: ['https://pubs.usgs.gov/ds/832/']
  },
  CRU: {
    id: 'CRU',
    label: 'CRU',
    frequency: 'Monthly',
    description: 'Climate Research Unit data from the University of East Anglia uses station observations to give gridded monthly data over the globe’s landmasses (except Antarctica). Observations give mean temperature, diurnal temperature range, precipitation, wet-day frequency, vapour pressure, cloud cover and wind speed. From these variables, maximum and minimum temperatures, relative humidity, sunshine duration, frost day frequency, and potential evapotranspiration are derived. The data are at 0.5o resolution [~50km].',
    links: ['https://crudata.uea.ac.uk/cru/data/hrg/']
  },
  ERAI: {
    id: 'ERAI',
    label: 'ERA-Interim',
    frequency: 'Monthly',
    description: 'ERA-Interim is a reanalysis data set generated using the European Centre for Medium-Range Weather Forecasting (ECMWF) model. Reanalysis datasets are created using historical observational data to drive a model to generate global, gridded data in a consistent manner. The observations include data from satellites, observation stations, aircraft, buoys, and sondes. The resolution is around 80km.',
    links: ['https://www.ecmwf.int/en/forecasts/datasets/reanalysis-datasets/era-interimf']
  },
  GHCN: {
    id: 'GHCN',
    label: 'GHCN',
    frequency: 'Monthly',
    description: 'Global Historical Climatology Network data is in two distinct categories. The daily set collects global station observations in a standard format. The monthly data used in this project takes the station observations along with those from the NWS-CPC’s CAMS network, and interpolates the temperature measurements onto a 0.5o by 0.5o grid [~50km].',
    links: ['https://www.ncdc.noaa.gov/ghcnm/v3.php', 'https://www.esrl.noaa.gov/psd/data/gridded/data.ghcncams.html']
  },
  GPCC: {
    id: 'GPCC',
    label: 'GPCC',
    frequency: 'Monthly',
    description: 'The Global Precipitation Climatology Centre take rainfall gauge data from around the globe, perform quality checks, and gives a monthly gridded data set. The data cover from 1901 to present, but with the number of stations included varying from year to year. The data used here are from Version 7 on a 0.5o by 0.5o grid [~50km], which is the most recent and highest resolution available at time of writing.',
    links: ['https://www.dwd.de/EN/ourservices/gpcc/gpcc.html', 'https://rda.ucar.edu/datasets/ds496.0/ ']
  },
  WFDEI: {
    id: 'WFDEI',
    label: 'WFDEI',
    frequency: 'Daily',
    description: 'The WATCH project concentrates on global hydrological changes, but its first step was to generate forcing data from a number of reanalysis products. Here, Watch Forcing Data – ERA-Interim (WFDEI) is used for daily precipitation and temperature data, which the indices are calculated. The original ERA-Interim data is interpolated onto a 0.5o by 0.5o grid [~50km], and then CRU and GPCC are used for bias correction.',
    links: ['http://www.eu-watch.org/data_availability']
  }
}

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
  getAllDatasets () {
    return datasets
  },
  getAllTimePeriods () {
    return timePeriods
  }
}
