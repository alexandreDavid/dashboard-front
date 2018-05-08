<template>
  <div id="app">
    <router-view/>
    <ModalInit/>
  </div>
</template>

<script>
import ModalInit from './components/Modal/ModalInit'

export default {
  name: 'App',
  components: {
    ModalInit
  }
}
</script>

<style src="./main.scss" lang="scss">

</style>
