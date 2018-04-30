<template>
  <div id="app">
    <Map/>
    <SearchLocation/>
    <Managing/>
    <ModalInit/>
  </div>
</template>

<script>
import Map from './components/Map/Map'
import SearchLocation from './components/SearchLocation/SearchLocation'
import Managing from './components/Managing/Managing'
import ModalInit from './components/Modal/ModalInit'

export default {
  name: 'App',
  components: {
    Map,
    SearchLocation,
    Managing,
    ModalInit
  }
}
</script>

<style src="./main.scss" lang="scss">

</style>
