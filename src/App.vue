<template>
  <div id="app">
    <router-view v-if="!isLoading"/>
    <ModalInit/>
  </div>
</template>

<script>
import ModalInit from './components/Modal/ModalInit'
import Api from '@/store/api'

import Auth from '@/store/authentication'

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
    if (!Auth.isAuthenticated()) {
      Auth.handleAuthentication()
    }
    await Api.getInitialEnvironmemt()
    this.isLoading = false
  }
}
</script>

<style src="./main.scss" lang="scss">
</style>
