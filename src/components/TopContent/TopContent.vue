<template>
  <div id="top-content" class="over-map">
    <div class="over-map-left">
      <SearchLocationResult v-if="searchLocationResult" v-bind:searchLocationResult="searchLocationResult"></SearchLocationResult>
      <SearchLocation @input="onSearchLocationSelected"></SearchLocation>
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

export default {
  name: 'TopContent',
  components: {
    SearchLocation,
    SearchLocationResult,
    Managing
  },
  data() {
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
