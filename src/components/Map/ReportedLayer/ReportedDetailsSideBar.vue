<template>
  <SideBar @close="close()" class="p-2 position-absolute over-map-control">
    <div class="d-flex flex-column h-100">
      <div class="pt-3">
        <h4>{{ observation.name }}</h4>
        <ObservationRangeSlider v-if="isDisplayed" class="mb-4 px-3" @input="updateDate" v-model="sliderDates"></ObservationRangeSlider>
      </div>
      <div v-if="isLoaded" class="flex-grow-1" style="overflow: auto;">
        <div v-for="(variable, key) in observation.variables" :key="key">
          <h5>{{variable}}</h5>
          <div class="chart-container">
            <ReportedDetailsGraph :observation="observation" :variable="variable" :options="options" v-bind:date-start="dateStart" v-bind:date-end="dateEnd"></ReportedDetailsGraph>
          </div>
        </div>
      </div>
      <Loading v-else />
    </div>
  </SideBar>
</template>

<script>
import SideBar from '@/components/SideBar/SideBar'
import Loading from '@/components/Loading/Loading'
import ObservationRangeSlider from '@/components/Slider/ObservationRangeSlider'
import vueSlider from 'vue-slider-component'

export default {
  name: 'ReportedDetailsSideBar',
  components: {
    SideBar,
    ReportedDetailsGraph: () => import('./ReportedDetailsGraph'),
    Loading,
    ObservationRangeSlider,
    vueSlider
  },
  props: {
    reportedDetails: {
      required: true
    }
  },
  data () {
    return {
      isDisplayed: false,
      isLoaded: false,
      sliderDates: [2, 0],
      dateStart: false,
      dateEnd: false,
      observation: {},
      options: {
        scales: {
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true
            }
          }]
        }
      }
    }
  },
  async mounted () {
    this.observation = this.reportedDetails
    this.updateDate(this.sliderDates)
    this.isLoaded = true
    const vm = this
    // Wait for the end of the displaying animation
    setTimeout(() => {
      vm.isDisplayed = true
    }, 300)
  },
  methods: {
    close () {
      this.$emit('close')
    },
    updateDate (val) {
      let now = new Date()
      this.dateStart = new Date(now - (24 * 60 * 60 * 1000) * val[0]).toISOString()
      this.dateEnd = new Date(now - (24 * 60 * 60 * 1000) * val[1]).toISOString()
    }
  }
}
</script>
