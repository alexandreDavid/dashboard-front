<template>
  <div id="settings" class="m-3">
    <h2 class="text-left mb-4">
      <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true">&times;</span>
      </button>
      Settings menu
    </h2>
    <SettingsFamily v-for="settingsFamily in settings" :key="settingsFamily.id" :settingsFamily="settingsFamily"></SettingsFamily>
  </div>
</template>

<script>
import Api from '@/store/api'
import SettingsFamily from './SettingsFamily'

export default {
  name: 'SettingsPage',
  async created() {
    this.settings = await Api.getSettings()
  },
  components: { SettingsFamily },
  data() {
    return {
      settings: []
    }
  },
  methods: {
    close() {
      this.$router.replace(this.$route.query.redirect || '/')
    }
  }
}
</script>
