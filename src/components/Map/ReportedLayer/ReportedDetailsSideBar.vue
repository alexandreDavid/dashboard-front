<template>
  <SideBar @close="close()" class="p-2 position-absolute over-map-control">
    <div class="pt-3">
      {{ reportedDetails }}
    </div>
  </SideBar>
</template>

<script>
import SideBar from '@/components/SideBar/SideBar'

export default {
  name: 'ReportedDetailsSideBar',
  components: { SideBar },
  props: {
    reportedDetails: {
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
