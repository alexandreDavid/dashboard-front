<template>
  <div class="h-100">
    <div class="d-flex flex-column h-100 d-print-block" v-if="isLoaded">
      <NavBar />
      <welcome-modal v-if="showModalWelcome" @close="showModalWelcome = false"></welcome-modal>
      <div v-else class="position-relative h-100 order-2">
        <div id="page-container" class="d-print-block">
          <router-view />
        </div>
      </div>
      <global-tour></global-tour>
    </div>
    <Loading v-else></Loading>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import NavBar from '@/components/NavBar/NavBar'
import GeoResources from '@/store/geoResources'
import GlobalTour from '@/components/Tour/GlobalTour'
import Loading from '@/components/Loading/Loading'

import updates from '@/updates'

export default {
  name: 'AuthentifiedRoot',
  components: {
    NavBar,
    GlobalTour,
    Loading,
    'welcome-modal': () => import('@/components/WelcomeModal/WelcomeModal')
  },
  computed: mapState({
    dashboards: state => state.dashboards.all,
    areas: state => state.areas.all
  }),
  data () {
    return {
      showModalWelcome: false,
      isLoaded: false
    }
  },
  async created () {
    await this.$store.dispatch('init')
    await updates()
    this.showModalWelcome = !this.dashboards.length || !this.areas.length
    await GeoResources.getAllResources()
    this.isLoaded = true
  }
}
</script>
