<template>
  <div id="graph-page">
    <div class="container d-flex flex-column h-100">
      <div class="row">
        <h4 class="mt-2 mb-2 col-12">Graph</h4>
        <div class="position-relative col-12">
          <div class="form-group">
            <SearchLocation @input="onSearchLocationSelected" />
          </div>
          <graph-serie v-for="(serie, key) in series" :key="key" v-bind:serie="serie" @edited="renderGraph()" @remove="removeSerie(key)"></graph-serie>
          <button type="button" v-if="selectedArea" class="btn btn-primary" @click="addSerie()">Add a serie</button>
        </div>
      </div>
      <div class="position-relative flex-grow-1" v-if="isLoaded">
        <advanced-chart v-if="chartData.datasets" v-bind:chartData="chartData"></advanced-chart>
      </div>
      <Loading v-else/>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading/Loading'
import Parameter from '@/store/parameter.js'
import Area from '@/store/area.js'
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import GraphSerie from './GraphSerie'
import Data from '@/store/data'
import AdvancedChart from './Charts/AdvancedChart'
import { ChartUtil } from './Charts/BaseCharts'

export default {
  name: 'GraphPage',
  components: {
    Graph: () => import('@/components/Graph/Graph'),
    Loading,
    SearchLocation,
    GraphSerie,
    AdvancedChart
  },
  data () {
    return {
      isLoaded: false,
      areas: false,
      selectedArea: false,
      parameters: false,
      selectedParameter: false,
      series: [],
      chartData: {}
    }
  },
  provide() {
    return {
      getParameters: this.getParameters
    }
  },
  async created () {
    this.parameters = await Parameter.getAllParameters()
    this.selectedArea = Area.getSelectedArea()
    this.isLoaded = true
  },
  methods: {
    onSearchLocationSelected (newValue) {
      this.selectedArea = newValue
    },
    getParameters () {
      return this.parameters
    },
    addSerie () {
      this.series.push({})
    },
    removeSerie (key) {
      this.series.splice(key, 1)
      this.renderGraph()
    },
    async renderGraph () {
      let vm = this
      this.isLoaded = false

      let datasets = []
      let labels = []
      let valueConversion = function (value, unit) {
        return parseFloat(value.replace(',', '.')).toFixed(2)
      }

      await Promise.all(vm.series.map(async (serie, key) => {
        const data = await Data.getAreaParameterData(this.selectedArea, serie.selectedParameter)
        let color = Object.values(ChartUtil.colors)[key]
        let dataset = {
          label: serie.title || serie.selectedParameter && serie.selectedParameter.paramDescription,
          fill: false,
          backgroundColor: color,
          borderColor: color,
          data: []
        }

        Object.entries(data.data).slice(0, 12).forEach(([dkey, d]) => {
          dataset.data.push(valueConversion(d.avg))
          if (key === 0) {
            labels.push(ChartUtil.convertDate(dkey))
          }
        })
        datasets.push(dataset)
      }))

      this.chartData = {datasets, labels}
      this.isLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>

#graph-page {
position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>