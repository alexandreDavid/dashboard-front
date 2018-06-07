<template>
  <div id="app">
    <div class="d-flex flex-column h-100">
      <NavBar />
      <div class="position-relative h-100 order-2">
        <div id="page-container">
          <router-view v-if="!isLoading"/>
        </div>
      </div>
      <ModalInit/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar'
import ModalInit from './components/Modal/ModalInit'
import Api from '@/store/api'

export default {
  name: 'App',
  components: {
    ModalInit,
    NavBar
  },
  data () {
    return {
      isLoading: true
    }
  },
  async created() {
    await Api.getInitialEnvironmemt()
    this.isLoading = false
  }
}
</script>

<style src="./main.scss" lang="scss">
</style>
