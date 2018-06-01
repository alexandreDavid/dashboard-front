<template>
  <div id="bottom-content" class="over-map">
    <div class="over-map-left d-none d-sm-block">
      <ZoomControl/>
      <button type="button" class="btn btn-primary align-bottom shadow" @click="resetMap"><font-awesome-icon :icon="iconUndo" /></button>
      <button type="button" class="btn btn-primary align-bottom shadow" @click="initModal()"><font-awesome-icon :icon="iconGraph" /></button>
      <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">Graph</h3>
        <div slot="body"><Graph v-bind:area="selectedArea" v-bind:parameter="selectedParameter"></Graph></div>
      </modal>
      <TimeSlot class="d-inline-block align-bottom"/>
    </div>
  </div>
</template>

<script>
import MapObj from '@/store/map'
import Parameter from '@/store/parameter'
import Area from '@/store/area'
import ZoomControl from './ZoomControl/ZoomControl'
import TimeSlot from './TimeSlot/TimeSlot'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faChartBar from '@fortawesome/fontawesome-free-solid/faChartBar'
import faUndo from '@fortawesome/fontawesome-free-solid/faUndo'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'BottomContent',
  components: {
    FontAwesomeIcon,
    ZoomControl,
    TimeSlot,
    Graph: () => ({
      component: import('@/components/Graph/Graph'),
      loading: Loading,
      delay: 0
    })
  },
  data() {
    return {
      showModal: false,
      selectedArea: {},
      selectedParameter: {}
    }
  },
  computed: {
    iconGraph () {
      return faChartBar
    },
    iconUndo () {
      return faUndo
    }
  },
  methods: {
    resetMap () {
      MapObj.setDefaultMap()
    },
    initModal () {
      this.selectedArea = Area.getSelectedArea()
      this.selectedParameter = Parameter.getDisplayedParameter()
      this.showModal = true
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

