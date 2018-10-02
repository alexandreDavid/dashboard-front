<template>
  <div class="over-map">
    <div class="over-map-bottom d-flex align-items-end">
      <ZoomControl class="flex-shrink-1 d-none d-sm-inline-flex mr-1 over-map-control">
      </ZoomControl>
      <button type="button" id="reset-map" class="btn btn-primary align-bottom d-none d-sm-block shadow flex-shrink-1 mr-4 ml-1 over-map-control" @click="resetMap"><font-awesome-icon icon="undo" /></button>
      <div class="mx-1 w-100 over-map-control">
        <TimeSerie class="d-inline-block align-bottom" v-if="selectedParameter && selectedParameter.hasTimeFrame"/>
      </div>
    </div>
    <div class="over-map-left">
      <div class="d-flex flex-nowrap position-relative">
        <div class="p-1 flex-grow-1 over-map-control">
          <area-selection-control @input="onSearchLocationSelected" v-model="selectedArea" @openSelectionModal="displayAreaSelectionModal = true" class="shadow"></area-selection-control>
        </div>
        <div class="p-1 over-map-control">
          <button type="button" id="zoom-current-location" class="btn btn-primary align-top shadow" @click="zoomToCurrentLocation()" v-if="hasCurrentLocation"><font-awesome-icon icon="location-arrow" /></button>
        </div>
        <div class="p-1 d-block d-sm-none over-map-control">
          <button type="button" @click="showSidebar = true" class="btn btn-primary d-inline-block d-sm-none align-top shadow"><font-awesome-icon icon="bars" /></button>
          <SideBar v-if="showSidebar" @close="showSidebar = false" position="right" class="p-2">
            <Managing @selectedParameter="onSelectedParameter" @selectedReportedParameter="onSelectedReportedParameter"></Managing>
          </SideBar>
        </div>
      </div>
    </div>
    <div class="over-map-right d-none d-sm-block">
      <Managing @selectedParameter="onSelectedParameter" @selectedReportedParameter="onSelectedReportedParameter"></Managing>
    </div>
    <area-selection-modal v-if="displayAreaSelectionModal" v-model="selectedArea" @input="onSearchLocationSelected" @close="displayAreaSelectionModal = false"></area-selection-modal>
  </div>
</template>

<script>
import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import AreaSelectionModal from '@/components/Area/AreaSelectionModal'
import Managing from './OverMapControl/Managing/Managing'
import AreaLayer from '@/store/areaLayer'

import Parameter from '@/store/parameter'
import Area from '@/store/area'
import ZoomControl from './OverMapControl/ZoomControl/ZoomControl'
import TimeSerie from './OverMapControl/TimeSerie/TimeSerie'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'

export default {
  name: 'OverMap',
  components: {
    AreaSelectionControl,
    AreaSelectionModal,
    Managing,
    SideBar: () => import('@/components/SideBar/SideBar'),
    ZoomControl,
    TimeSerie,
    Legend
  },
  inject: ['getMap', 'getDisplayedLayer'],
  async created () {
    this.hasCurrentLocation = await this.getMap().setCurrentLocationLayer()
  },
  data () {
    return {
      hasCurrentLocation: false,
      showSidebar: false,
      displayAreaSelectionModal: false,
      selectedArea: false,
      selectedParameter: {},
      areaLayer: false
    }
  },
  mounted () {
    this.selectedArea = Area.getSelectedArea()
    this.areaLayer = new AreaLayer(this.getMap(), this.selectedArea)
    this.onSelectedParameter(Parameter.getDisplayedParameter())
  },
  methods: {
    onSearchLocationSelected (newValue) {
      if (newValue) {
        Area.setSelectedArea(newValue)
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
      this.selectedParameter = false
      let vm = this
      this.$nextTick(function () {
        vm.selectedParameter = selectedParameter
      })
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
