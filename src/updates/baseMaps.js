import UserConfiguration from '@/store/userConfiguration'
import store from '@/store'

/**
 *  The active base map is now the object and not only the URL
 */
export default async () => {
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
