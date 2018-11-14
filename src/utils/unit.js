const units = [
  {
    key: 'NO_UNIT_SPECIFIED',
    label: '',
    family: '',
    precision: 7
  },
  {
    key: 'k',
    label: 'K',
    family: 'temperature'
  },
  {
    key: 'C',
    label: '°C',
    family: 'temperature'
  },
  {
    key: 'F',
    label: '°F',
    family: 'temperature'
  },
  {
    key: 'K',
    label: 'K',
    family: 'temperature',
    precision: 0,
    conversion: {
      C (val) {
        return (val - 273.15)
      },
      F (val) {
        return (((val - 273.15) * 9 / 5) + 32)
      }
    }
  },
  {
    key: 'Pa',
    label: 'Pa',
    family: 'pressure',
    precision: 0,
    conversion: {
      hPa (val) {
        return (val / 100)
      }
    }
  },
  {
    key: 'hPa',
    label: 'hPa',
    family: 'pressure'
  },
  {
    key: 'Kg/m2/s',
    label: ' Kg/m2/s',
    family: 'precipitations',
    precision: 7,
    conversion: {
      'mm/day' (val) {
        return (val * 86400)
      },
      'in/day' (val) {
        return (val * 86400 * 0.0393701)
      }
    }
  },
  {
    key: 'mm/day',
    label: 'mm/day',
    family: 'precipitations'
  },
  {
    key: 'in/day',
    label: 'in/day',
    family: 'precipitations'
  },
  {
    key: 'mm',
    label: 'mm',
    family: 'hydrology',
    precision: 7
  },
  {
    key: 'Kg/m2',
    label: 'Kg/m2',
    family: 'moisture',
    precision: 7
  }
]

function getUnit (key) {
  return units.find(u => u.key === key)
}

export default {
  getLabel (key) {
    const unit = getUnit(key)
    return unit ? unit.label : key
  },
  getUnitsFamily (family) {
    return units.filter(u => u.family === family).map(({key, label}) => ({key, label}))
  },
  getFamilyUnit (key) {
    const unit = getUnit(key)
    return unit && unit.family
  },
  convert (unitInput, unitOutput, val, displayWithExp) {
    const unitConfig = getUnit(unitInput)
    if (unitConfig) {
      if (unitConfig.conversion && unitConfig.conversion[unitOutput]) {
        val = unitConfig.conversion[unitOutput](val)
      }
      val = Math.round(val * Math.pow(10, unitConfig.precision)) / Math.pow(10, unitConfig.precision)
    }
    if (displayWithExp && val && (val < 0.1 || val > 10000)) {
      val = Number.parseFloat(val).toExponential()
    }
    return val
  }
}
