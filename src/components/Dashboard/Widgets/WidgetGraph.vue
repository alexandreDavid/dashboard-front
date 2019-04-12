<template>
  <div class="card-body p-0">
    <div class="d-flex flex-column widget-container">
      <div class="px-4 mt-2" v-if="isLoaded">
        <graph-range-slider v-model="selectedDates" :data="resource._availableTimes"></graph-range-slider>
      </div>
      <div class="w-100 position-relative" v-bind:style="{height: `${mapHeight}px`}">
        <Graph v-if="isLoaded" v-bind:parameter="resource" v-bind:graphType="graphType" :date-range="selectedDates"></Graph>
        <Loading v-else></Loading>
      </div>
      <div class="border-top mx-2 mt-1" v-if="config.description">
        <div class="widget-description px-3 py-1 mb-0">{{ config.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import GeoResources from '@/store/geoResources'
import AreaLayer from '@/store/areaLayer'
import SelectedLayer from '@/store/selectedLayer'
import Loading from '@/components/Loading/Loading'
import GraphRangeSlider from '@/components/Slider/GraphRangeSlider'

import { mapGetters } from 'vuex'

import HeightMixin from './HeightMixin'
import Time from '@/utils/time'

export default {
  name: 'WidgetGraph',
  mixins: [ HeightMixin ],
  components: {
    Graph: () => import('@/components/Graph/Graph'),
    Loading,
    GraphRangeSlider
  },
  props: [
    'config',
    'graphType'
  ],
  computed: mapGetters('areas', ['getArea']),
  data () {
    return {
      resource: false,
      areaLayer: false,
      isLoaded: false,
      selectedDates: []
    }
  },
  async mounted () {
    this.areaLayer = new AreaLayer()
    await this.areaLayer.setSelectedArea(this.getArea(this.config.area.id))
    this.resource = new SelectedLayer()
    await this.getData(this.config.resource)
    this.isLoaded = true
  },
  methods: {
    async getData (resource) {
      this.isLoaded = false
      await this.resource.setLayer(GeoResources.searchById(resource.id), this.areaLayer.toGeoJSON())
      this.selectedDates = [Time.getDefaultTime(this.resource._availableTimes), this.resource._availableTimes[this.resource._availableTimes.length - 1]]
      this.isLoaded = true
    },
    async setArea () {
      this.isLoaded = false
      await this.areaLayer.setSelectedArea(this.getArea(this.config.area.id))
      await this.resource.setArea(this.areaLayer.toGeoJSON())
      this.isLoaded = true
    }
  },
  watch: {
    'config.resource': 'getData',
    config: {
      handler (val) {
        this.setArea()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>

.graph-container-widget {
  height: 200px;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>
