<template>
  <div class="over-map">
    <MapControlBar v-if="showSidebar" @selectedReportedLayer="onSelectedReportedLayer" @selectedParameter="onSelectedParameter" @close="showSidebar = false" class="position-relative over-map-left">
    </MapControlBar>
    <div class="over-map-bottom d-flex align-items-end">
      <div class=" mr-1 w-100 over-map-control">
        <displayed-layer-time-control class="d-inline-block align-bottom" v-bind:parameter="selectedParameter" v-if="selectedParameter"></displayed-layer-time-control>
      </div>
      <bar-control class="flex-shrink-1 d-none d-sm-inline-flex over-map-control" @openBaseMapControl="showBaseMapSidebar = true">
      </bar-control>
    </div>
    <div class="over-map-left d-flex d-sm-none flex-row-reverse flex-nowrap p-2">
      <div class="d-block d-sm-none over-map-control">
        <button type="button" @click="showSidebar = true" class="btn btn-primary d-inline-block d-sm-none align-top shadow"><font-awesome-icon icon="bars" /></button>
      </div>
      <div class="flex-grow-1 over-map-control mr-2">
        <area-selection-control class="shadow" @change="onAreaChange"></area-selection-control>
      </div>
    </div>
    <base-map-sidebar class="over-map-bottom over-map-control" v-if="showBaseMapSidebar" @close="showBaseMapSidebar = false">
    </base-map-sidebar>
  </div>
</template>

<script>
import BarControl from './OverMapControl/BarControl/BarControl'
import DisplayedLayerTimeControl from '@/components/Map/DisplayedLayer/DisplayedLayerTimeControl'

import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import SelectedLayers from '@/store/selectedLayers'

export default {
  name: 'OverMap',
  components: {
    MapControlBar: () => import('@/components/Map/MapControlBar'),
    BaseMapSidebar: () => import('@/components/Map/OverMap/OverMapControl/BaseMap/BaseMapSidebar'),
    BarControl,
    DisplayedLayerTimeControl,
    AreaSelectionControl
  },
  inject: ['getAreaLayer'],
  props: ['selectedParameter'],
  data () {
    return {
      showSidebar: false,
      showBaseMapSidebar: false
    }
  },
  methods: {
    async onAreaChange (area) {
      await this.getAreaLayer().setSelectedArea(area)
      SelectedLayers.updateArea(this.getAreaLayer().toGeoJSON())
    },
    onSelectedReportedLayer (selectedReportedLayer) {
      this.$emit('selectedReportedLayer', selectedReportedLayer)
    },
    onSelectedParameter (selectedParameter) {
      this.$emit('selectedParameter', selectedParameter)
    }
  }
}
</script>
