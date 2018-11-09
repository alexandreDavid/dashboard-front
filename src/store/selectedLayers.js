import UserConfiguration from '@/store/userConfiguration'
import SelectedLayer from '@/store/selectedLayer'

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
  allSelectedLayers: [],
  async getAllSelectedLayers (area) {
    const selectedLayers = UserConfiguration.getSelectedLayers()
    this.allSelectedLayers = []
    try {
      for (const idx in selectedLayers) {
        const newLayer = await new SelectedLayer()
        await newLayer.setLayer(selectedLayers[idx], area)
        this.allSelectedLayers.push(newLayer)
      }
    } catch (error) {
      console.warn('Selected layers local storage unreadable')
      UserConfiguration.setSelectedLayers([])
    }
    return this.allSelectedLayers
  },
  async add (geoResources, area) {
    const newLayer = new SelectedLayer()
    await newLayer.setLayer(geoResources, area)
    this.allSelectedLayers.unshift(newLayer)
    this.allSelectedLayers = calculateZIndex(this.allSelectedLayers)
    this.saveChanges()
    return newLayer
  },
  up (index) {
    this.allSelectedLayers = move(this.allSelectedLayers, index, index - 1)
    this.allSelectedLayers = calculateZIndex(this.allSelectedLayers)
    this.saveChanges()
  },
  down (index) {
    this.allSelectedLayers = move(this.allSelectedLayers, index, index + 1)
    this.allSelectedLayers = calculateZIndex(this.allSelectedLayers)
    this.saveChanges()
  },
  remove (index) {
    this.allSelectedLayers[index].remove()
    this.allSelectedLayers.splice(index, 1)
    this.saveChanges()
  },
  saveChanges () {
    UserConfiguration.setSelectedLayers(this.allSelectedLayers.map(layer => layer.geoResource))
  },
  updateArea (area) {
    this.allSelectedLayers.forEach(l => l.setArea(area))
  }
}
