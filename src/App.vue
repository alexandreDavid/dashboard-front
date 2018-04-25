<template>
  <div id="app">
    <Map/>
    <SearchLocation/>
  </div>
</template>

<script>

import Map from './components/Map/Map'
import SearchLocation from './components/SearchLocation/SearchLocation'

export default {
  name: 'App',
  components: {
    Map,
    SearchLocation
  }
}
</script>

<style src="./main.scss" lang="scss">
</style>
