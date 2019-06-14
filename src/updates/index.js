import UserConfiguration from '@/store/userConfiguration'
import store from '@/store'

import Areas from './areas'
import BaseMaps from './baseMaps'
import Dashboards from './dashboards'
import DisplayedLayers from './displayedLayers'

export default async function () {
  await Areas(store)
  await BaseMaps(store)
  await Dashboards(store)
  await DisplayedLayers(store)

  UserConfiguration.removeDisplayHelp()
  UserConfiguration.removeUpdateIndex()
}
