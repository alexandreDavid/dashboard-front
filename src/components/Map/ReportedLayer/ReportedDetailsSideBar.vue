<template>
  <SideBar @close="close()" class="p-2 position-absolute over-map-control">
    <div class="pt-3">
      <h4>{{ reportedDetails.station.name }}</h4>
      <div v-for="(timeserie, name) in reportedDetails.timeseries" :key="name">
        <h5>{{name}}</h5>
        <LineChart :chartData="getGraphData(timeserie)" :options="options"></LineChart>
      </div>
    </div>
  </SideBar>
</template>

<script>
import SideBar from '@/components/SideBar/SideBar'
import LineChart from '@/components/Graph/Charts/LineChart'

export default {
  name: 'ReportedDetailsSideBar',
  components: { SideBar, LineChart },
  props: {
    reportedDetails: {
      required: true
    }
  },
  data () {
    return {
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
  methods: {
    close () {
      this.$emit('close')
    },
    getGraphData (timeserie) {
      return {
        data: timeserie
      }
    }
  }
}
</script>
