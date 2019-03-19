<template>
  <div class="over-map">
    <MapControlBar v-if="showSidebar" @selectedReportedLayer="onSelectedReportedLayer" @selectedParameter="onSelectedParameter" @close="showSidebar = false" class="position-relative over-map-left">
    </MapControlBar>
    <div class="over-map-bottom-right">
      <bar-control class="flex-shrink-1 d-none d-sm-inline-flex over-map-control" @openBaseMapControl="showBaseMapSidebar = true">
      </bar-control>
    </div>
    <div class="over-map-left d-flex d-sm-none flex-row-reverse flex-nowrap p-2">
      <div class="d-block d-sm-none over-map-control">
        <button type="button" @click="showSidebar = true" title="Manage map" class="btn btn-primary d-inline-block d-sm-none align-top shadow"><font-awesome-icon icon="bars" /></button>
      </div>
      <div class="flex-grow-1 over-map-control mr-2">
        <area-selection-control class="shadow" v-model="selectedArea" @input="onAreaChange"></area-selection-control>
      </div>
    </div>
    <base-map-sidebar class="over-map-bottom over-map-control" v-if="showBaseMapSidebar" @close="showBaseMapSidebar = false">
    </base-map-sidebar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BarControl from './OverMapControl/BarControl/BarControl'
import AreaSelectionControl from '@/components/Area/AreaSelectionControl'

import SelectedLayers from '@/store/selectedLayers'

export default {
  name: 'OverMap',
  components: {
    MapControlBar: () => import('@/components/Map/MapControlBar'),
    BaseMapSidebar: () => import('@/components/BaseMap/BaseMapSidebar'),
    BarControl,
    AreaSelectionControl
  },
  inject: ['getAreaLayer'],
  computed: mapGetters('areas', ['activeArea']),
  data () {
    return {
      showSidebar: false,
      showBaseMapSidebar: false,
      selectedArea: false
    }
  },
  mounted () {
    this.selectedArea = this.activeArea
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
