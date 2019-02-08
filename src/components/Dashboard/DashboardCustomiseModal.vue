<template>
  <modal @close="close">
    <div slot="header">
      Customise dashboard
    </div>
    <div slot="body">
      <div class="form-group">
        <label>Layout</label>
        <div class="d-flex flex-wrap">
          <button v-for="(layout, key) in layouts" :key="key" @click="customisation.layout = layout" type="button" class="btn btn-secondary m-2" :class="{active: customisation.layout.id === layout.id}" style="width: 200px;height:100px;">
            <div class="d-flex h-100">
              <div v-for="(col, key) in layout.columns" :key="key" class="border p-1" :class="col.class">
                <small class="align-middle">{{ col.name }}</small>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div class="form-group">
        <label class="w-100">Theme (Coming soon)</label>
      </div>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
      <button type="button" class="btn btn-success" @click="validate(customisation)"><font-awesome-icon icon="check" /> Validate</button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'

import Dashboard from '@/store/dashboard'

export default {
  name: 'DashboardCostumiseModal',
  components: {
    Modal
  },
  props: {
    dashboard: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      layouts: Dashboard.getLayouts(),
      customisation: {}
    }
  },
  created () {
    this.customisation = {
      layout: this.dashboard.layout || this.layouts.find(l => l.default)
    }
  },
  methods: {
    validate (customisation) {
      this.$emit('validate', customisation)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
