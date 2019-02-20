<template>
  <modal @close="close">
    <div slot="header">
      New dashboard
    </div>
    <dashboard-new-container slot="body" v-model="config"></dashboard-new-container>
    <div slot="footer">
      <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
      <button type="button" class="btn btn-success" @click="validate" :disabled="!config.title"><font-awesome-icon icon="check" /> Create</button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import DashboardNewContainer from './DashboardNewContainer'

export default {
  name: 'DashboardNewModal',
  components: {
    Modal, DashboardNewContainer
  },
  data () {
    return {
      config: {}
    }
  },
  methods: {
    validate () {
      this.$emit('validate', this.config)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
