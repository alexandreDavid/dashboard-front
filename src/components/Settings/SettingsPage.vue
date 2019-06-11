<template>
  <div id="settingsPage" class="m-3">
    <h2 class="text-left mb-4">
      Settings menu
    </h2>
    <Settings class="m-3"/>
  </div>
</template>

<script>
import Settings from './Settings'

export default {
  name: 'SettingsPage',
  components: { Settings }
}
</script>
