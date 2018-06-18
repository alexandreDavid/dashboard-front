import { Line } from './BaseCharts'

export default {
  extends: Line,
  props: ['chartData', 'options', 'plugins'],
  mounted () {
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true
          }
        }]
      }
    }
    this.renderChart(this.chartData, {...defaultOptions, ...this.options})
  }
}
