import UserConfiguration from '@/store/userConfiguration'
import SelectedLayer from '@/store/selectedLayer'
import GeoResources from '@/store/geoResources'
import store from '@/store'

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
    await store.dispatch('displayedLayers/setAll')
    const selectedLayers = store.state.displayedLayers.all
    this.allSelectedLayers = []
    try {
      for (const idx in selectedLayers) {
        const newLayer = await new SelectedLayer()
        await newLayer.setLayer({...selectedLayers[idx], ...GeoResources.searchById(selectedLayers[idx].id)}, area)
        this.allSelectedLayers.push(newLayer)
      }
    } catch (error) {
      console.warn('Selected layers local storage unreadable')
      UserConfiguration.setSelectedLayers([])
    }
    return this.allSelectedLayers
  },
  async add (geoResource, area) {
    await store.dispatch('displayedLayers/addDisplayed', geoResource)
    const newLayer = new SelectedLayer()
    await newLayer.setLayer(geoResource, area)
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
    store.dispatch('displayedLayers/deleteDisplayed', this.allSelectedLayers[index].geoResource)
    this.allSelectedLayers[index].remove()
    this.allSelectedLayers.splice(index, 1)
    this.saveChanges()
  },
  saveChanges () {
    this.allSelectedLayers.map(layer => store.dispatch('displayedLayers/updateDisplayed', layer.geoResource))
  },
  updateArea (area) {
    this.allSelectedLayers.forEach(l => l.setArea(area))
  },
  isSelected (geoResource) {
    return !!this.allSelectedLayers.find(l => l.geoResource.id === geoResource.id)
  }
}
