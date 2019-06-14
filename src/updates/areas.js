import UserConfiguration from '@/store/userConfiguration'

/**
 *  Areas are now multiple
 */
export default async (store) => {
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
