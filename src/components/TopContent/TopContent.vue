<template>
  <div id="top-content" class="over-map">
    <div class="over-map-left">
      <SearchLocationResult v-if="searchLocationResult" v-bind:searchLocationResult="searchLocationResult"></SearchLocationResult>
      <div class="d-flex flex-nowrap position-relative">
        <div class="order-2 p-1 flex-grow-1"><SearchLocation @input="onSearchLocationSelected"></SearchLocation></div>
        <div class="order-1 p-1"><img src="../../assets/logo.png" style="height: 36px;"></div>
        <div class="order-3 p-1">
          <button type="button" class="btn btn-primary align-top" @click="zoomToCurrentLocation()" v-if="hasCurrentLocation"><font-awesome-icon :icon="iconLocate" /></button>
        </div>
        <div class="order-4 p-1 d-block d-sm-none">
          <button type="button" class="btn btn-primary d-inline-block d-sm-none align-top"><font-awesome-icon :icon="iconMenu" /></button>
        </div>
      </div>
    </div>
    <div class="over-map-right d-none d-sm-block">
      <Managing/>
    </div>
  </div>
</template>

<script>
import SearchLocation from './SearchLocation/SearchLocation'
import Managing from './Managing/Managing'
import { MapObj } from '../../map/MapObj'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faLocationArrow from '@fortawesome/fontawesome-free-solid/faLocationArrow'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'

export default {
  name: 'TopContent',
  components: {
    SearchLocation,
    SearchLocationResult: () => import('./SearchLocationResult/SearchLocationResult'),
    Managing,
    FontAwesomeIcon
  },
  computed: {
    iconLocate () {
      return faLocationArrow
    },
    iconMenu () {
      return faBars
    }
  },
  async created () {
    this.hasCurrentLocation = await MapObj.setCurrentLocationLayer()
  },
  data () {
    return {
      searchLocationResult: '',
      hasCurrentLocation: false
    }
  },
  methods: {
    onSearchLocationSelected (newValue) {
      this.searchLocationResult = newValue
    },
    zoomToCurrentLocation () {
      MapObj.zoomToCurrentLocation()
    }
  }
}
</script>
