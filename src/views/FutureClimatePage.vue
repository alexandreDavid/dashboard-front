<template>
  <div id="historical-page">
    <div v-if="isLoaded" class="d-flex flex-column h-100">
      <div class="shadow py-2 flex-shrink-1 sticky-bar">
        <div class="form-inline">
          <label class="m-2" for="region">Region</label>
          <select class="m-2 custom-select" id="region" name="region">
            <option value="1">Uganda</option>
          </select>
          <label class="m-2" for="inlineFormCustomSelectPref">Climate variable</label>
          <select class="m-2 custom-select" v-model="activeVariable" id="inlineFormCustomSelectPref">
            <option v-for="variable in variables" :key="variable.name" :value="variable">{{ variable.label }}</option>
          </select>
          <label class="m-2" for="period">Month/Season/Annual</label>
          <select v-model="activePeriod" class="m-2 custom-select" id="period" name="period">
            <option v-for="month in months" :key="month.value" :value="month">{{ month.label }}</option>
            <option v-for="season in seasons" :key="season.value" :value="season">{{ season.label }}</option>
            <option :value="annual">{{ annual.label }}</option>
          </select>
          <div class="btn-group m-2" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary active">CMIP5</button>
            <button type="button" class="btn btn-primary" disabled>CORDEX</button>
          </div>
          <div class="btn-group m-2" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary active">Anomaly</button>
            <button type="button" class="btn btn-secondary" disabled>Model consensus</button>
          </div>
          <label class="m-2" for="time">Period</label>
          <select v-model="activeTime" class="m-2 custom-select" id="time" name="time">
            <option value="2030-2059">2030-2059</option>
            <option value="2070-2099">2070-2099</option>
          </select>
        </div>
        <FutureClimateRangeSlider v-model="sliderValue" class="w-100 px-4"></FutureClimateRangeSlider>
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
                    <button type="button" class="btn btn-sm btn-secondary w-100" @click="activePeriod = month" v-bind:class="{active: activePeriod.value === month.value}">{{ month.shortLabel }}</button>
                  </div>
                </div>
                <h6>Seasons</h6>
                <div class="mb-1 d-flex flex-wrap">
                  <div v-for="(season, key) in seasons" :key="key" class="p-1" style="min-width: 80px">
                    <button type="button" class="btn btn-sm btn-secondary w-100" @click="activePeriod = season" v-bind:class="{active: activePeriod.value === season.value}">{{ season.label }}</button>
                  </div>
                </div>
                <h6>Annual</h6>
                <div class="mb-1 d-flex flex-wrap">
                  <div class="p-1" style="min-width: 80px">
                    <button type="button" class="btn btn-sm btn-secondary w-100" @click="activePeriod = annual" v-bind:class="{active: activePeriod.value === annual.value}">{{ annual.label }}</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 mb-3">
              <FutureClimateModels v-bind:variable="activeVariable.name" v-bind:period="activeTime" v-bind:timePeriod="activePeriod"></FutureClimateModels>
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
        value: 'jan',
        label: 'January',
        shortLabel: 'Jan'
      }, {
        value: 'feb',
        label: 'February',
        shortLabel: 'Feb'
      }, {
        value: 'mar',
        label: 'March',
        shortLabel: 'Mar'
      }, {
        value: 'apr',
        label: 'April',
        shortLabel: 'Apr'
      }, {
        value: 'may',
        label: 'May',
        shortLabel: 'May'
      }, {
        value: 'jun',
        label: 'June',
        shortLabel: 'Jun'
      }, {
        value: 'jul',
        label: 'July',
        shortLabel: 'Jul'
      }, {
        value: 'aug',
        label: 'August',
        shortLabel: 'Aug'
      }, {
        value: 'sep',
        label: 'September',
        shortLabel: 'Sep'
      }, {
        value: 'oct',
        label: 'October',
        shortLabel: 'Oct'
      }, {
        value: 'nov',
        label: 'November',
        shortLabel: 'Nov'
      }, {
        value: 'dec',
        label: 'December',
        shortLabel: 'Dec'
      }
    ]
    return {
      isLoaded: false,
      sliderValue: [2040, 2060],
      activePeriod: months[0],
      months: months,
      variables: [],
      activeVariable: false,
      activeTime: '2030-2059',
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
          value: 'MAM',
          label: 'Spring'
        }, {
          value: 'JJAS',
          label: 'Summer'
        }, {
          value: 'OND',
          label: 'Autumn'
        }, {
          value: 'JF',
          label: 'Winter'
        }
      ],
      annual: {
        value: 'ann',
        label: 'Annual'
      }
    }
  },
  async created () {
    this.variables = [{
      name: 'cdd',
      label: 'Consecutive dry days',
      description: 'Maximum number of consecutive dry days',
      layerName: 'historical:Rainf_CDD',
      legendName: 'wfdei_CDD',
      startDate: 1984,
      endDate: 2013
    }, {
    //   name: 'Chirps',
    //   label: 'Precipitations',
    //   description: 'Climate Hazards group InfraRed Precipitation with Stations',
    //   layerName: 'historical:monthly_chirps_precip',
    //   legendName: 'chirps-20180101_1',
    //   startDate: 1984,
    //   endDate: 2013
    // }, {
    //   name: 'ERAI',
    //   label: '2 metres temperature',
    //   description: '2 metres temperature',
    //   layerName: 'historical:monthly_erai_tmean(2mt)',
    //   legendName: 'ERAI_tmean',
    //   startDate: 1987,
    //   endDate: 2016
    // }, {
    //   name: 'R95',
    //   label: 'Rainfall on days > 95th percentile',
    //   description: 'Total amount of rainfall in a year, occurring on days which exceed the 95th percentile of average rainfall',
    //   layerName: 'historical:Rainf_R95p',
    //   legendName: 'wfdei_R95p',
    //   startDate: 1984,
    //   endDate: 2013
    // }, {
    //   name: 'TX25',
    //   label: 'Days > 25°C',
    //   description: 'Number of days in a year exceeding 25°C, based on the WFDEI dataset',
    //   layerName: 'historical:Tair_TX25',
    //   legendName: 'wfdei_tx25',
    //   startDate: 1984,
    //   endDate: 2012
    // }, {
      name: 'tx30',
      label: 'Days > 30°C',
      description: 'Number of days in a year exceeding 30°C, based on the WFDEI dataset',
      layerName: 'historical:Tair_TX30',
      legendName: 'wfdei_tx30',
      startDate: 1984,
      endDate: 2012
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
