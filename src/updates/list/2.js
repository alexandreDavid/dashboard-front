import UserConfiguration from '@/store/userConfiguration'
import store from '@/store'

/**
 *  Areas are now multiple
 */
const updateAreas = () => {
  const allAreas = store.state.areas.all
  if (!allAreas.length) {
    let activeArea = UserConfiguration.getActiveArea()
    if (activeArea) {
      activeArea.idArea = activeArea.id
      activeArea.id = 1
      activeArea.active = true
      store.dispatch('areas/setAll', [activeArea])
    } else {
      UserConfiguration.removeDisplayHelp()
    }
  }
  UserConfiguration.removeActiveArea()
}

/**
 *  The active base map is now the object an not only the URL
 */
const updateBaseMap = () => {
  let baseMap = UserConfiguration.getActiveBaseMapLayer()
  const allBaseMaps = store.getters['baseMaps/all']
  if (typeof baseMap === 'string') {
    baseMap = allBaseMaps.find(b => b.url === baseMap)
  }
  if (!baseMap || !baseMap.hasOwnProperty('url')) {
    baseMap = allBaseMaps[0]
  }

  store.dispatch('baseMaps/setActive', baseMap)
}

export default function () {
  updateAreas()
  updateBaseMap()
}
