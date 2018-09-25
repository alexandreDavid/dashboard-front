<template>
    <div v-if="false">
      {{value}}
    </div>
</template>

<script>
import { Popup } from 'leaflet'
import Unit from '@/utils/unit'

export default {
  name: 'Popup',
  data () {
    return {
      value: false,
      popup: false
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
        const activeUnit = this.getDisplayedLayer().getUnit()
        this.value = Unit.convert(this.getDisplayedLayer().getDefaultUnit(), activeUnit, Object.values(features[0].properties)[0], true)
        const unitLabel = Unit.getLabel(activeUnit)
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
