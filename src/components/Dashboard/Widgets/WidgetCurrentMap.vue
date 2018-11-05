<template>
  <div>
    <div :id="mapId" class="map-container-widget">
      <!-- <Popup v-if="isLoaded"/> -->
    </div>
    <div class="over-map">
      <div class="over-map-right over-map-control">
        <!-- <Legend class="over-map-control" v-if="isLoaded" :layer="displayedLayer"></Legend> -->
      </div>
    </div>
  </div>
</template>

<script>
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import Popup from '@/components/Map/Popup'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import SelectedLayers from '@/store/selectedLayers'

export default {
  name: 'WidgetCurrentMap',
  components: {
    Popup, Legend
  },
  props: [
    'area',
    'widgetKey'
  ],
  data () {
    return {
      isLoaded: false,
      map: false,
      allLayers: false,
      areaLayer: false
    }
  },
  computed: {
    mapId () {
      return `map-container-widget${this.widgetKey}`
    }
  },
  provide () {
    return {
      getMap: this.getMap
    }
  },
  mounted () {
    this.map = new MapObj(this.mapId)
    this.areaLayer = new AreaLayer(this.map, this.area)
    SelectedLayers.getAllSelectedLayers().forEach(l => l.addTo(this.map))
    this.isLoaded = true
  },
  watch: {
    area (newArea) {
      this.areaLayer.setSelectedArea(newArea)
    }
  },
  methods: {
    getMap () {
      return this.map
    }
  },
  destroyed () {
    this.map.remove()
  }
}
</script>

<style lang="scss" scoped>
.map-container-widget {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
