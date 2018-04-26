<template>
  <div id="app">
    <Map/>
    <SearchLocation/>
    <Managing/>
  </div>
</template>

<script>

import Map from './components/Map/Map'
import SearchLocation from './components/SearchLocation/SearchLocation'
import Managing from './components/Managing/Managing'

export default {
  name: 'App',
  components: {
    Map,
    SearchLocation,
    Managing
  }
}
</script>

<style src="./main.scss" lang="scss">
</style>
