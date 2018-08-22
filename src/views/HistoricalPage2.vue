<template>
  <div id="historical-page">
    <!-- <div class="d-flex h-50" v-if="isLoaded"> -->
    <div v-if="isLoaded" class="container mt-4">
      <div class="row mb-3">
        <div class="col-12">
          <div class="form-inline">
            <label class="m-2" for="region">Region</label>
            <select class="m-2 custom-select" id="region" name="region">
              <option value="1">Ugunda</option>
            </select>
            <label class="m-2" for="inlineFormCustomSelectPref">Climate variable</label>
            <select class="m-2 custom-select" v-model="activeVariable" id="inlineFormCustomSelectPref">
              <option v-for="variable in variables" :key="variable.name" :value="variable">{{ variable.label }}</option>
            </select>
            <label v-if="activeVariable.type !== 'Daily'" class="m-2" for="period">Month/Season/Annual</label>
            <select v-model="activePeriod" v-if="activeVariable.type !== 'Daily'" class="m-2 custom-select" id="period" name="period">
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
              <!-- <option value="16">Winter</option>
              <option value="13">Spring</option>
              <option value="14">Summer</option>
              <option value="15">Autumn</option>
              <option value="17">Annual</option> -->
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
          <div class="card p-3">
            <h6>Months</h6>
            <div class="mb-1 d-flex flex-wrap">
              <div v-for="(month, key) in months" :key="key" class="p-1" style="min-width: 90px">
                <button type="button" class="btn btn-secondary w-100" @click="activePeriod = month.value" v-bind:class="{active: activePeriod === month.value}">{{ month.label }}</button>
              </div>
            </div>
            <h6>Seasons</h6>
            <div class="mb-1 d-flex flex-wrap">
              <div v-for="(season, key) in seasons" :key="key" class="p-1" style="min-width: 90px">
                <button type="button" disabled class="btn btn-secondary w-100">{{ season }}</button>
              </div>
            </div>
            <h6>Annual</h6>
            <div class="mb-1 d-flex flex-wrap">
              <div class="p-1" style="min-width: 90px">
                <button type="button" disabled class="btn btn-secondary w-100">Annual</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mb-3" v-bind:class="{ 'col-md-6 col-lg-8': activeVariable.type !== 'Daily'}">
          <div class="card h-100" style="min-height: 400px">
            <div class="card-header">
              {{ activeVariable.description }} - {{ activeYear }}
            </div>
            <div class="card-body position-relative">
              <div id="historical-map-container"></div>
              <Popup v-if="mapIsLoaded"/>
              <div class="over-map" v-if="mapIsLoaded">
                <div class="over-map-right over-map-control">
                  <img v-bind:src="getDisplayedLayer()._legendUrl">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <HistoricalActualPage v-bind:variable="activeVariable" v-bind:period="activePeriod" @change="changeYear"></HistoricalActualPage>
        </div>
      </div>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import Loading from '@/components/Loading/Loading'
import MapObj from '@/store/map'
import HistoricalActualPage from '@/views/HistoricalActualPage2'
import HistoricalAnomalyPage from '@/views/HistoricalAnomalyPage'
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import AreaLayer from '@/store/areaLayer'
import Parameter from '@/store/parameter'
import DisplayedLayer from '@/store/displayedLayer'
import Area from '@/store/area.js'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import Popup from '@/components/Map/Popup'

export default {
  name: 'HistoricalPage',
  components: {
    Loading,
    SearchLocation,
    HistoricalActualPage,
    HistoricalAnomalyPage,
    Legend,
    Popup
  },
  provide () {
    return {
      getMap: this.getMap,
      getDisplayedLayer: this.getDisplayedLayer
    }
  },
  data () {
    return {
      isLoaded: false,
      mapIsLoaded: false,
      selectedTab: 'actual',
      map: false,
      selectedArea: Area.getSelectedArea(),
      parameter: Parameter.getDisplayedParameter(),
      areaLayer: false,
      variables: [],
      activeVariable: false,
      activeYear: false,
      activePeriod: '01',
      months: [
        {
          value: '01',
          label: 'Jan'
        }, {
          value: '02',
          label: 'Feb'
        }, {
          value: '03',
          label: 'Mar'
        }, {
          value: '04',
          label: 'Apr'
        }, {
          value: '05',
          label: 'May'
        }, {
          value: '06',
          label: 'Jun'
        }, {
          value: '07',
          label: 'Jul'
        }, {
          value: '08',
          label: 'Aug'
        }, {
          value: '09',
          label: 'Sep'
        }, {
          value: '10',
          label: 'Oct'
        }, {
          value: '11',
          label: 'Nov'
        }, {
          value: '12',
          label: 'Dec'
        }
      ],
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
      startDate: 1983,
      endDate: 2013
    }, {
      name: 'Chirps',
      label: 'Precipitations',
      description: 'Climate Hazards group InfraRed Precipitation with Stations',
      type: 'Monthly',
      layerName: 'historical:monthly_chirps_precip',
      legendName: 'chirps-20180101_1',
      startDate: 1983,
      endDate: 2013
    }, {
      name: 'R95',
      label: 'Rainfall on days > 95th percentile',
      description: 'Total amount of rainfall in a year, occurring on days which exceed the 95th percentile of average rainfall',
      type: 'Daily',
      layerName: 'historical:Rainf_R95p',
      legendName: 'wfdei_R95p',
      startDate: 1983,
      endDate: 2013
    }, {
      name: 'TX25',
      label: 'Days > 25°C',
      description: 'Number of days in a year exceeding 25°C, based on the WFDEI dataset',
      type: 'Daily',
      layerName: 'historical:Tair_TX25',
      legendName: 'wfdei_tx25',
      startDate: 1983,
      endDate: 2012
    }, {
      name: 'TX30',
      label: 'Days > 30°C',
      description: 'Number of days in a year exceeding 30°C, based on the WFDEI dataset',
      type: 'Daily',
      layerName: 'historical:Tair_TX30',
      legendName: 'wfdei_tx30',
      startDate: 1983,
      endDate: 2012
    }]
    this.activeVariable = this.variables[0]
    this.isLoaded = true
  },
  mounted () {
    this.map = new MapObj('historical-map-container')
    this.areaLayer = new AreaLayer(this.map, {id: 7552})
    this.displayedLayer = new DisplayedLayer(this.map)
    this.onSelectVariable(this.activeVariable)
    this.mapIsLoaded = true
  },
  watch: {
    activeVariable (variable) {
      this.onSelectVariable(variable)
    },
    activePeriod () {
      this.onSelectVariable(this.activeVariable)
    }
  },
  methods: {
    onSearchLocationSelected (location) {
      this.selectedArea = location
      if (location) {
        this.areaLayer.setSelectedArea(location)
      }
    },
    onSelectVariable (selectedVariable, year) {
      this.activeYear = year || selectedVariable.endDate
      if (selectedVariable.type !== 'Monthly') {
        this.activePeriod = '01'
      }
      this.displayedLayer.setDisplayedLayer({
        layerUrl: 'http://18.130.18.23:8180/geoserver/historical/ows',
        legendUrl: `http://18.130.18.23:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=${selectedVariable.legendName}`,
        layerParameters: {
          layers: selectedVariable.layerName,
          format: 'image/png',
          transparent: true,
          time: `${this.activeYear}-${this.activePeriod}`
        }
      })
    },
    changeYear (year) {
      this.onSelectVariable(this.activeVariable, year)
    },
    getMap () {
      return this.map
    },
    getDisplayedLayer () {
      return this.displayedLayer
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
