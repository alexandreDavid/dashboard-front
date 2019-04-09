<template>
  <div class="card-body p-0 position-relative">
    <div class="graph-container-widget" v-bind:style="{height: `${mapHeight}px`}">
      <Graph v-if="isLoaded" v-bind:parameter="resource" v-bind:graphType="graphType" :start-date="startDate" :end-date="endDate"></Graph>
      <Loading v-else></Loading>
    </div>
    <div class="border-top mx-2 mt-1" v-if="config.description">
      <div class="widget-description px-3 py-1 mb-0">{{ config.description }}</div>
    </div>
  </div>
</template>

<script>
import GeoResources from '@/store/geoResources'
import AreaLayer from '@/store/areaLayer'
import SelectedLayer from '@/store/selectedLayer'
import Loading from '@/components/Loading/Loading'

import { mapGetters } from 'vuex'

import HeightMixin from './HeightMixin'

export default {
  name: 'WidgetGraph',
  mixins: [ HeightMixin ],
  components: {
    Graph: () => import('@/components/Graph/Graph'),
    Loading
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
      startDate: false,
      endDate: false
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
      this.setDates()
      this.isLoaded = true
    },
    async setArea () {
      this.isLoaded = false
      await this.areaLayer.setSelectedArea(this.getArea(this.config.area.id))
      await this.resource.setArea(this.areaLayer.toGeoJSON())
      this.isLoaded = true
    },
    setDates () {
      const allTimes = this.resource._availableTimes
      if (this.config.startDate && this.config.endDate && allTimes.includes(this.config.startDate) && allTimes.includes(this.config.endDate)) {
        this.startDate = this.config.startDate
        this.endDate = this.config.endDate
      } else {
        let {0: startDate, [allTimes.length - 1]: endDate} = allTimes
        this.startDate = startDate
        this.endDate = endDate
      }
    }
  },
  watch: {
    'config.resource': 'getData',
    config: {
      handler (val) {
        this.setArea()
        this.setDates()
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
