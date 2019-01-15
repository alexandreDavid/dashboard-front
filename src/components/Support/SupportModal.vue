<template>
  <modal @close="closeModal">
    <div slot="header">
      Support
    </div>
    <div slot="body">
      <p>For more any question about DFMS please:</p>
      <p>email <a href="mailto:support@dfms.co.uk?subject=DFMS support" target="_top">support@dfms.co.uk</a></p>
      <p>or call +44 (0) 1235 567246.</p>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'

export default {
  name: 'SupportModal',
  components: {
    Modal
  },
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>
