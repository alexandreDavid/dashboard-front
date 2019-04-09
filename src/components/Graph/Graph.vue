<template>
  <div class="graph-container">
    <Loading v-if="!isLoaded"/>
    <div v-else-if="errorMessage" class="text-center alert alert-danger m-4">An error occured</div>
    <div v-else class="chart-container">
      <LineChart v-if="graphType === 'LineChart'" v-bind:chartData="datacollection" :options="options"></LineChart>
      <BarChart v-if="graphType === 'BarChart'" v-bind:chartData="datacollection" :options="options"></BarChart>
      <PieChart v-else-if="graphType === 'PieChart'" v-bind:chartData="datacollection" :options="options"></PieChart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import LineChart from './Charts/LineChart'
import PieChart from './Charts/PieChart'
import BarChart from './Charts/BarChart'
import Loading from '@/components/Loading/Loading'
import Unit from '@/utils/unit'

export default {
  name: 'Graph',
  components: {
    LineChart,
    PieChart,
    BarChart,
    Loading
  },
  props: {
    parameter: Object,
    graphType: {
      type: String,
      default: 'BarChart',
      validator: function (value) {
        // The value must match one of these strings
        return ['LineChart', 'PieChart', 'BarChart'].indexOf(value) !== -1
      }
    },
    startDate: {},
    endDate: {}
  },
  computed: {
    ...mapGetters('settings', ['getActiveKeyById']),
    unit () {
      return this.getActiveKeyById(this.parameter.getUnitFamily())
    }
  },
  data () {
    return {
      isLoaded: false,
      errorMessage: false,
      datacollection: {},
      options: {
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
  async created () {
    await this.getData()
  },
  watch: {
    parameter: 'getData',
    startDate: 'getData',
    endDate: 'getData',
    unit (val) {
      this.parameter.setUnit(val)
      this.getData()
    }
  },
  methods: {
    async getData () {
      this.isLoaded = false
      this.errorMessage = false
      try {
        this.datacollection.data = await this.parameter.getStatistics(this.startDate, this.endDate, true)
        if (this.datacollection.data === 'cancel') {
          return
        }
        this.datacollection.activeUnit = this.parameter.getUnit()

        // axes Y title
        this.options.scales.yAxes[0].scaleLabel.labelString = Unit.getLabel(this.datacollection.activeUnit)
      } catch (e) {
        this.errorMessage = true
      }
      this.isLoaded = true
    },
    datesChange (newDates) {
      this.getData(newDates[0], newDates[1])
    }
  }
}
</script>

<style>
.graph-container {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.chart-container {
  position: relative;
  margin: auto;
  height: 100%;
  width: 100%;
}
</style>
