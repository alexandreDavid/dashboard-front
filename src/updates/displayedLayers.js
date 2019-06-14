import UserConfiguration from '@/store/userConfiguration'
import store from '@/store'

export default async () => {
  if (!store.state.displayedLayers.all.length) {
    let selectedLayers = UserConfiguration.getSelectedLayers()
    for (let i in selectedLayers) {
      await store.dispatch('displayedLayers/addDisplayed', selectedLayers[i])
    }
  }
  UserConfiguration.removeSelectedLayers()
}
