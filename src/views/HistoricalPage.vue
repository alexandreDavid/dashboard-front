<template>
  <div id="historical-page">
    <div v-if="isLoaded" class="container mt-4">
      <div class="row mb-3">
        <div class="col-12">
          <div class="form-inline">
            <label class="m-2" for="region">Region</label>
            <select class="m-2 custom-select" id="region" name="region">
              <option value="1">Uganda</option>
            </select>
            <label class="m-2" for="inlineFormCustomSelectPref">Climate variable</label>
            <select class="m-2 custom-select" v-model="activeVariable" id="inlineFormCustomSelectPref">
              <option v-for="variable in variables" :key="variable.name" :value="variable">{{ variable.label }}</option>
            </select>
            <label v-if="activeVariable.type !== 'Daily'" class="m-2" for="period">Month/Season/Annual</label>
            <select v-model="activePeriod" v-if="activeVariable.type !== 'Daily'" class="m-2 custom-select" id="period" name="period">
              <option v-for="month in months" :key="month.value" :value="month">{{ month.label }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          These maps enable you to view maps of monthly, seasonal and annual averages for the UK or your selected region. The analyses are based on 1 km grid-point data sets which are derived from station data. UK maps are available for the averaging periods 1961-1990, 1971-2000 and 1981-2010. Regional maps are only available for the period 1971-2000.
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-4 mb-3" v-if="activeVariable.type !== 'Daily'">
          <div class="card p-3 h-100">
            <h6>Months</h6>
            <div class="mb-1 d-flex flex-wrap">
              <div v-for="(month, key) in months" :key="key" class="p-1" style="min-width: 80px">
                <button type="button" class="btn btn-sm btn-secondary w-100" @click="activePeriod = month" v-bind:class="{active: activePeriod.value === month.value}">{{ month.shortLabel }}</button>
              </div>
            </div>
            <h6>Seasons (coming soon)</h6>
            <div class="mb-1 d-flex flex-wrap">
              <div v-for="(season, key) in seasons" :key="key" class="p-1" style="min-width: 80px">
                <button type="button" disabled class="btn btn-sm btn-secondary w-100">{{ season }}</button>
              </div>
            </div>
            <h6>Annual (coming soon)</h6>
            <div class="mb-1 d-flex flex-wrap">
              <div class="p-1" style="min-width: 80px">
                <button type="button" disabled class="btn btn-sm btn-secondary w-100">Annual</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mb-3" v-bind:class="{ 'col-md-6 col-lg-8': activeVariable.type !== 'Daily'}">
          <div class="card h-100" style="min-height: 400px">
            <div class="card-header">
              {{ activeVariable.description }} - {{(activeVariable.type !== 'Daily') ? `${activePeriod.label} ` : ''}}{{ activeYear }}
            </div>
            <div class="card-body position-relative">
              <MiniMap minimapKey="historical-map-container" v-bind:parameter="displayedLayer" interactive="true"></MiniMap>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <HistoricalActualPage v-bind:variable="activeVariable" v-bind:period="activePeriod.value" @change="changeYear"></HistoricalActualPage>
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

export default {
  name: 'HistoricalPage',
  components: {
    Loading,
    HistoricalActualPage,
    MiniMap
  },
  data () {
    const months = [
      {
        value: '01',
        label: 'January',
        shortLabel: 'Jan'
      }, {
        value: '02',
        label: 'February',
        shortLabel: 'Feb'
      }, {
        value: '03',
        label: 'March',
        shortLabel: 'Mar'
      }, {
        value: '04',
        label: 'April',
        shortLabel: 'Apr'
      }, {
        value: '05',
        label: 'May',
        shortLabel: 'May'
      }, {
        value: '06',
        label: 'June',
        shortLabel: 'Jun'
      }, {
        value: '07',
        label: 'July',
        shortLabel: 'Jul'
      }, {
        value: '08',
        label: 'August',
        shortLabel: 'Aug'
      }, {
        value: '09',
        label: 'September',
        shortLabel: 'Sep'
      }, {
        value: '10',
        label: 'October',
        shortLabel: 'Oct'
      }, {
        value: '11',
        label: 'November',
        shortLabel: 'Nov'
      }, {
        value: '12',
        label: 'December',
        shortLabel: 'Dec'
      }
    ]
    return {
      isLoaded: false,
      selectedTab: 'actual',
      displayedLayer: false,
      variables: [],
      activeVariable: false,
      activeYear: false,
      activePeriod: months[0],
      months: months,
      seasons: ['Spring', 'Summer', 'Autumn', 'Winter']
    }
  },
  async created () {
    this.variables = [{
      name: 'CDD',
      label: 'Consecutive dry days',
      description: 'Maximum number of consecutive dry days',
      type: 'Daily',
      layerName: 'historical:Rainf_CDD',
      legendName: 'wfdei_CDD',
      startDate: 1984,
      endDate: 2013
    }, {
      name: 'Chirps',
      label: 'Precipitations',
      description: 'Climate Hazards group InfraRed Precipitation with Stations',
      type: 'Monthly',
      layerName: 'historical:monthly_chirps_precip',
      legendName: 'chirps-20180101_1',
      startDate: 1984,
      endDate: 2013
    }, {
      name: 'ERAI',
      label: '2 metres temperature',
      description: '2 metres temperature',
      type: 'Monthly',
      layerName: 'historical:monthly_erai_tmean(2mt)',
      legendName: 'ERAI_tmean',
      startDate: 1987,
      endDate: 2016
    }, {
      name: 'R95',
      label: 'Rainfall on days > 95th percentile',
      description: 'Total amount of rainfall in a year, occurring on days which exceed the 95th percentile of average rainfall',
      type: 'Daily',
      layerName: 'historical:Rainf_R95p',
      legendName: 'wfdei_R95p',
      startDate: 1984,
      endDate: 2013
    }, {
      name: 'TX25',
      label: 'Days > 25°C',
      description: 'Number of days in a year exceeding 25°C, based on the WFDEI dataset',
      type: 'Daily',
      layerName: 'historical:Tair_TX25',
      legendName: 'wfdei_tx25',
      startDate: 1984,
      endDate: 2012
    }, {
      name: 'TX30',
      label: 'Days > 30°C',
      description: 'Number of days in a year exceeding 30°C, based on the WFDEI dataset',
      type: 'Daily',
      layerName: 'historical:Tair_TX30',
      legendName: 'wfdei_tx30',
      startDate: 1984,
      endDate: 2012
    }]
    this.activeVariable = this.variables[0]
    this.isLoaded = true
  },
  mounted () {
    this.onSelectVariable(this.activeVariable)
  },
  watch: {
    activeVariable (variable) {
      this.onSelectVariable(variable)
    },
    activePeriod () {
      this.onSelectVariable(this.activeVariable, this.activeYear)
    }
  },
  methods: {
    onSelectVariable (selectedVariable, year) {
      this.activeYear = year || selectedVariable.endDate
      if (selectedVariable.type !== 'Monthly') {
        this.activePeriod = this.months[0]
      }
      this.displayedLayer = {
        layerUrl: 'http://18.130.18.23:8180/geoserver/historical/ows',
        legendUrl: `http://18.130.18.23:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=${selectedVariable.legendName}`,
        layerParameters: {
          layers: selectedVariable.layerName,
          format: 'image/png',
          transparent: true,
          time: `${this.activeYear}-${this.activePeriod.value}`
        }
      }
    },
    changeYear (year) {
      this.onSelectVariable(this.activeVariable, year)
    }
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
