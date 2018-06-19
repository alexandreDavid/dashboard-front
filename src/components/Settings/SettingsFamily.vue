<template>
  <div class="card mb-4">
    <a href="#" class="card-header" :id="settingsFamily.id" @click="toggleCollapsation">
      {{settingsFamily.label}}
      <div class="float-right">
        <font-awesome-icon v-if="isCollapsed" :icon="iconCaretDown" />
        <font-awesome-icon v-else :icon="iconCaretRight" />
      </div>
    </a>
    <ul class="list-group list-group-flush" v-show="isCollapsed">
      <SettingControl v-for="setting in settingsFamily.settingsList" :key="setting.id" :setting="setting"></SettingControl>
    </ul>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown'
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight'
import SettingControl from './SettingControl'

export default {
  name: 'SettingsFamily',
  props: ['settingsFamily'],
  data () {
    return {
      isCollapsed: false
    }
  },
  components: { FontAwesomeIcon, SettingControl },
  computed: {
    iconCaretDown () {
      return faCaretDown
    },
    iconCaretRight () {
      return faCaretRight
    }
  },
  methods: {
    toggleCollapsation () {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>
