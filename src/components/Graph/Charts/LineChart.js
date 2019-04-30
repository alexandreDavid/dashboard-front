import { Line } from './BaseCharts'
import ChartUtil from '@/utils/chart'
// import Unit from '@/utils/unit'

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

      // let valueConversion = function (value) {
      //   if (isNaN(value)) {
      //     value = parseFloat(value.replace(',', '.')).toFixed(2)
      //   }
      //   return Unit.convert(data.unit, data.activeUnit, value)
      // }

      // Adding every datasets
      Object.keys(data.data[0].values).forEach((value, key) => {
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
      data.data.forEach(data => {
        labels.push(ChartUtil.convertDate(data.date))
        for (let label in data.values) {
          datasets.find(d => d.label === label).data.push(data.values[label])
        }
      })

      return {datasets, labels}
    }
  }
}
