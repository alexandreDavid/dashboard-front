<template>
  <div class="over-map">
    <ReportedDetailsSideBar v-if="showSideBar" @close="closeSideBar" :reportedDetails="reportedDetails"></ReportedDetailsSideBar>
  </div>
</template>

<script>
import { CircleMarker, DomEvent } from 'leaflet'
import ReportedDetailsSideBar from '@/components/Map/ReportedLayer/ReportedDetailsSideBar'

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
      allMarkers: []
    }
  },
  mounted () {
    this.setDisplayedReportedLayer(this.selectedReportedLayer)
  },
  watch: {
    selectedReportedLayer: function (reportedLayer) {
      this.setDisplayedReportedLayer(reportedLayer)
    }
  },
  methods: {
    setDisplayedReportedLayer (reportedLayer) {
      this.allMarkers.forEach(marker => {
        marker.remove()
      })
      this.allMarkers = []
      this.mockStations().forEach(station => {
        this.allMarkers.push(this.createMarker(station))
      })
    },
    createMarker (station) {
      const vm = this
      return new CircleMarker([station.station.location.lat, station.station.location.lng], this.getDisplayedReportedLayerStyle())
        .bindTooltip(station.station.name)
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
    },
    mockStations () {
      return [{
        'station': {
          'location': {
            'lat': 0.56302,
            'lng': 31.39055
          },
          'name': 'Lorem Ipsum',
          'countryCode': 'UK',
          'elevation': 1349,
          'variables': [
            'radiation',
            'atmosphericpressure'
          ],
          'firstMeasurement': '2017-09-07T05:15:00.000Z',
          'lastMeasurement': '2018-07-11T23:40:00.000Z'
        },
        'timeseries': {
          'radiation': {
            '2017-09-07T07:00': 87.27,
            '2017-09-07T08:00': 87.24,
            '2017-09-07T09:00': 87.16,
            '2017-09-07T10:00': 87.07
          }
        }
      }, {
        'station': {
          'location': {
            'lat': 0.55302,
            'lng': 31.49055
          },
          'name': 'Lorem Ipsum2',
          'countryCode': 'UK',
          'elevation': 1349,
          'variables': [
            'radiation',
            'atmosphericpressure'
          ],
          'firstMeasurement': '2017-09-07T05:15:00.000Z',
          'lastMeasurement': '2018-07-11T23:40:00.000Z'
        },
        'timeseries': {
          'radiation': {
            '2017-09-07T07:00': 87.27,
            '2017-09-07T08:00': 87.24,
            '2017-09-07T09:00': 87.16,
            '2017-09-07T10:00': 87.07
          }
        }
      }]
    }
  }
}

</script>
