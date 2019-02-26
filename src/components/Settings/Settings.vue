<template>
  <div id="settings">
    <div class="card mb-4" v-for="settingsFamily in families" :key="settingsFamily.type">
      <a href="#" class="card-header" @click="toggleCollapsation(settingsFamily.type)">
        {{settingsFamily.label}}
        <div class="float-right">
          <font-awesome-icon v-if="openedFamilyType === settingsFamily.type" icon="caret-down" />
          <font-awesome-icon v-else icon="caret-right" />
        </div>
      </a>
      <ul class="list-group list-group-flush" v-show="openedFamilyType === settingsFamily.type">
        <SettingControl v-for="setting in getSettingsByType(settingsFamily.type)" :key="setting.id" :setting="setting"></SettingControl>
      </ul>
    </div>
    <div class="border-top p-2">
      <h5>Base map selection</h5>
      <base-map-control></base-map-control>
    </div>
  </div>
</template>

<script>
import Settings from '@/store/settings'
import SettingControl from './SettingControl'
import BaseMapControl from '@/components/BaseMap/BaseMapControl'

export default {
  name: 'Settings',
  async created () {
    this.settings = Settings.getAllSettings()
  },
  components: { SettingControl, BaseMapControl },
  data () {
    return {
      settings: [],
      families: [
        {
          type: 'unit',
          label: 'Weather units'
        }, {
          type: 'alert',
          label: 'Alerts/Notifications'
        }
      ],
      openedFamilyType: 'unit'
    }
  },
  methods: {
    toggleCollapsation (type) {
      this.openedFamilyType = type
    },
    getSettingsByType (type) {
      return Settings.getSettingsType(type)
    }
  }
}
</script>
