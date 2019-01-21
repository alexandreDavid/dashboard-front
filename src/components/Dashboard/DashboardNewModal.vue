<template>
  <modal @close="close">
    <div slot="header">
      New dashboard
    </div>
    <div slot="body">
      <div class="form-group">
        <label>Template</label>
        <div class="w-100 btn-group btn-group-lg" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary active">Empty template</button>
          <button type="button" class="btn btn-secondary">Template by default</button>
        </div>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" v-model="title" class="form-control" id="name" placeholder="Name">
      </div>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
      <button type="button" class="btn btn-success" @click="validate"><font-awesome-icon icon="check" /> Create</button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'

export default {
  name: 'DashboardNewModal',
  components: {
    Modal
  },
  data () {
    return {
      title: ''
    }
  },
  mounted () {
  },
  methods: {
    validate () {
      this.$emit('validate', {title: this.title})
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
