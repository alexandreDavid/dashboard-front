const units = [
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
    conversion: {
      hPa (val) {
        return (val / 100)
      }
    }
  },
  {
    key: 'Kg/m2/s',
    label: 'Kg/m2/s',
    family: 'rain',
    conversion: {
      mm (val) {
        return (val * 86400)
      },
      in (val) {
        return (val * 86400 * 0.0393701)
      }
    }
  }
]

function getUnit (key) {
  return units.find(u => u.key === key)
}

export default {
  getLabel (key) {
    const unit = getUnit(key)
    return (unit && unit.label) || key
  },
  getUnitsFamily (family) {
    return units.filter(u => u.family === family).map(({key, label}) => ({key, label}))
  },
  getFamilyUnit (key) {
    const unit = getUnit(key)
    return unit && unit.family
  },
  convert (unitInput, unitOutput, val) {
    const unitConfig = getUnit(unitInput)
    if (unitConfig && unitConfig.conversion && unitConfig.conversion[unitOutput]) {
      val = unitConfig.conversion[unitOutput](val)
    }
    return val
  }
}
