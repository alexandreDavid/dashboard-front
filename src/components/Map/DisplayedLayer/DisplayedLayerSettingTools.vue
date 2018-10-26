<template>
  <div class="dropdown-menu shadow p-2 show m-0" ref="dropdown">
    <h6 class="d-flex align-items-center">
      <span class="w-100">Layer setting tools</span>
      <button type="button" class="close" aria-label="Close" @click="$emit('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </h6>
    <div>
      <button type="button" class="btn btn-sm btn-secondary"><font-awesome-icon icon="calendar-alt" /> {{ getTimeFormated(parameter.activeTime) }}</button>
      <button v-if="parameter.hasGraph" type="button" class="btn btn-sm btn-secondary" @click="openGraphModal"><font-awesome-icon icon="chart-bar" /> Open graph</button>
      <button type="button" class="btn btn-sm btn-secondary">Opacity</button>
    </div>
    <div class="mt-1">
      Treshold value
    </div>
    <GraphModal v-if="showModalGraph" v-bind:selectedArea="selectedArea" v-bind:selectedParameter="parameter" @close="showModalGraph = false"></GraphModal>
  </div>
</template>

<script>
import GraphModal from '@/components/Graph/GraphModal'
import Area from '@/store/area'

export default {
  name: 'DisplayedLayerSettingTools',
  props: ['parameter'],
  components: {
    GraphModal
  },
  data () {
    return {
      showModalGraph: false,
      selectedArea: false
    }
  },
  mounted () {
    document.addEventListener('click', this.handleClickOutside)
  },
  methods: {
    update () {
    },
    openGraphModal () {
      this.selectedArea = Area.getSelectedArea()
      this.showModalGraph = true
    },
    getTimeFormated (time) {
      let formatedDate
      if (time.startTime) {
        const startDate = new Date(time.startTime * 1000)
        const endDate = new Date(time.endTime * 1000)
        formatedDate = `${startDate.toDateString()} ${('0' + startDate.getHours()).slice(-2)}:${('0' + startDate.getMinutes()).slice(-2)} - ${('0' + endDate.getHours()).slice(-2)}:${('0' + endDate.getMinutes()).slice(-2)}`
      } else {
        const date = new Date(time * 1000)
        formatedDate = date.toDateString()
      }
      return formatedDate
    },
    handleClickOutside (evt) {
      if (!this.$el.contains(evt.target)) {
        this.$emit('close')
      }
    }
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
