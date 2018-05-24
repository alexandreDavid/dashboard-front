<template>
  <div id="app">
    <router-view v-if="!isLoading"/>
    <ModalInit/>
  </div>
</template>

<script>
import ModalInit from './components/Modal/ModalInit'
import Api from '@/store/api'

export default {
  name: 'App',
  components: {
    ModalInit
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
