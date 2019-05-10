import MiniMap from '@/components/Map/MiniMap'
import AreaLayer from '@/store/areaLayer'
import Loading from '@/components/Loading/Loading'

import { mapState } from 'vuex'

export default {
  components: { MiniMap, Loading },
  computed: {
    ...mapState({
      activeBaseMap: state => state.baseMaps.active,
      allBaseMaps: state => state.baseMaps.all
    })
  },
  data () {
    return {
      isLoaded: false,
      areaLayer: false
    }
  },
  async created () {
    this.areaLayer = new AreaLayer()
    await this.areaLayer.setSelectedArea({idArea: 7552})
    this.isLoaded = true
  },
  methods: {
    selectBaseMap (selectedBaseMap) {
      this.$store.dispatch('baseMaps/setActive', selectedBaseMap)
    }
  }
}
