<template>
  <modal @close="close()">
    <div slot="header">{{ selectedArea.name + ' - ' + selectedParameter.name }}<span v-if="selectedParameter2"> - {{ selectedParameter2.name }}</span></div>
    <div slot="body" class="graph-modal-content" v-bind:class="{'double': selectedParameter2}">
      <div class="d-flex flex-column w-100 h-100">
        <div class="flex-fill position-relative">
          <h6>{{ selectedParameter.name }}</h6>
          <Graph v-bind:area="selectedArea" v-bind:parameter="selectedParameter"></Graph>
        </div>
        <div class="flex-fill position-relative" v-if="selectedParameter2">
          <h6>{{ selectedParameter2.name }}</h6>
          <Graph v-bind:area="selectedArea" v-bind:parameter="selectedParameter2"></Graph>
        </div>
      </div>
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
    },
    selectedParameter2: {
      type: Object
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
  &.double {
    height: 70vh;
  }
}

</style>
