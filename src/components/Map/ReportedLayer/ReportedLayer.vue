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
    setDisplayedReportedLayer (reportedLayer) {
      this.reportedLayer = reportedLayer
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
            'lat': -1.2542,
            'lng': 29.9919
          },
          'name': 'Kabale District HQ',
          'countryCode': 'UK',
          'elevation': 1870,
          'variables': [
            'radiation',
            'atmosphericpressure'
          ],
          'firstMeasurement': '2017-09-07T05:15:00.000Z',
          'lastMeasurement': '2018-07-11T23:40:00.000Z'
        },
        'timeseries': {
          'radiation': {
            '2017-09-07T07:00': {avg: 87.27},
            '2017-09-07T08:00': {avg: 87.24},
            '2017-09-07T09:00': {avg: 87.16},
            '2017-09-07T10:00': {avg: 87.07}
          },
          'temperature': {
            '2017-09-07T07:00': {avg: 300},
            '2017-09-07T08:00': {avg: 301},
            '2017-09-07T09:00': {avg: 301.25},
            '2017-09-07T10:00': {avg: 299.7}
          }
        }
      }, {
        'station': {
          'location': {
            'lat': 0.18919,
            'lng': 30.10059
          },
          'name': 'Kasese Airfield',
          'countryCode': 'UK',
          'elevation': 962,
          'variables': [
            'radiation',
            'atmosphericpressure'
          ],
          'firstMeasurement': '2017-09-07T05:15:00.000Z',
          'lastMeasurement': '2018-07-11T23:40:00.000Z'
        },
        'timeseries': {
          'radiation': {
            '2017-09-07T07:00': {avg: 87.27},
            '2017-09-07T08:00': {avg: 87.24},
            '2017-09-07T09:00': {avg: 87.16},
            '2017-09-07T10:00': {avg: 87.07}
          },
          'temperature': {
            '2017-09-07T07:00': {avg: 300},
            '2017-09-07T08:00': {avg: 301},
            '2017-09-07T09:00': {avg: 301.25},
            '2017-09-07T10:00': {avg: 299.7}
          }
        }
      }, {
        'station': {
          'location': {
            'lat': 2.29519,
            'lng': 32.92137
          },
          'name': 'Lira - Ngetta',
          'countryCode': 'UK',
          'elevation': 1096,
          'variables': [
            'radiation',
            'atmosphericpressure'
          ],
          'firstMeasurement': '2017-09-07T05:15:00.000Z',
          'lastMeasurement': '2018-07-11T23:40:00.000Z'
        },
        'timeseries': {
          'radiation': {
            '2017-09-07T07:00': {avg: 87.27},
            '2017-09-07T08:00': {avg: 87.24},
            '2017-09-07T09:00': {avg: 87.16},
            '2017-09-07T10:00': {avg: 87.07}
          },
          'temperature': {
            '2017-09-07T07:00': {avg: 300},
            '2017-09-07T08:00': {avg: 301},
            '2017-09-07T09:00': {avg: 301.25},
            '2017-09-07T10:00': {avg: 299.7}
          }
        }
      }, {
        'station': {
          'location': {
            'lat': 0.56302,
            'lng': 31.39055
          },
          'name': 'Mubende',
          'countryCode': 'UK',
          'elevation': 1870,
          'variables': [
            'radiation',
            'atmosphericpressure'
          ],
          'firstMeasurement': '2017-09-07T05:15:00.000Z',
          'lastMeasurement': '2018-07-11T23:40:00.000Z'
        },
        'timeseries': {
          'radiation': {
            '2017-09-07T07:00': {avg: 87.27},
            '2017-09-07T08:00': {avg: 87.24},
            '2017-09-07T09:00': {avg: 87.16},
            '2017-09-07T10:00': {avg: 87.07}
          },
          'temperature': {
            '2017-09-07T07:00': {avg: 300},
            '2017-09-07T08:00': {avg: 301},
            '2017-09-07T09:00': {avg: 301.25},
            '2017-09-07T10:00': {avg: 299.7}
          }
        }
      }, {
        'station': {
          'location': {
            'lat': 1.20684,
            'lng': 32.73557
          },
          'name': 'Kalongo',
          'countryCode': 'UK',
          'elevation': 1870,
          'variables': [
            'radiation',
            'atmosphericpressure'
          ],
          'firstMeasurement': '2017-09-07T05:15:00.000Z',
          'lastMeasurement': '2018-07-11T23:40:00.000Z'
        },
        'timeseries': {
          'radiation': {
            '2017-09-07T07:00': {avg: 87.27},
            '2017-09-07T08:00': {avg: 87.24},
            '2017-09-07T09:00': {avg: 87.16},
            '2017-09-07T10:00': {avg: 87.07}
          },
          'temperature': {
            '2017-09-07T07:00': {avg: 300},
            '2017-09-07T08:00': {avg: 301},
            '2017-09-07T09:00': {avg: 301.25},
            '2017-09-07T10:00': {avg: 299.7}
          }
        }
      }, {
        'station': {
          'location': {
            'lat': 1.2102444,
            'lng': 32.4622806
          },
          'name': 'Kazwama Health Center',
          'countryCode': 'UK',
          'elevation': 1870,
          'variables': [
            'radiation',
            'atmosphericpressure'
          ],
          'firstMeasurement': '2017-09-07T05:15:00.000Z',
          'lastMeasurement': '2018-07-11T23:40:00.000Z'
        },
        'timeseries': {
          'radiation': {
            '2017-09-07T07:00': {avg: 87.27},
            '2017-09-07T08:00': {avg: 87.24},
            '2017-09-07T09:00': {avg: 87.16},
            '2017-09-07T10:00': {avg: 87.07}
          },
          'temperature': {
            '2017-09-07T07:00': {avg: 300},
            '2017-09-07T08:00': {avg: 301},
            '2017-09-07T09:00': {avg: 301.25},
            '2017-09-07T10:00': {avg: 299.7}
          }
        }
      }, {
        'station': {
          'location': {
            'lat': 2.72595,
            'lng': 31.39115
          },
          'name': 'Wadelai',
          'countryCode': 'UK',
          'elevation': 1870,
          'variables': [
            'radiation',
            'atmosphericpressure'
          ],
          'firstMeasurement': '2017-09-07T05:15:00.000Z',
          'lastMeasurement': '2018-07-11T23:40:00.000Z'
        },
        'timeseries': {
          'radiation': {
            '2017-09-07T07:00': {avg: 87.27},
            '2017-09-07T08:00': {avg: 87.24},
            '2017-09-07T09:00': {avg: 87.16},
            '2017-09-07T10:00': {avg: 87.07}
          },
          'temperature': {
            '2017-09-07T07:00': {avg: 300},
            '2017-09-07T08:00': {avg: 301},
            '2017-09-07T09:00': {avg: 301.25},
            '2017-09-07T10:00': {avg: 299.7}
          }
        }
      }, {
        'station': {
          'location': {
            'lat': 0.6978,
            'lng': 34.17151
          },
          'name': 'Tororo',
          'countryCode': 'UK',
          'elevation': 1870,
          'variables': [
            'radiation',
            'atmosphericpressure'
          ],
          'firstMeasurement': '2017-09-07T05:15:00.000Z',
          'lastMeasurement': '2018-07-11T23:40:00.000Z'
        },
        'timeseries': {
          'radiation': {
            '2017-09-07T07:00': {avg: 87.27},
            '2017-09-07T08:00': {avg: 87.24},
            '2017-09-07T09:00': {avg: 87.16},
            '2017-09-07T10:00': {avg: 87.07}
          },
          'temperature': {
            '2017-09-07T07:00': {avg: 300},
            '2017-09-07T08:00': {avg: 301},
            '2017-09-07T09:00': {avg: 301.25},
            '2017-09-07T10:00': {avg: 299.7}
          }
        }
      }, {
        'station': {
          'location': {
            'lat': 0.7569194,
            'lng': 34.0461694
          },
          'name': 'Busitema University',
          'countryCode': 'UK',
          'elevation': 1870,
          'variables': [
            'radiation',
            'atmosphericpressure'
          ],
          'firstMeasurement': '2017-09-07T05:15:00.000Z',
          'lastMeasurement': '2018-07-11T23:40:00.000Z'
        },
        'timeseries': {
          'radiation': {
            '2017-09-07T07:00': {avg: 87.27},
            '2017-09-07T08:00': {avg: 87.24},
            '2017-09-07T09:00': {avg: 87.16},
            '2017-09-07T10:00': {avg: 87.07}
          },
          'temperature': {
            '2017-09-07T07:00': {avg: 300},
            '2017-09-07T08:00': {avg: 301},
            '2017-09-07T09:00': {avg: 301.25},
            '2017-09-07T10:00': {avg: 299.7}
          }
        }
      }]
    }
  }
}

</script>
