<template>
    <div v-if="false">
      {{value}}
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { Popup } from 'leaflet'

export default {
  name: 'Popup',
  data () {
    return {
      value: false,
      popup: false
    }
  },
  inject: ['getMap', 'getDisplayedLayer'],
  computed: mapGetters('settings', ['getLabel']),
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
        const activeUnit = this.getDisplayedLayer().getUnit()
        this.value = Object.values(features[0].properties)[0]
        const unitLabel = this.getLabel(activeUnit) || ''
        this.popup = new Popup({
          maxWidth: 800
        })
          .setLatLng(latlng)
          .setContent(`<p>${this.value} ${unitLabel}</p>`)
          .openOn(this.getMap())
      }
    }
  },
  destroyed () {
    this.getMap().off('click', this.getFeatureInfo, this)
    this.getMap().closePopup(this.popup)
  }
}
</script>
