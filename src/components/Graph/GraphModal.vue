<template>
  <modal @close="close()">
    <div slot="header">{{ selectedArea.name + ' - ' + selectedParameter.displayName }}</div>
    <div slot="body" class="graph-modal-content">
      <Graph v-bind:area="selectedArea" v-bind:parameter="selectedParameter"></Graph>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'GraphModal',
  components: {
    Modal,
    Graph: () => ({
      component: import('@/components/Graph/Graph'),
      loading: Loading,
      delay: 0
    })
  },
  props: {
    selectedArea: {
      type: Object,
      required: true
    },
    selectedParameter: {
      type: Object,
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

<style lang="scss" scoped>

.graph-modal-content {
  height: 400px;
}

</style>
