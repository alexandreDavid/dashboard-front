const allModels = [
  {
    type: 'CMIP5',
    label: 'CCSM4',
    name: 'CCSM4',
    styleName: 'CCSM4',
    default: true
  }, {
    type: 'CMIP5',
    label: 'ACCESS1-0',
    name: 'CCSM4',
    styleName: 'CCSM4_tx30anom'
  }, {
    type: 'CMIP5',
    label: 'ACCESS1-3',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'BNU-ESM',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'CESM1-CAM5',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'CMCC-CESM',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'CMCC-CMS',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'CanESM2',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'GFDL-CM3',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'GFDL-ESM2G',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'GFDL-ESM2M',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'HadGEM2-CC',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'HadGEM2-ES',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'IPSL-CM5A-LR',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'IPSL-CM5A-MR',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'IPSL-CM5B-LR',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'MPI-ESM-LR',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'NorESM1-M',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'bcc-csm1-1-m',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'bcc-csm1-1',
    name: 'CCSM4'
  }, {
    type: 'CMIP5',
    label: 'inmcm4',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'CLMcom_CNRM-CERFACS-CNRM-CM5',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'CLMcom_ICHEC-EC-EARTH',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'CLMcom_MOHC-HadGEM2-ES',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'CLMcom_MPI-M-MPI-ESM-LR',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'DMI_NCC-NorESM1-M',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'GERICS_IPSL-IPSL-CM5A-LR',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'GERICS_MIROC-MIROC5',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'GERICS_MOHC-HadGEM2-ES',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'KNMI_ICHEC-EC-EARTH',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'KNMI_MOHC-HadGEM2-ES',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'MPI-CSC_ICHEC-EC-EARTH',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'MPI-CSC_MPI-M-MPI-ESM-LR',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'SMHI_CCCma-CanESM2',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'SMHI_CNRM-CERFACS-CNRM-CM5',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'SMHI_CSIRO-QCCCE-CSIRO-Mk3-6-0',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'SMHI_ICHEC-EC-EARTH',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'SMHI_IPSL-IPSL-CM5A-MR',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'SMHI_MIROC-MIROC5',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'SMHI_MOHC-HadGEM2-ES',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'SMHI_MPI-M-MPI-ESM-LR',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'SMHI_NCC-NorESM1-M',
    name: 'CCSM4'
  }, {
    type: 'CORDEX',
    label: 'SMHI_NOAA-GFDL-GFDL-ESM2M',
    name: 'CCSM4'
  }
]

const timePeriods = [
  {
    id: 1,
    value: '01',
    label: 'January',
    shortLabel: 'Jan',
    type: 'month'
  }, {
    id: 2,
    value: '02',
    label: 'February',
    shortLabel: 'Feb',
    type: 'month'
  }, {
    id: 3,
    value: '03',
    label: 'March',
    shortLabel: 'Mar',
    type: 'month'
  }, {
    id: 4,
    value: '04',
    label: 'April',
    shortLabel: 'Apr',
    type: 'month'
  }, {
    id: 5,
    value: '05',
    label: 'May',
    shortLabel: 'May',
    type: 'month'
  }, {
    id: 6,
    value: '06',
    label: 'June',
    shortLabel: 'Jun',
    type: 'month'
  }, {
    id: 7,
    value: '07',
    label: 'July',
    shortLabel: 'Jul',
    type: 'month'
  }, {
    id: 8,
    value: '08',
    label: 'August',
    shortLabel: 'Aug',
    type: 'month'
  }, {
    id: 9,
    value: '09',
    label: 'September',
    shortLabel: 'Sep',
    type: 'month'
  }, {
    id: 10,
    value: '10',
    label: 'October',
    shortLabel: 'Oct',
    type: 'month'
  }, {
    id: 11,
    value: '11',
    label: 'November',
    shortLabel: 'Nov',
    type: 'month'
  }, {
    id: 12,
    value: '12',
    label: 'December',
    shortLabel: 'Dec',
    type: 'month'
  }, {
    id: 13,
    value: '01',
    label: 'JF',
    type: 'season'
  }, {
    id: 14,
    value: '02',
    label: 'MAM',
    type: 'season'
  }, {
    id: 15,
    value: '03',
    label: 'JJAS',
    type: 'season'
  }, {
    id: 16,
    value: '04',
    label: 'OND',
    type: 'season'
  }, {
    id: 17,
    label: 'Annual',
    type: 'annual'
  }
]

const datasets = [
  {
    value: 'CMIP5',
    label: 'CMIP5',
    description: 'CMIP5 (Coupled Model Intercomparison Project Phase 5) refers to the set of different global climate models, that are used in the IPCC 5th Assessment Report. Twenty modelling centres each develop a model, which results in slight differences between models, to represent aspects of the future climate that are uncertain. Some modelling centres also run their model more than once, in a different mode or at different resolution.<br>These models are run for the entire globe for a standard set of experiments, with different socio-economic scenarios for the future projections, known as RCPs.',
    links: ['http://www.ipcc.ch/report/ar5/', 'https://cmip.llnl.gov/cmip5/'],
    credentials: 'van Vuuren, D.P., Edmonds, J., Kainuma, M. et al., 2011: The representative concentration pathways: an overview. Climatic Change,109: 5.',
    credentialsLink: 'https://doi.org/10.1007/s10584-011-0148-z'
  },
  {
    value: 'CORDEX',
    label: 'CORDEX',
    description: 'A set of climate regional models were run for CORDEX Africa. Like CMIP5, these were from several different climate modelling centres, and used the same standard set of experiments. The difference from CMIP5 is that the climate models are regional; that is they only cover Africa. The spatial resolution is higher than for CMIP5, and is consistent across all models used here (0.44o). In some cases, different modelling centres ran the same climate model, but with different configurations. The future socio-economic scenarios are described using RCPs.',
    links: ['http://cordex.org/', 'http://www.csag.uct.ac.za/cordex-africa/'],
    credentials: 'van Vuuren, D.P., Edmonds, J., Kainuma, M. et al., 2011: The representative concentration pathways: an overview. Climatic Change,109: 5.',
    credentialsLink: 'https://doi.org/10.1007/s10584-011-0148-z'
  }
]

export default {
  getAllModelsByType (type) {
    return allModels.filter(m => m.type === type)
  },
  getAllTimePeriods () {
    return timePeriods
  },
  getAllDatasets () {
    return datasets
  }
}
