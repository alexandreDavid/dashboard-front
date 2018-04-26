<template>
  <div id="managing" class="over-map">
    <b-container>
        <b-row align-h="end" class="mb-2">
            <div>
                <b-badge pill variant="primary">About</b-badge>
                <b-badge pill variant="secondary">Profile</b-badge>
            </div>
        </b-row>
        <b-row align-h="end" class="mb-2">
            <b-badge pill variant="primary">ECMWF: Temperature</b-badge>
        </b-row>
        <b-row align-h="end">
            <b-badge pill variant="secondary">REPORTED: Temperature</b-badge>
        </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Managing',
  data() {
    return {
      message: 'hello'
    }
  }
}
</script>

<style scoped>
.over-map {
  margin-top: 10px;
  margin-left: 10px;
  z-index: 400;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
