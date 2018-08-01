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
    label: '°K',
    family: 'temperature',
    conversion: {
      C (val) {
        return (val - 273.15)
      },
      F (val) {
        return (((val - 273.15) * 9 / 5) + 32)
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
    return unit && unit.label
  },
  getUnitsFamily (family) {
    return units.filter(u => u.family === family).map(({key, label}) => ({key, label}))
  },
  convert (unitInput, unitOutput, val) {
    const unitConfig = getUnit(unitInput)
    if (unitConfig && unitConfig.conversion && unitConfig.conversion[unitOutput]) {
      val = unitConfig.conversion[unitOutput](val)
    }
    return val
  }
}
