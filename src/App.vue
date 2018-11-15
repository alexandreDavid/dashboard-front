<template>
  <div id="app">
    <div class="d-flex flex-column h-100">
      <NavBar />
      <div class="position-relative h-100 order-2">
        <div id="page-container">
          <router-view v-if="!isLoading"/>
        </div>
      </div>
    </div>
    <map-tour></map-tour>
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar'
import Api from '@/store/api'
import Area from '@/store/area'
import UserConfiguration from '@/store/userConfiguration'
import Settings from '@/store/settings'
import MapTour from '@/components/Tour/MapTour'

export default {
  name: 'App',
  components: {
    NavBar, MapTour
  },
  data () {
    return {
      isLoading: true
    }
  },
  async created () {
    await Api.getInitialEnvironmemt()
    await Settings.init()
    Area.setSelectedArea(UserConfiguration.getArea())
    this.isLoading = false
  }
}
</script>

<style src="./main.scss" lang="scss">
</style>
