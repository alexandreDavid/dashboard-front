<template>
  <div id="settings" class="m-3">
    <SettingsFamily v-for="settingsFamily in settings" :key="settingsFamily.id" :settingsFamily="settingsFamily"></SettingsFamily>
  </div>
</template>

<script>
import Api from '@/store/api'
import SettingsFamily from './SettingsFamily'

export default {
  name: 'Settings',
  async created() {
    this.settings = await Api.getSettings()
  },
  components: { SettingsFamily },
  data() {
    return {
      settings: []
    }
  }
}
</script>
