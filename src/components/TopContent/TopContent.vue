<template>
  <div id="top-content" class="over-map">
    <div class="over-map-left">
      <SearchLocationResult v-if="searchLocationResult" v-bind:searchLocationResult="searchLocationResult"></SearchLocationResult>
      <div class="position-relative">
        <img src="../../assets/logo.png" class="align-top d-inline-block" style="width: 38px;">
        <SearchLocation @input="onSearchLocationSelected" class="search-location"></SearchLocation>
        <button type="button" class="btn btn-primary align-top"><font-awesome-icon :icon="iconLocate" /></button>
        <button type="button" class="btn btn-primary d-inline-block d-sm-none align-top"><font-awesome-icon :icon="iconMenu" /></button>
      </div>
    </div>
    <div class="over-map-right">
      <Managing/>
    </div>
  </div>
</template>

<script>
import SearchLocation from './SearchLocation/SearchLocation'
import Managing from './Managing/Managing'

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
  data () {
    return {
      searchLocationResult: ''
    }
  },
  methods: {
    onSearchLocationSelected (newValue) {
      this.searchLocationResult = newValue
    }
  }
}
</script>
