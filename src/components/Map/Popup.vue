<template>
    <div id="popup" v-if="value">
      {{value}}
    </div>
</template>

<script>
import {
  Popup
} from 'leaflet'

export default {
  name: 'Popup',
  data () {
    return {
      value: false
    }
  },
  inject: ['getMap', 'getDisplayedLayer'],
  mounted () {
    this.getMap().on('click', this.getFeatureInfo, this)
  },
  methods: {
    async getFeatureInfo (evt) {
      const featureInfo = await this.getDisplayedLayer().getFeatureInfo(evt, this.getMap())

      this.showGetFeatureInfo(evt.latlng, featureInfo)
    },
    showGetFeatureInfo (latlng, features) {
      if (features && features.length) {
        this.value = features[0].properties.GDAL_Band_Number_1
        new Popup({
          maxWidth: 800
        })
          .setLatLng(latlng)
          .setContent(this.$el)
          .openOn(this.getMap())
      }
    }
  }
}
</script>
