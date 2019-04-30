<template>
  <li class="list-group-item">
    <h6 class="card-title float-left">{{setting.label}} {{activeKey}}</h6>
    <div class="btn-group float-right btn-group-sm" role="group" :aria-label="setting.label">
      <button type="button" @click="changeSelectedValue(setting.id, val)" class="btn btn-secondary" v-for="val in setting.values" :key="val.key" v-bind:class="{active: val.key === activeKey}">
        {{val.label}}
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SettingControl',
  props: ['setting'],
  computed: {
    ...mapGetters('settings', ['getActiveKeyById'])
  },
  data () {
    return {
      activeKey: false
    }
  },
  mounted () {
    this.activeKey = this.getActiveKeyById(this.setting.id)
  },
  methods: {
    changeSelectedValue (id, setting) {
      this.activeKey = setting.key
      this.setActiveKeyById({id, key: this.activeKey})
    },
    ...mapActions('settings', ['setActiveKeyById'])
  }
}
</script>
