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
              <option v-for="timePeriod in timePeriods" :key="timePeriod.id" :value="timePeriod">{{ timePeriod.label }}</option>
            </select>
          </div>
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
          <div class="row mt-3 col-12">{{ label }}</div>
          <div class="row mt-3">
            <div class="col-md-4 mb-3">
              <div class="card p-3 h-100">
                <h6>Months</h6>
                <div class="mb-1 d-flex flex-wrap">
                  <div v-for="(month, key) in timePeriodTypeFilter(timePeriods, 'month')" :key="key" class="p-1" style="min-width: 80px">
                    <button type="button" class="btn btn-sm btn-secondary w-100" @click="activeTimePeriod = month" v-bind:class="{active: activeTimePeriod.id === month.id}">{{ month.shortLabel }}</button>
                  </div>
                </div>
                <h6>Seasons</h6>
                <div class="mb-1 d-flex flex-wrap">
                  <div v-for="(season, key) in timePeriodTypeFilter(timePeriods, 'season')" :key="key" class="p-1" style="min-width: 80px">
                    <button type="button" class="btn btn-sm btn-secondary w-100" @click="activeTimePeriod = season" v-bind:class="{active: activeTimePeriod.id === season.id}">{{ season.label }}</button>
                  </div>
                </div>
                <h6>Annual</h6>
                <div class="mb-1 d-flex flex-wrap">
                  <div v-for="(annual, key) in timePeriodTypeFilter(timePeriods, 'annual')" :key="key" class="p-1" style="min-width: 80px">
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
              The plots show projected future changes for Uganda across two sets of climate models: CMIP5 and CORDEX. The data are presented as anomalies; that is, the change from the baseline period (1971-2000) to the two future periods (2030-2059 and 2070-2099). The socio-economic scenarios are known as RCPs, and this data uses only RCP8.5, a high-emission or low-regulation scenario.
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div id="future-climate-graph-container">
                <FutureClimateGraph></FutureClimateGraph>
              </div>
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
import config from '@/store/futureClimateConfiguration'
import FutureClimateRangeSlider from '@/components/Slider/FutureClimateRangeSlider'

export default {
  name: 'FutureClimatePage',
  components: {
    Loading,
    FutureClimateModels,
    FutureClimateRangeSlider,
    FutureClimateGraph: () => ({
      component: import('./FutureClimateGraph')
    })
  },
  data () {
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
      activeTimePeriod: false,
      timePeriods: [],
      variables: [],
      activeVariable: false,
      periods: periods,
      activePeriod: periods[0],
      label: false
    }
  },
  async created () {
    this.variables = [{
      name: 'CDD_anom',
      label: 'Consecutive Dry Days Anomaly',
      description: 'For the maximum number of consecutive days with less than 1mm of precipitation in a {year, season or month}*, the change in the future (2030-2059 or 2070-2099) compared with the baseline period (1971-2000).',
      styleName: 'CCSM4'
    }, {
      name: 'TX30',
      label: 'Days > 30°C',
      description: 'For the average number of days that exceed 30oC per {year, season or month}*, the change in the future (2030-2059 or 2070-2099) compared with the baseline period (1971-2000). A dry spells is a minimum of fourteen consecutive days with less than 1mm of precipitation.',
      styleName: 'CCSM4_tx30anom'
    }, {
      name: 'dry_spells',
      label: 'Dry Spells Anomaly',
      description: 'For the average number of dry spells per {year, season or month}*, the change in the future (2030-2059 or 2070-2099) compared with the baseline period (1971-2000). A dry spells is a minimum of fourteen consecutive days with less than 1mm of precipitation.',
      styleName: 'CCSM4_dsanom'
    }, {
      name: 'precipitation',
      label: 'Precipitation Anomaly',
      description: 'For average daily rainfall in mm per day, the change in the future (2030-2059 or 2070-2099) compared with the baseline period (1971-2000).',
      styleName: 'CCSM4_dsanom'
    }, {
      name: 'R95p',
      label: 'Rainfall on days > 95th percentile',
      description: 'Projected future change in percentage of days where daily rainfall exceeds 95th percentile of baseline period (1971-2000).',
      styleName: 'CCSM4_dsanom'
    }, {
      name: 'temperature',
      label: 'Temperature Anomaly',
      description: 'For mean daily temperature at the surface in oC, the change in the future (2030-2059 or 2070-2099) compared with the baseline period (1971-2000).',
      styleName: 'CCSM4_dsanom'
    }]
    this.activeVariable = this.variables[0]
    this.timePeriods = config.getAllTimePeriods()
    this.activeTimePeriod = this.timePeriods[0]
    this.isLoaded = true
  },
  methods: {
    setLabel () {
      let desc = this.activeVariable.description
      if (this.activeTimePeriod.type === 'month') {
        desc = desc.replace('{year, season or month}*', 'month')
      } else if (this.activeTimePeriod.type === 'season') {
        desc = desc.replace('{year, season or month}*', 'season')
      } else {
        desc = desc.replace('{year, season or month}*', 'year')
      }
      this.label = desc
    },
    timePeriodTypeFilter: function (timePeriods, type) {
      return timePeriods.filter(t => t.type === type)
    }
  },
  watch: {
    activeVariable: 'setLabel',
    activeTimePeriod: 'setLabel'
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
  z-index: 1019;
}

#future-climate-graph-container {
  height: 400px;
  position: relative;
}
</style>
