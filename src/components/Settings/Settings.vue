<template>
  <div id="settings">
    <div class="card mb-4" v-for="settingsFamily in families" :key="settingsFamily.type">
      <a href="#" class="card-header" @click="toggleCollapsation(settingsFamily.type)">
        {{settingsFamily.label}}
        <div class="float-right">
          <font-awesome-icon v-if="openedFamilyType === settingsFamily.type" :icon="iconCaretDown" />
          <font-awesome-icon v-else :icon="iconCaretRight" />
        </div>
      </a>
      <ul class="list-group list-group-flush" v-show="openedFamilyType === settingsFamily.type">
        <SettingControl v-for="setting in getSettingsByType(settingsFamily.type)" :key="setting.id" :setting="setting"></SettingControl>
      </ul>
    </div>
  </div>
</template>

<script>
import Settings from '@/store/settings'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown'
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight'
import SettingControl from './SettingControl'

export default {
  name: 'Settings',
  async created () {
    this.settings = Settings.getAllSettings()
  },
  components: { FontAwesomeIcon, SettingControl },
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
  computed: {
    iconCaretDown () {
      return faCaretDown
    },
    iconCaretRight () {
      return faCaretRight
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
