<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      isAuthenticated: false,
      error: false,
      isLoading: true
    }
  }
}
</script>

<style src="./main.scss" lang="scss">
</style>
