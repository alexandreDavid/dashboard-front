import { Bar, ChartUtil } from '@/components/Graph/Charts/BaseCharts'

export default {
  extends: Bar,
  data () {
    return {
      defaultOptions: {
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
          xAxes: [{
            barPercentage: 0.5
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.fillData(), this.defaultOptions)
  },
  watch: {
    dateStart: function () {
      this.reloadChart()
    },
    dateEnd: function () {
      this.reloadChart()
    }
  },
  methods: {
    randomValues (sign) {
      let values = []
      let minus
      for (let i = 0; i < 12; i++) {
        if (!sign) {
          minus = Math.round(Math.random()) === 0 ? -1 : 1
        } else {
          minus = sign
        }
        values.push(Math.floor(Math.random() * Math.floor(100)) * minus)
      }
      return values
    },
    fillData () {
      let datasets = []
      datasets.push({
        label: '(increase)',
        stack: 'Stack 0',
        backgroundColor: ChartUtil.colors.blue,
        // borderColor: 'blue',
        // borderWidth: 2,
        data: this.randomValues(1)
      })

      datasets.push({
        label: '(decrease) 10th to 90th percentile range 2040 - 2060',
        stack: 'Stack 0',
        // backgroundColor: 'rgba(255, 0, 0, 0.1)',
        backgroundColor: ChartUtil.colors.red,
        // borderColor: 'red',
        // borderWidth: 2,
        data: this.randomValues(-1)
      })

      const models = ['CanESM2', 'HadGEM2-ES', 'MIROC5', 'MPI-ESM-LR', 'CNRM-CM5']
      models.forEach((model) => {
        datasets.push({
          label: model,
          fill: false,
          borderWidth: 2,
          backgroundColor: 'grey',
          borderColor: 'grey',
          data: this.randomValues(),
          type: 'line'
        })
      })

      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      return {datasets, labels}
    }
  }
}
