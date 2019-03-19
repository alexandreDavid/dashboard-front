export const init = ({ dispatch }) => {
  dispatch('areas/init')
  dispatch('baseMaps/init')
  dispatch('settings/init')
}
