<template>
  <div class="over-map">
    <div class="over-map-bottom d-block d-sm-none p-0 over-map-control">
      <TimeSlotMobile class="p-2" v-if="selectedParameter && selectedParameter.hasTimeFrame"/>
      <Legend class="over-map-control" asline="true"></Legend>
    </div>
    <div class="over-map-left">
      <div class="d-flex flex-nowrap position-relative">
        <div class="p-1 flex-grow-1 over-map-control"><SearchLocation @input="onSearchLocationSelected" v-bind:class="{shadow: !searchLocationResult}"></SearchLocation></div>
        <div class="p-1 over-map-control">
          <button type="button" id="zoom-current-location" class="btn btn-primary align-top" v-bind:class="{shadow: !searchLocationResult}" @click="zoomToCurrentLocation()" v-if="hasCurrentLocation"><font-awesome-icon :icon="iconLocate" /></button>
        </div>
        <div class="p-1 d-block d-sm-none over-map-control">
          <button type="button" @click="showSidebar = true" class="btn btn-primary d-inline-block d-sm-none align-top" v-bind:class="{shadow: !searchLocationResult}"><font-awesome-icon :icon="iconMenu" /></button>
          <SideBar v-if="showSidebar" @close="showSidebar = false" position="right" class="p-2">
            <button @click="$router.push({ name: 'settings' })" class="btn btn-secondary mb-2"><font-awesome-icon :icon="iconSettings" /> Settings</button>
            <div class="card">
              <h5 class="card-header">Forecast model parameters</h5>
              <div class="card-body">
                <ForecastSelection @selectedParameter="onSelectedParameter"></ForecastSelection>
              </div>
            </div>
          </SideBar>
        </div>
      </div>
    </div>
    <div class="over-map-right d-none d-sm-block">
      <Managing @selectedParameter="onSelectedParameter" @selectedReportedParameter="onSelectedReportedParameter"></Managing>
    </div>
    <div class="over-map-bottom d-none d-sm-flex align-items-end">
      <ZoomControl class="flex-shrink-1 mr-1 over-map-control">
      </ZoomControl>
      <button type="button" id="reset-map" class="btn btn-primary align-bottom shadow flex-shrink-1 mr-1 ml-1 over-map-control" @click="resetMap"><font-awesome-icon :icon="iconUndo" /></button>
      <div class="ml-1 w-100 over-map-control">
        <TimeSlot class="d-inline-block align-bottom pl-4" v-if="selectedParameter && selectedParameter.hasTimeFrame"/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchLocation from '@/components/SearchLocation/SearchLocation'
import Managing from './OverMapControl/Managing/Managing'
import AreaLayer from '@/store/areaLayer'
import ForecastSelection from './OverMapControl/Managing/ForecastSelection/ForecastSelection'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faLocationArrow from '@fortawesome/fontawesome-free-solid/faLocationArrow'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faCog from '@fortawesome/fontawesome-free-solid/faCog'

import Parameter from '@/store/parameter'
import Area from '@/store/area'
import ZoomControl from './OverMapControl/ZoomControl/ZoomControl'
import TimeSlot from './OverMapControl/TimeSlot/TimeSlot'
import TimeSlotMobile from './OverMapControl/TimeSlot/TimeSlotMobile'
import faUndo from '@fortawesome/fontawesome-free-solid/faUndo'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'

export default {
  name: 'OverMap',
  components: {
    SearchLocation,
    Managing,
    FontAwesomeIcon,
    SideBar: () => import('@/components/SideBar/SideBar'),
    ForecastSelection,
    ZoomControl,
    TimeSlot,
    TimeSlotMobile,
    Legend
  },
  computed: {
    iconLocate () {
      return faLocationArrow
    },
    iconMenu () {
      return faBars
    },
    iconSettings () {
      return faCog
    },
    iconUndo () {
      return faUndo
    }
  },
  inject: ['getMap', 'getDisplayedLayer'],
  async created () {
    this.hasCurrentLocation = await this.getMap().setCurrentLocationLayer()
  },
  data () {
    return {
      searchLocationResult: '',
      hasCurrentLocation: false,
      showSidebar: false,
      selectedArea: {},
      selectedParameter: {},
      areaLayer: false
    }
  },
  mounted () {
    this.areaLayer = new AreaLayer(this.getMap(), Area.getSelectedArea())
    this.onSelectedParameter(Parameter.getDisplayedParameter())
  },
  methods: {
    onSearchLocationSelected (newValue) {
      this.searchLocationResult = newValue
      if (newValue) {
        this.areaLayer.setSelectedArea(newValue)
      }
    },
    zoomToCurrentLocation () {
      this.getMap().zoomToCurrentLocation()
    },
    resetMap () {
      this.getMap().setDefaultMap()
    },
    onSelectedParameter (selectedParameter) {
      if (selectedParameter) {
        this.selectedParameter = selectedParameter
        this.getDisplayedLayer().setDisplayedLayer(selectedParameter)
      }
    },
    onSelectedReportedParameter (selectedReportedParameter) {
      this.$emit('selectedReportedLayer', selectedReportedParameter)
    }
  }
}
</script>

<style lang="scss" scoped>
#bottom-content {
  width: 100%;
  bottom: 0;

  .over-map-left {
    padding: 10px;
    left: 0;
    bottom: 0;
    position: absolute;
  }

  .over-map-right {
    margin-bottom: 10px;
    margin-right: 10px;
    right: 0;
    bottom: 0;
    position: absolute;
  }
}

</style>
