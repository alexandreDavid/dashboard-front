<template>
  <div class="h-100">
    <div class="d-flex flex-column h-100" v-if="isLoaded">
      <NavBar />
      <div class="position-relative h-100 order-2">
        <div id="page-container">
          <router-view />
        </div>
      </div>
      <map-tour></map-tour>
    </div>
    <Loading v-else></Loading>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar'
import Area from '@/store/area'
import UserConfiguration from '@/store/userConfiguration'
import Settings from '@/store/settings'
import MapTour from '@/components/Tour/MapTour'

import Loading from '@/components/Loading/Loading'

import updates from '@/updates'

export default {
  name: 'AuthentifiedRoot',
  components: {
    NavBar, MapTour, Loading
  },
  data () {
    return {
      isLoaded: false
    }
  },
  async created () {
    updates()
    await Settings.init()
    Area.setSelectedArea(UserConfiguration.getActiveArea())
    this.isLoaded = true
  }
}
</script>
