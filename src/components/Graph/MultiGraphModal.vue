<template>
  <modal @close="close()">
    <div slot="header">{{ getAreaLayer()._area.name }}</div>
    <div slot="body" class="graph-modal-content">
      <advanced-chart v-if="isLoaded" v-bind:chartData="chartData" v-bind:options="chartOptions"></advanced-chart>
      <Loading v-else></Loading>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import Loading from '@/components/Loading/Loading'

import ChartUtil from '@/utils/chart'

export default {
  name: 'MultiGraphModal',
  components: {
    Modal,
    Loading,
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
      chartOptions: {}
    }
  },
  async created () {
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
      const data = await resource.getStatistics()
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
