<template>
  <div class="card">
    <div class="card-header">
      <form>
        <div class="form-row">
          <div class="form-group col-6">
            <label for="exampleFormControlSelect1">Parameter</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="selectedParameter">
              <option v-for="parameter in allParameters" :key="parameter.paramName" v-bind:value="parameter">
                {{ parameter.displayName }}
              </option>
            </select>
          </div>
          <!-- <div class="form-group col-6">
            <label for="Model">Model</label>
            <select class="form-control" id="Model">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div> -->
        </div>
      </form>
    </div>
    <div class="card-body square-div">
      <div class="square-div-content">
        <div id="map-container-dash" class="h-100 w-100" v-if="selectedParameter">
          <div class="over-map">
            <div class="row mb-2 justify-content-end over-map-control">
              <img v-bind:src="selectedParameter.legendUrl">
            </div>
          </div>
          <Popup v-if="isLoaded"/>
        </div>
        <span v-else>Select a parameter</span>
      </div>
    </div>
  </div>
</template>

<script>
import Graph from '@/components/Graph/Graph'
import Loading from '@/components/Loading/Loading'
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import DisplayedLayer from '@/store/displayedLayer'
import Popup from '@/components/Map/Popup'

let map

export default {
  name: 'DashboardGraph',
  components: {
    Loading,
    Graph,
    Popup
  },
  props: [
    'allParameters',
    'selectedArea'
  ],
  data() {
    return {
      isLoaded: false,
      area: this.selectedArea,
      selectedParameter: this.allParameters[0],
    }
  },
  provide: function () {
    return {
      getMap: this.getMap
    }
  },
  // created () {
  //   this.isLoaded = true
  // },
  mounted() {
    map = new MapObj('map-container-dash')
    AreaLayer.setSelectedArea(this.area, map)
    DisplayedLayer.setDisplayedLayer(map, this.selectedParameter.layerUrl, this.selectedParameter.layerParameters)
    this.isLoaded = true
  },
  methods: {
    getMap () {
      return map
    }
  }
}
</script>

<style lang="scss" scoped>
.square-div {
  padding-bottom: 0;
  padding-top: 100%;
  position: relative;

  .square-div-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>

