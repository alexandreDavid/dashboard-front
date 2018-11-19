<template>
  <modal @close="close()">
    <div slot="header">{{ getAreaLayer()._area.name }}</div>
    <div slot="body" class="graph-modal-content">
      <div class="d-flex flex-column w-100 h-100">
        <div class="px-4 mt-2">
          <graph-range-slider @input="datesChange" :data="allDates"></graph-range-slider>
        </div>
        <div class="position-relative h-100">
          <advanced-chart v-if="isLoaded" v-bind:chartData="chartData" v-bind:options="chartOptions"></advanced-chart>
          <Loading v-else></Loading>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import Loading from '@/components/Loading/Loading'
import GraphRangeSlider from '@/components/Slider/GraphRangeSlider'

import ChartUtil from '@/utils/chart'

export default {
  name: 'MultiGraphModal',
  components: {
    Modal,
    Loading,
    GraphRangeSlider,
    AdvancedChart: () => ({
      component: import('@/components/Graph/Charts/AdvancedChart'),
      loading: Loading,
      delay: 0
    })
  },
  inject: ['getAreaLayer'],
  props: {
    resources: {
      type: [Array, Object],
      required: true
    }
  },
  data () {
    return {
      isLoaded: false,
      chartData: {},
      chartOptions: {},
      allDates: [],
      startDate: false,
      endDate: false
    }
  },
  async created () {
    this.allDates = this.resources[0].geoResource.config.statistics.params.date.values
    this.startDate = this.allDates[0]
    this.endDate = this.allDates[this.allDates.length - 1]
    await this.getData()
  },
  methods: {
    async getData () {
      this.isLoaded = false
      let datasets = []
      let labels = []
      this.chartOptions = {
        scales: {
          yAxes: []
        }
      }
      let yAxisNb = 0

      await Promise.all(this.resources.map(async (resource, key) => {
        const data = await resource.getStatistics(this.startDate, this.endDate)
        const unit = resource.getUnit()

        let yAxis = this.chartOptions.scales.yAxes.find(y => y.unit === unit)
        if (!yAxis) {
          yAxisNb++
          yAxis = {
            display: true,
            unit: unit,
            scaleLabel: {
              display: true,
              labelString: unit
            },
            id: `y-axis-${yAxisNb}`,
            position: (yAxisNb % 2 ? 'left' : 'right')
          }
          this.chartOptions.scales.yAxes.push(yAxis)
        }
        let color = Object.values(ChartUtil.colors)[key]
        let dataset = {
          label: `${resource.geoResource.name} (${unit})`,
          fill: false,
          backgroundColor: color,
          borderColor: color,
          data: [],
          yAxisID: yAxis.id
        }

        data.forEach(d => {
          dataset.data.push(d.values.avg)
          if (key === 0) {
            labels.push(ChartUtil.convertDate(d.date))
          }
        })
        datasets.push(dataset)
      }))

      this.chartData = {datasets, labels}
      this.isLoaded = true
    },
    close () {
      this.$emit('close')
    },
    datesChange (newDates) {
      this.startDate = newDates[0]
      this.endDate = newDates[1]
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>

.graph-modal-content {
  height: 70vh;
}

</style>
