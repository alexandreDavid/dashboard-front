<template>
  <div class="graph-container">
    <Loading v-if="!isLoaded"/>
    <div v-else-if="errorMessage" class="text-center alert alert-danger m-4">An error occured</div>
    <div v-else class="chart-container">
      <LineChart v-if="graphType === 'LineChart'" v-bind:chartData="datacollection" :options="options"></LineChart>
      <PieChart v-else-if="graphType === 'PieChart'" v-bind:chartData="datacollection" :options="options"></PieChart>
    </div>
  </div>
</template>

<script>
import LineChart from './Charts/LineChart'
import PieChart from './Charts/PieChart'
import Data from '@/store/data'
import Loading from '@/components/Loading/Loading'
import Unit from '@/utils/unit'
import Settings from '@/store/settings'

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
      },
      familyUnit: false,
      activeUnits: Settings.activeSettings
    }
  },
  async created () {
    await this.getData()
  },
  watch: {
    // whenever question changes, this function will run
    async parameter () {
      await this.getData()
    },
    area: 'getData',
    activeUnits: {
      handler (val) {
        if (!this.familyUnit || val[this.familyUnit] !== this.datacollection.activeUnit) {
          this.getData()
        }
      },
      deep: true
    }
  },
  methods: {
    async getData () {
      this.isLoaded = false
      this.errorMessage = false
      try {
        this.datacollection.data = await Data.getAreaParameterData(this.area, this.parameter)
        this.familyUnit = Unit.getFamilyUnit(this.parameter.config.units.default)
        this.datacollection.activeUnit = Settings.getActiveKeyById(Unit.getFamilyUnit(this.parameter.config.units.default))
        // axes Y title
        this.options.scales.yAxes[0].scaleLabel.labelString = Unit.getLabel(this.datacollection.activeUnit || this.parameter.config.units.default)
      } catch (e) {
        this.errorMessage = true
      }
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
