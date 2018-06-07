import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['chartData', 'options', 'plugins'],
  mounted () {
    const defaultOptions = {
      responsive: true,
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
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true
          }
        }],
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
