import Chart from 'chart.js'

export function generateChart (chartId, chartType) {
  return {
    render: function (createElement) {
      return createElement(
        'canvas', {
          attrs: {
            id: this.chartId
          },
          ref: 'canvas'
        }
      )
    },

    props: {
      chartId: {
        default: chartId,
        type: String
      },
      plugins: {
        type: Array,
        default () {
          return []
        }
      }
    },

    data () {
      return {
        _chart: null,
        _plugins: this.plugins
      }
    },

    methods: {
      addPlugin (plugin) {
        this.$data._plugins.push(plugin)
      },
      renderChart (data, options) {
        this.$data._chart = new Chart(
          this.$refs.canvas.getContext('2d'), {
            type: chartType,
            data: data,
            options: options,
            plugins: this.$data._plugins
          }
        )
      }
    },
    beforeDestroy () {
      if (this.$data._chart) {
        this.$data._chart.destroy()
      }
    }
  }
}

export const Bar = generateChart('bar-chart', 'bar')
export const HorizontalBar = generateChart('horizontalbar-chart', 'horizontalBar')
export const Doughnut = generateChart('doughnut-chart', 'doughnut')
export const Line = generateChart('line-chart', 'line')
export const Pie = generateChart('pie-chart', 'pie')
export const PolarArea = generateChart('polar-chart', 'polarArea')
export const Radar = generateChart('radar-chart', 'radar')
export const Bubble = generateChart('bubble-chart', 'bubble')
export const Scatter = generateChart('scatter-chart', 'scatter')

export const ChartUtil = {
  convertDate (date) {
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let d = new Date(date)
    return `${d.getDate()} ${monthNames[d.getMonth()]} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`
  },
  colors: {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    grey: 'rgb(201, 203, 207)',
    purple: 'rgb(153, 102, 255)'
  }
}

export default {
  Bar,
  HorizontalBar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter,
  ChartUtil
}
