import UserConfiguration from '@/store/userConfiguration'

/**
 * Switching about the default base map
 */
export default function () {
  const baseMap = UserConfiguration.getActiveBaseMapLayer()
  if (!baseMap || !baseMap.includes('https') || baseMap === 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png') {
    UserConfiguration.setActiveBaseMapLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png')
  }
}
