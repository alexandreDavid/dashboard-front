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
      <welcome-modal></welcome-modal>
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
import WelcomeModal from '@/components/WelcomeModal/WelcomeModal'

import DefinedAreas from '@/store/definedAreas'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'AuthentifiedRoot',
  components: {
    NavBar, MapTour, Loading, WelcomeModal
  },
  data () {
    return {
      showAreaModal: false,
      isLoaded: false
    }
  },
  async created () {
    this.showAreaModal = !DefinedAreas.hasAreas()
    await Settings.init()
    Area.setSelectedArea(UserConfiguration.getActiveArea())
    this.isLoaded = true
  }
}
</script>
