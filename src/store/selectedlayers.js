// import UserConfiguration from '@/store/userConfiguration'
import SelectedLayer from '@/store/selectedLayer'

let allSelectedLayers = []
// let allSelectedLayers  = UserConfiguration.getActiveSettings()

function move (arr, oldIndex, newIndex) {
  if (newIndex >= arr.length) {
    return arr
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
  return arr
}

function calculateZIndex (layers) {
  layers.forEach((layer, key) => {
    layer.setZIndex((layers.length - key) * 10)
  })
  return layers
}

export default {
  allSelectedLayers: allSelectedLayers,
  add (geoRessources) {
    const newLayer = new SelectedLayer(geoRessources)
    this.allSelectedLayers.unshift(newLayer)
    this.allSelectedLayers = calculateZIndex(this.allSelectedLayers)
    return newLayer
  },
  up (index) {
    this.allSelectedLayers = move(this.allSelectedLayers, index, index - 1)
    this.allSelectedLayers = calculateZIndex(this.allSelectedLayers)
  },
  down (index) {
    this.allSelectedLayers = move(this.allSelectedLayers, index, index + 1)
    this.allSelectedLayers = calculateZIndex(this.allSelectedLayers)
  },
  remove (index) {
    this.allSelectedLayers[index].remove()
    this.allSelectedLayers.splice(index, 1)
  // },
  // setActiveKeyById (id, value) {
  //   this.activeSettings[id] = value
  //   UserConfiguration.setActiveSettings(this.activeSettings)
  }
}
