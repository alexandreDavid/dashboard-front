import { Pie } from './BaseCharts'
import ChartUtil from '@/utils/chart'

export default {
  extends: Pie,
  props: ['chartData', 'options'],
  mounted () {
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false
    }
    let data = {
      datasets: [{
        data: [10, 20, 30, 40, 50, 10, 50],
        backgroundColor: Object.values(ChartUtil.colors)
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Blue',
        'Grey',
        'Purple'
      ]
    }
    this.renderChart(data, {...defaultOptions})
  }
}
