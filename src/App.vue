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
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar'
import Api from '@/store/api'
import Area from '@/store/area'
import UserConfiguration from '@/store/userConfiguration'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data () {
    return {
      isLoading: true
    }
  },
  async created () {
    await Api.getInitialEnvironmemt()
    Area.setSelectedArea(UserConfiguration.getArea())
    this.isLoading = false
  }
}
</script>

<style src="./main.scss" lang="scss">
</style>
