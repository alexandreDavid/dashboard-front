import UserConfiguration from '@/store/userConfiguration'

export default async (store) => {
  if (!store.state.displayedLayers.all.length) {
    let selectedLayers = UserConfiguration.getSelectedLayers()
    for (let i in selectedLayers) {
      await store.dispatch('displayedLayers/addDisplayed', selectedLayers[i])
    }
  }
  UserConfiguration.removeSelectedLayers()
}
