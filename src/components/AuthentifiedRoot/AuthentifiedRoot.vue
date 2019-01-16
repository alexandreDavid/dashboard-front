<template>
  <div class="h-100">
    <div class="d-flex flex-column h-100" v-if="isLoaded">
      <NavBar />
      <welcome-modal v-if="showModalWelcome" @close="showModalWelcome = false"></welcome-modal>
      <div v-else class="position-relative h-100 order-2">
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
import UserConfiguration from '@/store/userConfiguration'
import GeoResources from '@/store/geoResources'
import Settings from '@/store/settings'
import MapTour from '@/components/Tour/MapTour'
import WelcomeModal from '@/components/WelcomeModal/WelcomeModal'

import Loading from '@/components/Loading/Loading'

export default {
  name: 'AuthentifiedRoot',
  components: {
    NavBar, MapTour, Loading, WelcomeModal
  },
  data () {
    return {
      showModalWelcome: false,
      isLoaded: false
    }
  },
  async created () {
    this.showModalWelcome = UserConfiguration.getDisplayHelp() && this.$mq !== 'sm'
    await Settings.init()
    await GeoResources.getAllResources()
    this.isLoaded = true
  }
}
</script>
