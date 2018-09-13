<template>
<modal @close="close()">
    <div slot="header">Boundary map selector</div>
    <div slot="body" class="position-relative" style="height: 500px;">
      <div class="search-location-helper border d-flex flex-column">
        <div class="h-50 w-100 position-relative">
          <div id="search-location-map"></div>
        </div>
        <div class="h-50 position-relative p-3">
          <table class="table" v-if="selectedFeatures.length">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(feature, key) in selectedFeatures" :key="key">
                <th scope="row">{{ feature.properties.name }}</th>
                <td>{{ feature.properties.type }}</td>
                <td>
                  <button type="button" class="btn btn-secondary btn-sm" @click="locate(feature)">Locate</button>
                  <button type="button" class="btn btn-primary btn-sm" @click="select(feature)">Select</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="alert alert-info col-12" role="alert" v-else>
            Zoom and click on the map to select an area
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import { GeoJSON, TileLayer } from 'leaflet'
import MapObj from '@/store/map'
import axios from 'axios'

export default {
  name: 'SearchLocationMapHelper',
  components: {
    Modal
  },
  data () {
    return {
      map: false,
      areaLayer: false,
      selectedFeatures: []
    }
  },
  mounted () {
    this.map = new MapObj('search-location-map')
    new TileLayer.WMS('http://18.130.18.23:8180/geoserver/boundaries/ows', {
      service: 'WMS',
      version: '1.1.1',
      request: 'GetMap',
      layers: `boundaries:area`,
      format: 'image/png',
      transparent: true,
      CQL_FILTER: "type= 'region'",
      minZoom: 0,
      maxZoom: 7
    }).addTo(this.map)

    new TileLayer.WMS('http://18.130.18.23:8180/geoserver/boundaries/ows', {
      service: 'WMS',
      version: '1.1.1',
      request: 'GetMap',
      layers: `boundaries:area`,
      format: 'image/png',
      transparent: true,
      CQL_FILTER: "type= 'district'",
      minZoom: 8,
      maxZoom: 10
    }).addTo(this.map)

    new TileLayer.WMS('http://18.130.18.23:8180/geoserver/boundaries/ows', {
      service: 'WMS',
      version: '1.1.1',
      request: 'GetMap',
      layers: `boundaries:area`,
      format: 'image/png',
      transparent: true,
      CQL_FILTER: "type= 'parish'",
      minZoom: 11,
      maxZoom: 18
    }).addTo(this.map)

    this.map.on('click', this.getFeatureInfo, this)
  },
  methods: {
    close () {
      this.$emit('close')
    },
    async getFeatureInfo (evt) {
      const zoom = this.map.getZoom()
      let point = this.map.latLngToContainerPoint(evt.latlng, zoom)
      let size = this.map.getSize()

      let cqlFilter = "type= 'district'"
      if (zoom < 8) {
        cqlFilter = "type= 'region'"
      } else if (zoom > 10) {
        cqlFilter = "type= 'parish'"
      }

      let params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:4326',
        bbox: this.map.getBounds().toBBoxString(),
        version: '1.1.1',
        height: size.y,
        width: size.x,
        layers: `boundaries:area`,
        query_layers: `boundaries:area`,
        info_format: 'application/json',
        feature_count: 3,
        cql_filter: cqlFilter,
        x: point.x,
        y: point.y
      }

      const featureInfo = await axios.get('http://18.130.18.23:8180/geoserver/boundaries/ows', {
        params
      })
      this.selectedFeatures = featureInfo.data.features
    },
    select (feature) {
      this.$emit('select', {
        id: feature.id,
        type: feature.properties.type,
        name: feature.properties.name
      })
      this.close()
    },
    locate (feature) {
      if (this.areaLayer) {
        this.areaLayer.remove()
      }
      this.areaLayer = new GeoJSON(feature, {
        weight: 2,
        width: 2,
        color: 'red',
        fillOpacity: 0.0,
        interactive: false
      }).addTo(this.map)
      this.map.fitBounds(this.areaLayer.getBounds())
    }
  }
}
</script>

<style lang="scss" scoped>

.search-location-helper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: var(--white);
  height: 500px;

  #search-location-map {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}

</style>
