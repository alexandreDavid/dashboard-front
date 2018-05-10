<template>
  <li class="list-group-item">
    <h5 class="card-title float-left">{{setting.label}}</h5>
    <div class="btn-group float-right" role="group" :aria-label="setting.label">
      <button type="button" @click="changeSelectedValue(setting.id, val.key)" class="btn btn-secondary btn-group-sm" v-for="val in setting.values" :key="val.key" v-bind:class="{active: val.key === activeKey}">
        {{val.label}}
      </button>
    </div>
  </li>
</template>

<script>
import Settings from '@/settings'

export default {
  name: 'SettingControl',
  props: ['setting'],
  data () {
    return {
      activeKey: Settings.getActiveKeyById(this.setting.id)
    }
  },
  methods: {
    changeSelectedValue(id, key) {
      this.activeKey = key
      Settings.setActiveKeyById(id, key)
    }
  }
}
</script>
