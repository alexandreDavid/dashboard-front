<template>
  <div class="d-flex flex-wrap justify-content-center justify-content-md-start">
    <div class="card h-100 m-2" v-for="(miniMap, key) in allMiniMaps" :key="key" @click="selectYear(miniMap)" v-bind:class="{active: activeMiniMap === miniMap.title}">
      <div class="card-header">
        {{ miniMap.title }}
      </div>
      <div class="card-body position-relative">
        <MiniMap :minimapKey="key" v-bind:parameter="miniMap.param" v-bind:areaLayer="areaLayer"></MiniMap>
      </div>
    </div>
    <div v-show="displayAddYearsButton" class="card h-100 m-2 add-years" @click="displayNextYears">
      <div class="m-auto text-center">
        <div class="font-weight-bold">Add next years</div>
        <font-awesome-icon icon="plus" class="fa-3x"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
import MiniMap from '@/components/Map/MiniMap'

export default {
  name: 'HistoricalActualPage',
  components: {
    MiniMap
  },
  props: {
    variable: {
      required: true
    },
    period: {
      required: true
    },
    areaLayer: {
      required: true
    }
  },
  data () {
    return {
      allMiniMaps: [],
      variables: [],
      activeMiniMap: false,
      lastDisplayedYear: false,
      displayAddYearsButton: true
    }
  },
  mounted () {
    this.lastDisplayedYear = this.variable.endDate
    this.displayNextYears()
    this.activeMiniMap = this.allMiniMaps[0].title
  },
  methods: {
    displayNextYears () {
      for (let i = 0; i < 5; i++) {
        if (this.lastDisplayedYear >= this.variable.startDate) {
          this.allMiniMaps.push({
            title: this.lastDisplayedYear,
            param: {
              layerUrl: `${process.env.GEOSERVER_URL}/wms`,
              layerParameters: {
                layers: this.variable.layer,
                format: 'image/png',
                transparent: true,
                time: this.lastDisplayedYear
              }
            }
          })
          this.lastDisplayedYear--
        } else {
          this.displayAddYearsButton = false
        }
      }
    },
    selectYear (miniMap) {
      this.activeMiniMap = miniMap.title
      this.$emit('change', miniMap.title)
    }
  },
  watch: {
    variable () {
      this.allMiniMaps = []
      this.displayAddYearsButton = true
      this.lastDisplayedYear = this.variable.endDate
      this.displayNextYears()
      this.activeMiniMap = this.allMiniMaps[0].title
    },
    period (period, oldPeriod) {
      this.allMiniMaps.forEach(m => {
        if (period.value < 13) {
          m.param.layerParameters.time = `${m.title}-${period.value}`
        } else {
          m.param.layerParameters.time = `${m.title}`
        }
        if (period.type !== oldPeriod.type || period.type !== 'month') {
          m.param.layerParameters.layers = this.variable.layer
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  min-height: 200px;
  min-width: 200px;
  &.active {
    border: 1px solid var(--primary);

    .card-header {
      background-color: var(--primary);
      color: var(--white);
    }
  }
  &.add-years {
    border: 4px dashed var(--dark);
    opacity: 0.125;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
}
</style>
