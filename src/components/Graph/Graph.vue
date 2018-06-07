<template>
  <div id="graph">
    <div v-if="isLoaded">
      <LineChart v-bind:chartData="datacollection" :options="options"></LineChart>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import LineChart from './Charts/LineChart'
import Chart from 'chart.js'
import Data from '@/store/data'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'Graph',
  components: {
    LineChart,
    Loading
  },
  props: ['area', 'parameter'],
  data() {
    return {
      chartArea: this.area,
      chartParameter: this.parameter,
      isLoaded: false,
      datacollection: {
        labels: [],
        datasets: []
      },
      options: {
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true
            }
          }],
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
  async created () {
    await this.getData()
  },
  watch: {
    // whenever question changes, this function will run
    parameter: async function () {
      await this.getData()
    }
  },
  methods: {
    async getData () {
      this.isLoaded = false
      const data = await Data.getAreaParameterData(this.chartArea, this.parameter)
      this.fillData(data)
      // axes Y title
      this.options.scales.yAxes[0].scaleLabel.labelString = `${this.parameter.displayName} (${data.unit})`
      this.isLoaded = true
    },
    fillData(data) {
      const vm = this

      var convertDate = function(date){
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = new Date(date);
        return d.getDate() + " " + monthNames[d.getMonth()] + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
      }

      var valueConversion = function(value, unit){
        if (unit === 0){
          return parseFloat(value.replace(',','.')).toFixed(2);
        } else if (unit === 1){
          return convertTemperatureValue(value);
        }
      }

      const colors = {
        red: "rgb(255, 99, 132)",
        orange: "rgb(255, 159, 64)",
        yellow: "rgb(255, 205, 86)",
        green: "rgb(75, 192, 192)",
        blue: "rgb(54, 162, 235)",
        grey: "rgb(201, 203, 207)",
        purple: "rgb(153, 102, 255)"
      }

      // Adding every datasets
      vm.datacollection.datasets = []
      vm.datacollection.labels = []
      Object.keys(Object.values(data.data)[0]).forEach((value, key) => {
        vm.datacollection.datasets.push(
          {
            label: value,
            fill: false,
            backgroundColor: Object.values(colors)[key],
            borderColor: Object.values(colors)[key],
            data: []
          }
        )
      })
      Object.entries(data.data).slice(0,12).forEach(([key, value]) => {
        vm.datacollection.labels.push(convertDate(key))
        Object.entries(value).forEach(([key, value]) => {
          vm.datacollection.datasets.find(d => d.label === key).data.push(valueConversion(value, 0))
        })
      })
    }
  }
}
</script>
