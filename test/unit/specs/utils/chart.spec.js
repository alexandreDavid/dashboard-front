import Chart from '@/utils/chart'

describe('chart.js', () => {
  it('Calls convertDate', () => {
    expect(Chart.convertDate(1531323000000)).toEqual('11 Jul 16:30')
  })
})
