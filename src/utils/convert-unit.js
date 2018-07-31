const conversionTable = [
  {
    input: 'K',
    output: 'C',
    convert (val) {
      return (val - 273.15)
    }
  }, {
    input: 'K',
    output: 'F',
    convert (val) {
      return ((val - 273.15) * 9 / 5) + 32
    }
  }
]

export default function convert (unitInput, unitOutput, val) {
  return conversionTable.find(c => (c.input === unitInput && c.output === unitOutput)).convert(val).toFixed(2)
}
