<template>
  <div id="bottom-content" class="over-map">
    <div class="over-map-left d-none d-sm-block">
      <ZoomControl/>
      <button type="button" class="btn btn-primary align-bottom" @click="resetMap"><font-awesome-icon :icon="iconUndo" /></button>
      <button type="button" class="btn btn-primary align-bottom"><font-awesome-icon :icon="iconGraph" /></button>
    </div>
  </div>
</template>

<script>
import MapObj from '@/map'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faChartBar from '@fortawesome/fontawesome-free-solid/faChartBar'
import faUndo from '@fortawesome/fontawesome-free-solid/faUndo'
import ZoomControl from './ZoomControl/ZoomControl'

export default {
  name: 'BottomContent',
  components: {
    FontAwesomeIcon,
    ZoomControl
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

