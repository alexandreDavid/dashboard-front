<template>
  <div id="top-content" class="over-map">
    <div class="over-map-left">
      <SearchLocationResult v-if="searchLocationResult" v-bind:searchLocationResult="searchLocationResult"></SearchLocationResult>
      <div style="position: relative;">
        <img src="../../assets/logo.png" style="width: 38px;display: inline-block;vertical-align: top;">
        <SearchLocation @input="onSearchLocationSelected" class="search-location"></SearchLocation>
        <button type="button" class="btn btn-primary" style="vertical-align: top;"><font-awesome-icon :icon="iconLocate" /></button>
        <button type="button" class="btn btn-primary d-inline-block d-sm-none" style="vertical-align: top;"><font-awesome-icon :icon="iconMenu" /></button>
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
import SearchLocationResult from './SearchLocationResult/SearchLocationResult'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faLocationArrow from '@fortawesome/fontawesome-free-solid/faLocationArrow'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'

export default {
  name: 'TopContent',
  components: {
    SearchLocation,
    SearchLocationResult,
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
