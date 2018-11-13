<template>
  <div id="app">
    <Loading v-if="isLoading"></Loading>
    <div class="d-flex flex-column h-100" v-else-if="isAuthenticated">
      <NavBar />
      <div class="position-relative h-100 order-2">
        <div id="page-container">
          <router-view />
        </div>
      </div>
      <map-tour></map-tour>
    </div>
    <Login v-else v-bind:error="error"></Login>
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar'
import Api from '@/store/api'
import Area from '@/store/area'
import UserConfiguration from '@/store/userConfiguration'
import Settings from '@/store/settings'
import MapTour from '@/components/Tour/MapTour'

import Auth from '@/store/authentication'
import Login from '@/components/Login/Login'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'App',
  components: {
    NavBar, MapTour, Login, Loading
  },
  data () {
    return {
      isAuthenticated: false,
      error: false,
      isLoading: true
    }
  },
  async created () {
    this.isAuthenticated = Auth.isAuthenticated()
    if (this.isAuthenticated) {
      await this.setApp()
    } else {
      try {
        this.isAuthenticated = await Auth.handleAuthentication()
      } catch (err) {
        this.error = err.errorDescription
      }
    }
    this.isLoading = false
  },
  methods: {
    async setApp () {
      await Api.getInitialEnvironmemt()
      await Settings.init()
      Area.setSelectedArea(UserConfiguration.getArea())
    }
  }
}
</script>

<style src="./main.scss" lang="scss">
</style>
