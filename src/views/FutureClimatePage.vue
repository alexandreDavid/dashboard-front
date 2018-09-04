<template>
  <div id="historical-page">
    <div v-if="isLoaded" class="d-flex flex-column h-100">
      <div class="shadow py-2 flex-shrink-1 sticky-bar">
        <div class="form-inline">
          <div class="form-group">
            <label class="m-2" for="region">Region</label>
            <select class="m-2 custom-select" id="region" name="region">
              <option value="1">Uganda</option>
            </select>
          </div>
          <div class="form-group">
            <label class="m-2" for="inlineFormCustomSelectPref">Climate variable</label>
            <select class="m-2 custom-select" v-model="activeVariable" id="inlineFormCustomSelectPref">
              <option v-for="variable in variables" :key="variable.name" :value="variable">{{ variable.label }}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="m-2" for="timePeriod">Month/Season/Annual</label>
            <select v-model="activeTimePeriod" class="m-2 custom-select" id="timePeriod" name="timePeriod">
              <option v-for="month in months" :key="month.id" :value="month">{{ month.label }}</option>
              <option v-for="season in seasons" :key="season.id" :value="season">{{ season.label }}</option>
              <option :value="annual">{{ annual.label }}</option>
            </select>
          </div>
          <!-- <div class="btn-group m-2" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary active">CMIP5</button>
            <button type="button" class="btn btn-primary" disabled>CORDEX</button>
          </div> -->
          <!-- <div class="btn-group m-2" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary active">Anomaly</button>
            <button type="button" class="btn btn-secondary" disabled>Model consensus</button>
          </div> -->
          <div class="form-group">
            <label class="m-2" for="period">Period</label>
            <select v-model="activePeriod" class="m-2 custom-select" id="period" name="period">
              <option v-for="period in periods" :key="period.id" :value="period">{{ period.label }}</option>
            </select>
          </div>
        </div>
        <!-- <FutureClimateRangeSlider v-model="sliderValue" class="w-100 px-4"></FutureClimateRangeSlider> -->
      </div>
      <div class="position-relative h-100">
        <div class="container-fluid" style="
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          overflow: auto;">
          <div class="row mt-3">
            <div class="col-md-4 mb-3">
              <div class="card p-3 h-100">
                <h6>Months</h6>
                <div class="mb-1 d-flex flex-wrap">
                  <div v-for="(month, key) in months" :key="key" class="p-1" style="min-width: 80px">
                    <button type="button" class="btn btn-sm btn-secondary w-100" @click="activeTimePeriod = month" v-bind:class="{active: activeTimePeriod.id === month.id}">{{ month.shortLabel }}</button>
                  </div>
                </div>
                <h6>Seasons</h6>
                <div class="mb-1 d-flex flex-wrap">
                  <div v-for="(season, key) in seasons" :key="key" class="p-1" style="min-width: 80px">
                    <button type="button" class="btn btn-sm btn-secondary w-100" @click="activeTimePeriod = season" v-bind:class="{active: activeTimePeriod.id === season.id}">{{ season.label }}</button>
                  </div>
                </div>
                <h6>Annual</h6>
                <div class="mb-1 d-flex flex-wrap">
                  <div class="p-1" style="min-width: 80px">
                    <button type="button" class="btn btn-sm btn-secondary w-100" @click="activeTimePeriod = annual" v-bind:class="{active: activeTimePeriod.id === annual.id}">{{ annual.label }}</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 mb-3">
              <FutureClimateModels v-bind:variable="activeVariable" v-bind:period="activePeriod" v-bind:timePeriod="activeTimePeriod"></FutureClimateModels>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              The plot below shows the range of projected future changes for this location across 10 different statistically downscaled CMIP5 GCMs for two different RCP pathways (RCP 4.5 and RCP 8.5). Anomalies are currently calculated relative the historical period 1980 - 2000. The solid bars represent the range between the middle 80% of projected change and so excludes the upper and lower 10% as these are often considered to be outliers. However, the grey lines show the projected change for each model so it is possible to see how individual models (intentionally not named) project the future changes.
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <HistoricalAnomalyPage></HistoricalAnomalyPage>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import Loading from '@/components/Loading/Loading'
import FutureClimateModels from '@/views/FutureClimateModels'
import HistoricalAnomalyPage from '@/views/HistoricalAnomalyPage'
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import FutureClimateRangeSlider from '@/components/Slider/FutureClimateRangeSlider'

export default {
  name: 'FutureClimatePage',
  components: {
    Loading,
    SearchLocation,
    FutureClimateModels,
    HistoricalAnomalyPage,
    FutureClimateRangeSlider
  },
  provide () {
    return {
      getDisplayedLayer: this.getDisplayedLayer
    }
  },
  data () {
    const months = [
      {
        id: 1,
        value: '01',
        label: 'January',
        shortLabel: 'Jan',
        type: 'months'
      }, {
        id: 2,
        value: '02',
        label: 'February',
        shortLabel: 'Feb',
        type: 'months'
      }, {
        id: 3,
        value: '03',
        label: 'March',
        shortLabel: 'Mar',
        type: 'months'
      }, {
        id: 4,
        value: '04',
        label: 'April',
        shortLabel: 'Apr',
        type: 'months'
      }, {
        id: 5,
        value: '05',
        label: 'May',
        shortLabel: 'May',
        type: 'months'
      }, {
        id: 6,
        value: '06',
        label: 'June',
        shortLabel: 'Jun',
        type: 'months'
      }, {
        id: 7,
        value: '07',
        label: 'July',
        shortLabel: 'Jul',
        type: 'months'
      }, {
        id: 8,
        value: '08',
        label: 'August',
        shortLabel: 'Aug',
        type: 'months'
      }, {
        id: 9,
        value: '09',
        label: 'September',
        shortLabel: 'Sep',
        type: 'months'
      }, {
        id: 10,
        value: '10',
        label: 'October',
        shortLabel: 'Oct',
        type: 'months'
      }, {
        id: 11,
        value: '11',
        label: 'November',
        shortLabel: 'Nov',
        type: 'months'
      }, {
        id: 12,
        value: '12',
        label: 'December',
        shortLabel: 'Dec',
        type: 'months'
      }
    ]
    let periods = [
      {
        id: '2030-2059',
        label: '2030-2059',
        min: 2030,
        max: 2059
      }, {
        id: '2070-2099',
        label: '2070-2099',
        min: 2070,
        max: 2099
      }
    ]
    return {
      isLoaded: false,
      sliderValue: [2040, 2060],
      activeTimePeriod: months[0],
      months: months,
      variables: [],
      activeVariable: false,
      periods: periods,
      activePeriod: periods[0],
      models: [
        {
          title: 'CanESM2'
        }, {
          title: 'HadGEM2-ES'
        }, {
          title: 'MIROC5'
        }, {
          title: 'MPI-ESM-LR'
        }, {
          title: 'CNRM-CM5'
        }
      ],
      seasons: [
        {
          id: 13,
          value: '01',
          label: 'Spring',
          type: 'seasons'
        }, {
          id: 14,
          value: '02',
          label: 'Summer',
          type: 'seasons'
        }, {
          id: 15,
          value: '03',
          label: 'Autumn',
          type: 'seasons'
        }, {
          id: 16,
          value: '04',
          label: 'Winter',
          type: 'seasons'
        }
      ],
      annual: {
        id: 17,
        label: 'Annual',
        type: 'annual'
      }
    }
  },
  async created () {
    this.variables = [{
      name: 'CDD_anom',
      label: 'Consecutive dry days',
      description: 'Maximum number of consecutive dry days',
      styleName: 'CCSM4'
    }, {
      name: 'TX30',
      label: 'Days > 30°C',
      description: 'Number of days in a year exceeding 30°C, based on the WFDEI dataset',
      styleName: 'CCSM4_tx30anom'
    }, {
      name: 'dry_spells',
      label: 'Dry spells',
      description: 'Dry spells',
      styleName: 'CCSM4_tx30anom'
    }]
    this.activeVariable = this.variables[0]
    this.isLoaded = true
  },
  methods: {
    onSelectVariable (selectedVariable) {
      console.log(selectedVariable)
      this.activeVariable = selectedVariable.name
    },
    getDisplayedLayer () {
      return this.displayedLayer
    },
    maximizeModel (index) {
      this.models[index].maximize = true
    },
    minimizeModel (index) {
      this.models[index].maximize = false
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

.sticky-bar {
  z-index: 1020;
}
</style>
