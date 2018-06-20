import { Line, ChartUtil } from './BaseCharts'

export default {
  extends: Line,
  props: ['chartData', 'options'],
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
    this.renderChart(this.fillData(this.chartData), {...defaultOptions, ...this.options})
  },
  methods: {
    fillData (data) {
      let datasets = []
      let labels = []

      let valueConversion = function (value, unit) {
        return parseFloat(value.replace(',', '.')).toFixed(2)
      }

      // Adding every datasets
      Object.keys(Object.values(data.data)[0]).forEach((value, key) => {
        let color = Object.values(ChartUtil.colors)[key]
        datasets.push(
          {
            label: value,
            fill: false,
            backgroundColor: color,
            borderColor: color,
            data: []
          }
        )
      })
      Object.entries(data.data).slice(0, 12).forEach(([key, value]) => {
        labels.push(ChartUtil.convertDate(key))
        Object.entries(value).forEach(([key, value]) => {
          datasets.find(d => d.label === key).data.push(valueConversion(value, 0))
        })
      })

      return {datasets, labels}
    }
  }
}
