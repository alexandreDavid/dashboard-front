export const init = async ({ dispatch }) => {
  await dispatch('areas/init')
  await dispatch('baseMaps/init')
  await dispatch('dashboards/init')
  await dispatch('settings/init')
}
