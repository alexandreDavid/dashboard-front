<template>
  <div id="bottom-content" class="over-map">
    <div class="over-map-left d-none d-sm-block">
      <ZoomControl/>
      <button type="button" class="btn btn-primary align-bottom shadow" @click="resetMap"><font-awesome-icon :icon="iconUndo" /></button>
      <button type="button" class="btn btn-primary align-bottom shadow" @click="showModal = true"><font-awesome-icon :icon="iconGraph" /></button>
      <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">Graph</h3>
        <div slot="body"><Graph v-bind:area="selectedArea.getSelectedArea()" v-bind:parameter="selectedParameter.getDisplayedParameter()"></Graph></div>
      </modal>
    </div>
  </div>
</template>

<script>
import MapObj from '@/map'
import Parameter from '@/parameter'
import Area from '@/area'
import ZoomControl from './ZoomControl/ZoomControl'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faChartBar from '@fortawesome/fontawesome-free-solid/faChartBar'
import faUndo from '@fortawesome/fontawesome-free-solid/faUndo'

export default {
  name: 'BottomContent',
  components: {
    FontAwesomeIcon,
    ZoomControl,
    Graph: ()  => import('@/components/Graph/Graph')
  },
  data() {
    return {
      showModal: false,
      selectedArea: Area,
      selectedParameter: Parameter
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

