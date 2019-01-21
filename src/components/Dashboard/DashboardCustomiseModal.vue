<template>
  <modal @close="close">
    <div slot="header">
      Customise dashboard
    </div>
    <div slot="body">
      <div class="form-group">
        <label>Layout</label>
        <div class="w-100 btn-group btn-group-lg" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary active">100%</button>
          <button type="button" class="btn btn-secondary">50% | 50%</button>
          <button type="button" class="btn btn-secondary">25% | 25% | 25% | 25%</button>
          <button type="button" class="btn btn-secondary">30% | 70%</button>
          <button type="button" class="btn btn-secondary">30% | 40% | 30%</button>
          <button type="button" class="btn btn-secondary">70% | 30%</button>
        </div>
      </div>
      <div class="form-group">
        <label class="w-100">Theme</label>
        <button type="button" class="btn btn-primary">Primary</button>
        <button type="button" class="btn btn-secondary">Secondary</button>
        <button type="button" class="btn btn-success">Success</button>
        <button type="button" class="btn btn-danger">Danger</button>
        <button type="button" class="btn btn-warning">Warning</button>
        <button type="button" class="btn btn-info">Info</button>
        <button type="button" class="btn btn-light">Light</button>
        <button type="button" class="btn btn-dark">Dark</button>
      </div>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
      <button type="button" class="btn btn-success" @click="$emit('close')"><font-awesome-icon icon="check" /> Create</button>
    </div>
  </modal>
</template>

<script>
import Loading from '@/components/Loading/Loading'
import Modal from '@/components/Modal/Modal'

export default {
  name: 'DashboardCostumiseModal',
  components: {
    Loading,
    Modal
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
