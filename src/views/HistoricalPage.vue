<template>
  <div id="historical-page">
    <!-- <div class="d-flex h-50" v-if="isLoaded"> -->
    <div v-if="isLoaded" class="container mt-4">
      <div class="row mb-3">
        <div class="col-12">
          Annual total rainfall (mm/year) over Uganda, for the CHIRPS dataset.
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <SearchLocation @input="onSearchLocationSelected" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 mb-3">
          <div class="card p-3">
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
          <div class="card h-100" style="min-height: 300px">
            <div class="card-header">
              Climatology (1986 - 2015)
            </div>
            <div class="card-body position-relative">
              <div id="historical-map-container">
                <div class="over-map" v-if="mapIsLoaded">
                  <div class="over-map-bottom">
                    <Legend class="over-map-control" asline="true"></Legend>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <ul class="nav nav-tabs">
            <li class="nav-item" id="nav-item-actual">
              <a class="nav-link" href="#" @click="selectedTab = 'actual'" v-bind:class="{'active': selectedTab === 'actual'}">Actual</a>
            </li>
            <li class="nav-item" id="nav-item-anomaly">
              <a class="nav-link" href="#" @click="selectedTab = 'anomaly'" v-bind:class="{'active': selectedTab === 'anomaly'}">Anomaly</a>
            </li>
          </ul>
          <div class="tab-content pt-3">
            <div role="tabpanel" class="tab-pane fade" v-bind:class="{'active show': selectedTab === 'actual'}" id="actual">
              <HistoricalActualPage></HistoricalActualPage>
            </div>
            <div role="tabpanel" class="tab-pane fade" v-bind:class="{'active show': selectedTab === 'anomaly'}" id="anomaly">
              <HistoricalAnomalyPage v-bind:area="selectedArea" v-bind:parameter="parameter"></HistoricalAnomalyPage>
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

export default {
  name: 'HistoricalPage',
  components: {
    Loading,
    SearchLocation,
    HistoricalActualPage,
    HistoricalAnomalyPage,
    Legend
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
      actualMaps: [
        {
          title: '2015'
        }, {
          title: '2014'
        }, {
          title: '2013'
        }, {
          title: '2012'
        }, {
          title: '2011'
        }
      ]
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
    this.displayedLayer = new DisplayedLayer(this.map, {
      layerUrl: 'http://18.130.18.23:8180/geoserver/historical/ows',
      legendUrl: 'http://18.130.18.23:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=chirps_nv2.0-20051201',
      layerParameters: {
        layers: 'historical:MetOffice',
        format: 'image/png',
        transparent: true
      }
    })
    this.mapIsLoaded = true
  },
  methods: {
    onSearchLocationSelected (location) {
      this.selectedArea = location
      if (location) {
        this.areaLayer.setSelectedArea(location)
      }
    },
    onSelectVariable (selectedVariable) {
      this.activeVariable = selectedVariable.name
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
