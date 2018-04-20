<template>
  <div id="app">
    <Carto/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Carto from './components/Carto'

export default {
  name: 'App',
  components: {
    Carto
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
      position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
