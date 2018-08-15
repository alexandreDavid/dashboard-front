<template>
  <div id="historical-page">
    <div v-if="isLoaded" class="d-flex flex-column h-100">
      <div class="shadow py-2 flex-shrink-1 sticky-bar">
        <div class="d-flex flex-wrap">
          <div class="btn-group m-2" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary active">CMIP5</button>
            <button type="button" class="btn btn-primary">CORDEX</button>
            <button type="button" class="btn btn-primary">RQUMP</button>
          </div>
          <div class="btn-group m-2" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary active">Anomaly</button>
            <button type="button" class="btn btn-secondary">Model consensus</button>
          </div>
            <SearchLocation @input="onSearchLocationSelected" class="m-2"></SearchLocation>
        </div>
        <FutureClimateRangeSlider class="w-100 px-4"></FutureClimateRangeSlider>
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
            <div class="col-md-3 mb-3">
              <div class="card p-3 h-100">
                <div v-for="(variable, key) in variables" :key="key">
                  <h5>{{ variable.name }}</h5>
                  <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" v-for="(value, key) in variable.values" :key="key" @click="onSelectVariable(value)" v-bind:class="{ active: value.name === activeVariable }">
                      {{ value.name }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-9 mb-3">
              <div class="card h-100">
                <div class="card-header">
                  Models
                </div>
                <div class="card-body position-relative">
                  <div class="d-flex flex-wrap justify-content-center justify-content-md-start">
                    <div class="card h-100 m-2 model-card" v-for="(model, key) in models" :key="key" v-bind:class="{maximize: model.maximize}">
                      <div class="card-header">
                        <div class="d-flex align-items-center">
                          <div class="flex-grow-1">
                            <span class="w-100">{{ model.title }}</span>
                          </div>
                          <div>
                            <button type="button" v-if="model.maximize" class="btn btn-light btn-sm ml-2 edit" @click="minimizeModel(key)"><font-awesome-icon :icon="iconWindowRestore" /></button>
                            <button type="button" v-else class="btn btn-light btn-sm ml-2 edit" @click="maximizeModel(key)"><font-awesome-icon :icon="iconWindowMaximize" /></button>
                            </div>
                        </div>
                      </div>
                      <div class="card-body position-relative">
                        <MiniMap :minimapKey="key"></MiniMap>
                      </div>
                    </div>
                    <div class="card h-100 m-2" style="min-height: 165px; min-width: 180px; border-style: dashed; border-width: 4px;">
                      <div class="m-auto text-center" style="opacity: 0.125">
                        <div class="font-weight-bold">Add a model</div>
                        <font-awesome-icon :icon="iconPlus" class="fa-3x"></font-awesome-icon>
                      </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              The plot below shows the range of projected future changes for this location across 10 different statistically downscaled CMIP5 GCMs for two different RCP pathways (RCP 4.5 and RCP 8.5). Anomalies are currently calculated relative the historical period 1980 - 2000. The solid bars represent the range between the middle 80% of projected change and so excludes the upper and lower 10% as these are often considered to be outliers. However, the grey lines show the projected change for each model so it is possible to see how individual models (intentionally not named) project the future changes.
            </div>
          </div>
          <div class="btn-group m-2" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary active">Annual</button>
            <button type="button" class="btn btn-secondary">Seasonal</button>
            <button type="button" class="btn btn-secondary">Months</button>
          </div>
          <div class="row">
            <div class="col-12">
              <HistoricalAnomalyPage v-bind:area="selectedArea" v-bind:parameter="parameter"></HistoricalAnomalyPage>
              <!-- <ul class="nav nav-tabs">
                <li class="nav-item" id="nav-item-actual">
                  <a class="nav-link" href="#" @click="selectedTab = 'actual'" v-bind:class="{'active': selectedTab === 'actual'}">Actual</a>
                </li>
                <li class="nav-item" id="nav-item-anomaly">
                  <a class="nav-link" href="#" @click="selectedTab = 'anomaly'" v-bind:class="{'active': selectedTab === 'anomaly'}">Anomaly</a>
                </li>
              </ul>
              <div class="tab-content pt-3">
                <div role="tabpanel" class="tab-pane fade" v-bind:class="{'active show': selectedTab === 'actual'}" id="actual">
                  <div class="position-relative" style="min-height: 300px">
                    <div id="historical-map-container">
                      <div class="over-map">
                        <div class="over-map-right over-map-control">
                          <Legend class="over-map-control" v-if="parameter.interactiveLegend"></Legend>
                          <img v-bind:src="parameter.legendUrl" v-else>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div role="tabpanel" class="tab-pane fade" v-bind:class="{'active show': selectedTab === 'anomaly'}" id="anomaly"> -->
                  <!-- <HistoricalAnomalyPage v-bind:area="selectedArea" v-bind:parameter="parameter"></HistoricalAnomalyPage>
                </div>
              </div> -->
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
import MapObj from '@/store/map'
import HistoricalActualPage from '@/views/HistoricalActualPage'
import HistoricalAnomalyPage from '@/views/HistoricalAnomalyPage'
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import AreaLayer from '@/store/areaLayer'
import Parameter from '@/store/parameter'
import DisplayedLayer from '@/store/displayedLayer'
import Area from '@/store/area.js'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import FutureClimateRangeSlider from '@/components/Slider/FutureClimateRangeSlider'
import MiniMap from '@/components/Map/MiniMap'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import { faWindowMaximize, faWindowRestore } from '@fortawesome/free-regular-svg-icons'

export default {
  name: 'FutureClimatePage',
  components: {
    Loading,
    SearchLocation,
    HistoricalActualPage,
    HistoricalAnomalyPage,
    Legend,
    FutureClimateRangeSlider,
    MiniMap,
    FontAwesomeIcon
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
      selectedTab: 'actual',
      map: false,
      selectedArea: Area.getSelectedArea(),
      parameter: Parameter.getDisplayedParameter(),
      areaLayer: false,
      variables: [],
      activeVariable: false,
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
      ]
    }
  },
  computed: {
    iconPlus () {
      return faPlus
    },
    iconWindowMaximize () {
      return faWindowMaximize
    },
    iconWindowRestore () {
      return faWindowRestore
    }
  },
  async created () {
    this.variables = [{
      name: 'Monthly',
      values: [
        {
          name: 'Temp'
        }, {
          name: 'Precip'
        }
      ]
    }, {
      name: 'Daily',
      values: [
        {
          name: 'TX30'
        }, {
          name: 'R95p'
        }, {
          name: 'CDD'
        }, {
          name: 'ONSET'
        }
      ]
    }]
    this.isLoaded = true
  },
  mounted () {
    this.map = new MapObj('historical-map-container')
    this.areaLayer = new AreaLayer(this.map)
    this.displayedLayer = new DisplayedLayer(this.map, this.parameter)
  },
  methods: {
    onSearchLocationSelected (location) {
      this.selectedArea = location
      if (location) {
        this.areaLayer.setSelectedArea(location)
      }
    },
    onSelectVariable (selectedVariable) {
      console.log(selectedVariable)
      this.activeVariable = selectedVariable.name
    },
    getMap () {
      return this.map
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

.model-card {
  min-height: 165px;
  width: 180px;

  &.maximize {
    min-height: 300px;
    width: 300px;
  }
}
</style>
