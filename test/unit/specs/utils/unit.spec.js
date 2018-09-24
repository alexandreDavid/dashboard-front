import Unit from '@/utils/unit'

describe('unit.js', () => {
  it('Calls getLabel', () => {
    expect(Unit.getLabel('C')).toEqual('°C')
  })

  it('Calls getUnitsFamily', () => {
    expect(Unit.getUnitsFamily('temperature')).toEqual([
      {
        key: 'C',
        label: '°C'
      },
      {
        key: 'F',
        label: '°F'
      },
      {
        key: 'K',
        label: ' K'
      }
    ])
  })

  it('Calls convert with conversion', () => {
    expect(Unit.convert('K', 'C', 42)).not.toBe(42)
    expect(Unit.convert('K', 'F', 42)).not.toBe(42)
  })

  it('Calls convert without conversion', () => {
    expect(Unit.convert('K', 'W', 42)).toBe(42)
  })
})
