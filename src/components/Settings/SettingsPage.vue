<template>
  <div id="settingsPage" class="m-3">
    <h2 class="text-left mb-4">
      <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true">&times;</span>
      </button>
      Settings menu
    </h2>
    <Settings class="m-3"/>
  </div>
</template>

<script>
import Settings from './Settings'

export default {
  name: 'SettingsPage',
  components: { Settings },
  methods: {
    close () {
      this.$router.replace(this.$route.query.redirect || '/')
    }
  }
}
</script>
