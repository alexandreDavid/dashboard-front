<template>
  <div id="historical-page">
    <div v-if="isLoaded" class="container mt-4">
      <div class="row mb-3">
        <div class="col-12">
          These maps enable you to view monthly, seasonal and annual averages for Uganda for your selected region, for recent years. The different variables are based on different observational data sets.
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <div class="form-inline">
            <div class="form-group">
              <label class="m-2" for="region">Region</label>
              <select class="m-2 custom-select" id="region" name="region">
                <option value="1">Uganda</option>
              </select>
            </div>
            <div class="form-group">
              <label class="m-2" for="variable">Climate variable</label>
              <select class="m-2 custom-select" v-model="activeVariable" id="variable">
                <option v-for="variable in variables" :key="variable.name" :value="variable" :disabled="variable.disabled">{{ variable.label }}</option>
              </select>
            </div>
            <div class="form-group">
              <label v-if="datasets[activeVariableDataset.id].frequency !== 'Daily'" class="m-2" for="period">Month/Season/Annual</label>
              <select v-model="activePeriod" v-if="datasets[activeVariableDataset.id].frequency !== 'Daily'" class="m-2 custom-select" id="period" name="period">
                <option v-for="timePeriod in timePeriods" :key="timePeriod.value" :value="timePeriod">{{ timePeriod.label }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="m-2" for="dataset">Dataset</label>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button v-for="dataset in activeVariable.datasets" @click="onSelectVariableDataset(dataset)" :key="dataset.id" type="button" class="btn btn-secondary" :disabled="dataset.disabled">
                  {{ datasets[dataset.id].label }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          {{ datasets[activeVariableDataset.id].description }}
          <div v-for="(link, key) in datasets[activeVariableDataset.id].links" :key="key"><a :href="link" target="__blank">{{ link }}</a> </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-4 mb-3" v-if="datasets[activeVariableDataset.id].frequency !== 'Daily'">
          <div class="card p-3 h-100">
            <h6>Months</h6>
            <div class="mb-1 d-flex flex-wrap">
              <div v-for="(month, key) in timePeriodTypeFilter(timePeriods, 'month')" :key="key" class="p-1" style="min-width: 80px">
                <button type="button" class="btn btn-sm btn-secondary w-100" @click="activePeriod = month" v-bind:class="{active: activePeriod.value === month.value}">{{ month.shortLabel }}</button>
              </div>
            </div>
            <h6>Seasons</h6>
            <div class="mb-1 d-flex flex-wrap">
              <div v-for="(season, key) in timePeriodTypeFilter(timePeriods, 'season')" :key="key" class="p-1" style="min-width: 80px">
                <button type="button" class="btn btn-sm btn-secondary w-100" @click="activePeriod = season" v-bind:class="{active: activePeriod.value === season.value}">{{ season.shortLabel }}</button>
              </div>
            </div>
            <h6>Annual</h6>
            <div class="mb-1 d-flex flex-wrap">
              <div v-for="(annual, key) in timePeriodTypeFilter(timePeriods, 'annual')" :key="key" class="p-1" style="min-width: 80px">
                <button type="button" class="btn btn-sm btn-secondary w-100" @click="activePeriod = annual" v-bind:class="{active: activePeriod.value === annual.value}">{{ annual.shortLabel }}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mb-3" v-bind:class="{ 'col-md-6 col-lg-8': datasets[activeVariableDataset.id].frequency !== 'Daily'}">
          <div class="card h-100" style="min-height: 400px">
            <div class="card-header">
              {{ label }}
            </div>
            <div class="card-body position-relative">
              <MiniMap minimapKey="historical-map-container" v-bind:parameter="displayedLayer" v-bind:areaLayer="areaLayer" interactive="true"></MiniMap>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <HistoricalActualPage v-bind:variable="activeVariableDataset" v-bind:period="activePeriod" v-bind:areaLayer="areaLayer" @change="changeYear"></HistoricalActualPage>
        </div>
      </div>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import Loading from '@/components/Loading/Loading'
import HistoricalActualPage from '@/views/HistoricalActualPage'
import MiniMap from '@/components/Map/MiniMap'
import config from '@/store/historicalConfiguration'
import AreaLayer from '@/store/areaLayer'

export default {
  name: 'HistoricalPage',
  components: {
    Loading,
    HistoricalActualPage,
    MiniMap
  },
  data () {
    return {
      isLoaded: false,
      displayedLayer: false,
      variables: [],
      activeVariable: false,
      activeVariableDataset: false,
      activeYear: false,
      activePeriod: false,
      areaLayer: false,
      timePeriods: [],
      datasets: [],
      label: false
    }
  },
  created () {
    this.variables = config.getAllVariables()
    this.activeVariable = this.variables[0]
    this.timePeriods = config.getAllTimePeriods()
    this.activePeriod = this.timePeriods[0]
    this.datasets = config.getAllDatasets()
  },
  async mounted () {
    this.onSelectVariable(this.activeVariable)
    this.areaLayer = new AreaLayer()
    await this.areaLayer.setSelectedArea({id_area: 7552})
    this.isLoaded = true
  },
  watch: {
    activeVariable (variable) {
      this.onSelectVariable(variable)
    },
    activePeriod () {
      this.onSelectVariableDataset(this.activeVariableDataset, this.activeYear)
    }
  },
  methods: {
    onSelectVariableDataset (dataset, year) {
      this.activeVariableDataset = dataset
      let selectedVariable = dataset
      this.activeYear = year || selectedVariable.endDate
      let time
      if (this.datasets[dataset.id].frequency !== 'Monthly') {
        this.activePeriod = this.timePeriods[0]
        time = `${this.activeYear}-${this.activePeriod.value}`
        selectedVariable.layer = `${selectedVariable.workspaceName}:${selectedVariable.layerName}`
      } else {
        if (this.activePeriod.type === 'month') {
          selectedVariable.layer = `${selectedVariable.workspaceName}:monthly_${selectedVariable.layerName}`
          time = `${this.activeYear}-${this.activePeriod.value}`
        } else if (this.activePeriod.type === 'season') {
          selectedVariable.layer = `${selectedVariable.workspaceName}:${selectedVariable.layerName}_${this.activePeriod.label.toLowerCase()}`
          time = this.activeYear
        } else {
          selectedVariable.layer = `${selectedVariable.workspaceName}:annual_${selectedVariable.layerName}`
          time = this.activeYear
        }
      }
      this.displayedLayer = {
        layerUrl: `${process.env.GEOSERVER_URL}/wms`,
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=${selectedVariable.legendName}`,
        layerParameters: {
          layers: selectedVariable.layer,
          format: 'image/png',
          transparent: true,
          time
        }
      }
      this.setLabel()
    },
    onSelectVariable (selectedVariable, year) {
      this.onSelectVariableDataset(selectedVariable.datasets.find(d => !d.disabled))
    },
    changeYear (year) {
      this.onSelectVariableDataset(this.activeVariableDataset, year)
    },
    timePeriodTypeFilter: function (timePeriods, type) {
      return timePeriods.filter(t => t.type === type)
    },
    setLabel () {
      let desc = this.activeVariable.description
      if (this.activePeriod.type === 'month') {
        desc = desc.replace('{monthly, seasonal or annual}*', 'Monthly')
        desc = desc.replace('{mm/month, mm/season or mm/year}*', 'mm/month')
      } else if (this.activePeriod.type === 'season') {
        desc = desc.replace('{monthly, seasonal or annual}*', 'Seasonal')
        desc = desc.replace('{mm/month, mm/season or mm/year}*', 'mm/season')
      } else {
        desc = desc.replace('{monthly, seasonal or annual}*', 'Annual')
        desc = desc.replace('{mm/month, mm/season or mm/year}*', 'mm/year')
      }
      desc = desc.replace('{dataset}*', this.datasets[this.activeVariableDataset.id].label)
      this.label = `${desc} - ${(this.datasets[this.activeVariableDataset.id].frequency !== 'Daily') ? `${this.activePeriod.label} ` : ''}${this.activeYear}`
    }
  },
  destroyed () {
    delete this.areaLayer
  }
}
</script>

<style lang="scss" scoped>
#historical-page, #historical-map-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
