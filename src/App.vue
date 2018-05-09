<template>
  <div id="app">
    <router-view v-if="!isLoading"/>
    <ModalInit/>
  </div>
</template>

<script>
import ModalInit from './components/Modal/ModalInit'
import Api from '@/api'

export default {
  name: 'App',
  components: {
    ModalInit
  },
  data() {
    return {
      isLoading: true
    }
  },
  async created() {
    // Get initial parameters
    if (!await Api.getInitialEnvironmemt()) {
      this.$router.push(this.$route.query.redirect || 'Error')
    }
    this.isLoading = false
  }
}
</script>

<style src="./main.scss" lang="scss">

</style>
