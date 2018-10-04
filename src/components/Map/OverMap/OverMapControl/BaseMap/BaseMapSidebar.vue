<template>
  <SideBar @close="close()" position="bottom" title="Base map selection" class="p-0">
    <div class="h-100 d-flex" v-if="isLoaded">
      <div v-for="(baseMap, key) in availableBaseMaps" :key="key" class="card mx-2" @click="selectBaseMap(baseMap)" v-bind:class="{active: activeBaseMap === baseMap.url}">
        <div class="card-header"> {{ baseMap.label }}</div>
        <div class="card-body position-relative">
          <MiniMap :minimapKey="`basemap-${key}`" :areaLayer="areaLayer" :baseLayer="baseMap.url"></MiniMap>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </SideBar>
</template>

<script>
import SideBar from '@/components/SideBar/SideBar'
import MiniMap from '@/components/Map/MiniMap'
import AreaLayer from '@/store/areaLayer'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'BaseMapSidebar',
  components: { SideBar, MiniMap, Loading },
  inject: ['getMap'],
  data () {
    return {
      isLoaded: false,
      areaLayer: false,
      activeBaseMap: false,
      availableBaseMaps: [
        {
          label: 'Openstreetmap',
          url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }, {
          label: 'Mapnik map grayscale',
          url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
        }, {
          label: 'toner',
          url: 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png'
        }, {
          label: 'Nothing',
          url: ' '
        }
      ]
    }
  },
  async created () {
    this.areaLayer = new AreaLayer()
    await this.areaLayer.setSelectedArea({id: 7552})
    this.activeBaseMap = this.getMap().getBaseMapLayerUrl()
    this.isLoaded = true
  },
  methods: {
    close () {
      this.$emit('close')
    },
    selectBaseMap (baseMap) {
      this.activeBaseMap = baseMap.url
      this.getMap().setBaseMapLayer(baseMap.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  min-width: 250px;
  cursor: pointer;
  &.active {
    border: 1px solid var(--primary);

    .card-header {
      background-color: var(--primary);
      color: var(--white);
    }
  }
}
</style>
