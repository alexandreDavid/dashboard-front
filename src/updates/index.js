import UserConfiguration from '@/store/userConfiguration'
import store from '@/store'

/**
 *  Areas are now multiple
 */
const updateAreas = async () => {
  const allAreas = store.state.areas.all
  if (!allAreas.length) {
    let allAreas = UserConfiguration.getDefinedAreas()
    if (!allAreas.length) {
      const activeArea = UserConfiguration.getActiveArea()
      if (activeArea) {
        allAreas = [activeArea]
      }
    }
    for (let i in allAreas) {
      await store.dispatch('areas/setArea', allAreas[i])
    }
  }
  UserConfiguration.removeActiveArea()
  UserConfiguration.removeDefinedAreas()
}

/**
 *  The active base map is now the object and not only the URL
 */
const updateBaseMap = async () => {
  let baseMap = UserConfiguration.getActiveBaseMapLayer()
  await store.dispatch('baseMaps/setAll')
  const allBaseMaps = store.state.baseMaps.all
  if (typeof baseMap === 'string') {
    baseMap = allBaseMaps.find(b => b.url === baseMap)
  }
  if (!baseMap || !baseMap.hasOwnProperty('url')) {
    baseMap = allBaseMaps[0]
  }
  await store.dispatch('baseMaps/setActive', baseMap)
  UserConfiguration.removeActiveBaseMapLayer()
}

const updateDashboards = async () => {
  if (!store.state.dashboards.all.length) {
    let dashboards = UserConfiguration.getDashboards()
    for (let i in dashboards) {
      await store.dispatch('dashboards/setDashboard', dashboards[i])
    }
  }
  UserConfiguration.removeDashboards()
}

const updateDisplayedLayers = async () => {
  if (!store.state.displayedLayers.all.length) {
    let selectedLayers = UserConfiguration.getSelectedLayers()
    for (let i in selectedLayers) {
      await store.dispatch('displayedLayers/addDisplayed', selectedLayers[i])
    }
  }
  UserConfiguration.removeSelectedLayers()
}

export default async function () {
  await updateAreas()
  await updateBaseMap()
  await updateDashboards()
  await updateDisplayedLayers()

  UserConfiguration.removeDisplayHelp()
  UserConfiguration.removeUpdateIndex()
}
