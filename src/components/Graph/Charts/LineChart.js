import { Line } from './BaseCharts'
import ChartUtil from '@/utils/chart'
import Unit from '@/utils/unit'

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

      let valueConversion = function (value) {
        if (isNaN(value)) {
          value = parseFloat(value.replace(',', '.')).toFixed(2)
        }
        return Unit.convert(data.unit, data.activeUnit, value)
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
      Object.entries(data.data).forEach(([key, value]) => {
        labels.push(ChartUtil.convertDate(key))
        Object.entries(value).forEach(([key, value]) => {
          datasets.find(d => d.label === key).data.push(valueConversion(value))
        })
      })

      return {datasets, labels}
    }
  }
}
