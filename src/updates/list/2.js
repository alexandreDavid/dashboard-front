import UserConfiguration from '@/store/userConfiguration'
import store from '@/store'

/**
 *  The active base map is now the object an not only the URL
 */
export default function () {
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
