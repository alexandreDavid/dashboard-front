<template>
  <div class="graph-container">
    <div v-if="isLoaded" class="chart-container">
      <LineChart v-if="graphType === 'LineChart'" v-bind:chartData="datacollection" :options="options"></LineChart>
      <PieChart v-else-if="graphType === 'PieChart'" v-bind:chartData="datacollection" :options="options"></PieChart>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import LineChart from './Charts/LineChart'
import PieChart from './Charts/PieChart'
import Data from '@/store/data'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'Graph',
  components: {
    LineChart,
    PieChart,
    Loading
  },
  props: {
    area: Object,
    parameter: Object,
    graphType: {
      type: String,
      default: 'LineChart',
      validator: function (value) {
        // The value must match one of these strings
        return ['LineChart', 'PieChart'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      isLoaded: false,
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
    // whenever question changes, this function will run
    async parameter () {
      await this.getData()
    }
  },
  methods: {
    async getData () {
      this.isLoaded = false
      this.datacollection = await Data.getAreaParameterData(this.area, this.parameter)
      // axes Y title
      this.options.scales.yAxes[0].scaleLabel.labelString = this.datacollection.unit
      this.isLoaded = true
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
