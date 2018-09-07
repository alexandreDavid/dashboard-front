import { Line } from '@/components/Graph/Charts/BaseCharts'
import ChartUtil from '@/utils/chart'
import Observation from '@/store/observation'

export default {
  extends: Line,
  props: ['observation', 'variable', 'dateStart', 'dateEnd'],
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
  async mounted () {
    const timeserie = await Observation.getObservationTimeSeries(
      'meteorological_station',
      this.observation.station_id,
      this.dateStart,
      this.dateEnd,
      this.variable
    )

    this.renderChart(this.fillData(timeserie), this.defaultOption)
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
    fillData (data) {
      let color = Object.values(ChartUtil.colors)[0]
      let datasets = [
        {
          label: 'measurement',
          fill: false,
          backgroundColor: color,
          borderColor: color,
          data: []
        }
      ]
      let labels = []

      data.forEach(val => {
        labels.push(ChartUtil.convertDate(val.timestamp))
        datasets[0].data.push(val.measurement)
      })

      return {datasets, labels}
    },
    async reloadChart () {
      const timeserie = await Observation.getObservationTimeSeries(
        'meteorological_station',
        this.observation.station_id,
        this.dateStart,
        this.dateEnd,
        this.variable
      )
      this.updateData(this.fillData(timeserie), this.defaultOptions)
    }
  }
}
