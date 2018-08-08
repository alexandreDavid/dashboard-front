<template>
  <div>
    <div class="btn-group m-2" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary active">Annual</button>
      <button type="button" class="btn btn-secondary">Seasonal</button>
    </div>
    <div class="d-flex flex-wrap justify-content-center justify-content-md-start">
      <div class="card h-100 m-2" style="min-height: 165px; min-width: 150px;" v-for="(actualMap, key) in actualMaps" :key="key">
        <div class="card-header">
          {{ actualMap.title }}
        </div>
        <div class="card-body position-relative">
          <MiniMap :minimapKey="key"></MiniMap>
        </div>
      </div>
      <div class="card h-100 m-2" style="min-height: 165px; min-width: 150px; border-style: dashed; border-width: 4px;"><font-awesome-icon :icon="iconPlus" class="fa-3x m-auto" style="opacity: 0.125" /></div>
    </div>
  </div>
</template>

<script>
import MiniMap from '@/components/Map/MiniMap'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

export default {
  name: 'HistoricalActualPage',
  components: {
    MiniMap,
    FontAwesomeIcon
  },
  computed: {
    iconPlus () {
      return faPlus
    }
  },
  data () {
    return {
      isLoaded: false,
      selectedTab: 'actual',
      map: false,
      variables: [],
      activeVariable: false,
      displayedInfo: false,
      actualMaps: [
        {
          title: '2015',
          desc: 'test'
        }, {
          title: '2014'
        }, {
          title: '2013'
        }, {
          title: '2012'
        }, {
          title: '2011'
        }
      ]
    }
  },
  methods: {
    onSearchLocationSelected (location) {
      console.log(location)
    },
    onSelectVariable (selectedVariable) {
      console.log(selectedVariable)
      this.activeVariable = selectedVariable.name
    },
    displayInfos (value) {
      this.displayedInfo = value.name
    }
  }
}
</script>
