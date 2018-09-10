import Chart from '@/utils/chart'

describe('chart.js', () => {
  it('Calls convertDate', () => {
    const d = new Date(2018, 11, 24, 10, 33, 30)
    expect(Chart.convertDate(d)).toEqual('24 Dec 10:33')
  })
})
