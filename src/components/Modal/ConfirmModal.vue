<template>
  <modal @close="$emit('close')" class-width="modal-md">
    <div slot="header" v-if="title">
      {{ title }}
    </div>
    <div slot="body" v-if="content">
      <p>{{ content }}</p>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
      <button type="button" class="btn btn-success" @click="$emit('confirm')">Confirm</button>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'ConfirmModal',
  components: { Modal },
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    }
  }
}
</script>
