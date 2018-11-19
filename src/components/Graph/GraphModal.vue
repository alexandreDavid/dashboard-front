<template>
  <modal @close="close()">
    <div slot="header">{{ selectedArea.name + ' - ' + selectedParameter.geoResource.name }}</div>
    <div slot="body" class="graph-modal-content">
      <div class="d-flex flex-column w-100 h-100">
        <div class="px-4 mt-2">
          <graph-range-slider @input="datesChange" :data="allDates"></graph-range-slider>
        </div>
        <div class="position-relative h-100">
          <Graph v-if="isLoaded" v-bind:parameter="selectedParameter" :start-date="startDate" :end-date="endDate"></Graph>
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
      startDate: false,
      endDate: false,
      isLoaded: false
    }
  },
  created () {
    this.allDates = this.selectedParameter.geoResource.config.statistics.params.date.values
    this.startDate = this.allDates[0]
    this.endDate = this.allDates[this.allDates.length - 1]
    this.isLoaded = true
  },
  methods: {
    close () {
      this.$emit('close')
    },
    datesChange (newDates) {
      this.startDate = newDates[0]
      this.endDate = newDates[1]
    }
  }
}
</script>

<style lang="scss" scoped>

.graph-modal-content {
  height: 70vh;
}

</style>
