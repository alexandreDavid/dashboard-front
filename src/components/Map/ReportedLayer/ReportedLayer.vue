<template>
  <div class="over-map">
    <ReportedDetailsSideBar v-if="showSideBar" @close="closeSideBar" :reportedDetails="reportedDetails"></ReportedDetailsSideBar>
  </div>
</template>

<script>
import { CircleMarker, DomEvent } from 'leaflet'
import ReportedDetailsSideBar from '@/components/Map/ReportedLayer/ReportedDetailsSideBar'
import Observation from '@/store/observation'

export default {
  name: 'ReportedLayer',
  inject: ['getMap'],
  props: [
    'selectedReportedLayer'
  ],
  components: {
    ReportedDetailsSideBar
  },
  data () {
    return {
      showSideBar: false,
      reportedLayer: false,
      allMarkers: []
    }
  },
  mounted () {
    if (this.selectedReportedLayer) {
      this.setDisplayedReportedLayer(this.selectedReportedLayer)
    }
  },
  watch: {
    selectedReportedLayer: function (reportedLayer) {
      this.setDisplayedReportedLayer(reportedLayer)
    }
  },
  methods: {
    async setDisplayedReportedLayer (reportedLayer) {
      this.reportedLayer = reportedLayer
      this.allMarkers.forEach(marker => {
        marker.remove()
      })
      this.allMarkers = []
      const stations = await Observation.getAllObservationsType(reportedLayer.name)
      stations.forEach(station => {
        this.allMarkers.push(this.createMarker(station))
      })
    },
    createMarker (station) {
      const vm = this
      return new CircleMarker([station.lat, station.long], this.getDisplayedReportedLayerStyle())
        .bindTooltip(station.name)
        .on('click', function (evt) {
          // Stop propagation
          DomEvent.stop(evt)
          // Timeout used to don't call the click outside SideBar function
          setTimeout(function () {
            vm.openSideBar()
            vm.reportedDetails = station
          }, 0)
        })
        .addTo(this.getMap())
    },
    getDisplayedReportedLayerStyle () {
      return {
        radius: 5,
        color: '#FFF',
        weight: 1,
        fillColor: '#d57',
        fillOpacity: 1
      }
    },
    openSideBar () {
      this.showSideBar = true
    },
    closeSideBar () {
      this.showSideBar = false
    }
  }
}

</script>
