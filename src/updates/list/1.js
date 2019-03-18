import UserConfiguration from '@/store/userConfiguration'

export default function () {
  const baseMap = UserConfiguration.getActiveBaseMapLayer()
  if (!baseMap.includes('https') || baseMap === 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png') {
    UserConfiguration.setActiveBaseMapLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png')
  }
}
