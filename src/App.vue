<template>
  <div id="app">
    <Map/>
    <TopContent/>
    <ModalInit/>
  </div>
</template>

<script>
import Map from './components/Map/Map'
import TopContent from './components/TopContent/TopContent'
import ModalInit from './components/Modal/ModalInit'

export default {
  name: 'App',
  components: {
    Map,
    TopContent,
    ModalInit
  }
}
</script>

<style src="./main.scss" lang="scss">

</style>
