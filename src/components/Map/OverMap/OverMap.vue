<template>
  <div class="over-map">
    <MapControlBar v-if="showSidebar" @selectedReportedLayer="onSelectedReportedLayer" @selectedParameter="onSelectedParameter" @close="showSidebar = false" class="position-relative over-map-left p-0">
    </MapControlBar>
    <div class="over-map-bottom d-flex align-items-end">
      <div class=" mr-1 w-100 over-map-control">
        <displayed-layer-time-control class="d-inline-block align-bottom" v-bind:parameter="selectedParameter" v-if="selectedParameter"></displayed-layer-time-control>
      </div>
      <bar-control class="flex-shrink-1 d-none d-sm-inline-flex over-map-control" @openBaseMapControl="showBaseMapSidebar = true">
      </bar-control>
    </div>
    <div class="over-map-left d-flex d-sm-none flex-nowrap">
      <div class="flex-grow-1 over-map-control mr-2">
        <SearchLocation class="shadow" v-model="selectedArea" @input="onSearchLocationSelected" @locate="zoomToArea" />
      </div>
      <div class="d-block d-sm-none over-map-control">
        <button type="button" @click="showSidebar = true" class="btn btn-primary d-inline-block d-sm-none align-top shadow"><font-awesome-icon icon="bars" /></button>
      </div>
    </div>
    <base-map-sidebar class="over-map-bottom over-map-control" v-if="showBaseMapSidebar" @close="showBaseMapSidebar = false">
    </base-map-sidebar>
  </div>
</template>

<script>
import Area from '@/store/area'
import BarControl from './OverMapControl/BarControl/BarControl'
import DisplayedLayerTimeControl from '@/components/Map/DisplayedLayer/DisplayedLayerTimeControl'

import SearchLocation from '@/components/SearchLocation/SearchLocation'

export default {
  name: 'OverMap',
  components: {
    MapControlBar: () => import('@/components/Map/MapControlBar'),
    BaseMapSidebar: () => import('@/components/Map/OverMap/OverMapControl/BaseMap/BaseMapSidebar'),
    BarControl,
    DisplayedLayerTimeControl,
    SearchLocation
  },
  inject: ['getMap', 'getDisplayedLayer', 'getAreaLayer'],
  props: ['selectedParameter'],
  data () {
    return {
      showSidebar: false,
      showBaseMapSidebar: false,
      displayAreaSelectionModal: false,
      selectedArea: false,
      test: false
    }
  },
  mounted () {
    this.selectedArea = Area.getSelectedArea()
  },
  methods: {
    onSearchLocationSelected (newValue) {
      Area.setSelectedArea(newValue)
      this.getAreaLayer().setSelectedArea(newValue)
    },
    onSelectedReportedLayer (selectedReportedLayer) {
      this.$emit('selectedReportedLayer', selectedReportedLayer)
    },
    onSelectedParameter (selectedParameter) {
      this.$emit('selectedParameter', selectedParameter)
    },
    zoomToArea () {
      this.getAreaLayer().zoomToArea()
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
