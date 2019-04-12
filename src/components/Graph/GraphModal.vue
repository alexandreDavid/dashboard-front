<template>
  <modal @close="close()">
    <div slot="header">{{ selectedArea.name + ' - ' + selectedParameter.geoResource.label }}</div>
    <div slot="body" class="graph-modal-content">
      <div class="d-flex flex-column w-100 h-100">
        <div class="px-4 mt-2">
          <graph-range-slider v-model="selectedDates" :data="allDates"></graph-range-slider>
        </div>
        <div class="position-relative h-100">
          <Graph v-if="isLoaded" v-bind:parameter="selectedParameter" :date-range="selectedDates"></Graph>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import Loading from '@/components/Loading/Loading'
import GraphRangeSlider from '@/components/Slider/GraphRangeSlider'

export default {
  name: 'GraphModal',
  components: {
    Modal,
    GraphRangeSlider,
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
  data () {
    return {
      allDates: [],
      selectedDates: [],
      isLoaded: false
    }
  },
  created () {
    this.allDates = this.selectedParameter.geoResource.config.statistics.params.date.values
    this.selectedDates = [this.allDates[0], this.allDates[this.allDates.length - 1]]
    this.isLoaded = true
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
  height: 70vh;
}

</style>
