<template>
  <div class="card h-100">
    <div class="card-header">
      Models
    </div>
    <div class="card-body position-relative">
      <div class="d-flex flex-wrap justify-content-center justify-content-md-start">
        <div class="card h-100 m-2 model-card" v-for="(model, key) in models" :key="key" v-bind:class="{maximize: model.maximize}">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <span class="w-100">{{ model.label }}</span>
              </div>
              <div>
                <button type="button" v-if="model.maximize" class="btn btn-light btn-sm ml-2 edit" @click="minimizeModel(model)"><font-awesome-icon :icon="iconWindowRestore" /></button>
                <button type="button" v-else class="btn btn-light btn-sm ml-2 edit" @click="maximizeModel(model)"><font-awesome-icon :icon="iconWindowMaximize" /></button>
                </div>
            </div>
          </div>
          <div class="card-body position-relative">
            <MiniMap v-if="!model.maximize" :minimapKey="key" v-bind:parameter="model.param"></MiniMap>
            <div v-else style="
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;">
              <div :id="`map-container${model.label}`" class="h-100 w-100"></div>
              <!-- <Popup /> -->
              <div class="over-map">
                <div class="over-map-right over-map-control">
                  <img v-bind:src="model.legendUrl">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card h-100 m-2 add-model" v-if="availableModels.length">
          <div class="m-auto text-center">
            <div class="font-weight-bold">Add a model</div>
            <font-awesome-icon :icon="iconPlus" class="fa-3x"></font-awesome-icon>
            <select class="custom-select" v-model="model2Add" @change="selectModel2Add(model2Add)">
              <option v-for="(model, key) in availableModels" :key="key" :value="model">{{ model.label }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import MiniMap from '@/components/Map/MiniMap'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import { faWindowMaximize, faWindowRestore } from '@fortawesome/free-regular-svg-icons'
import FutureClimateModels from '@/store/futureClimateModels'
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'
import DisplayedLayer from '@/store/displayedLayer'

export default {
  name: 'FutureClimateModels',
  components: {
    Legend,
    MiniMap,
    FontAwesomeIcon
  },
  props: ['variable', 'period', 'timePeriod'],
  data () {
    return {
      model2Add: false,
      availableModels: [],
      models: [],
      miniMap: []
    }
  },
  computed: {
    iconPlus () {
      return faPlus
    },
    iconWindowMaximize () {
      return faWindowMaximize
    },
    iconWindowRestore () {
      return faWindowRestore
    }
  },
  mounted () {
    this.availableModels = FutureClimateModels.getAllModelsByType('CMIP5')
    this.availableModels.filter(m => m.default).forEach(this.addModel)
  },
  methods: {
    addModel (model) {
      this.models.push({
        label: model.label,
        name: model.name,
        maximize: false,
        param: {
          layerUrl: `http://18.130.18.23:8180/geoserver/${model.name}/ows`,
          layerParameters: {
            layers: `${model.name}:${model.name}_${this.variable}anom_${this.timePeriod.value}_${this.period}`,
            format: 'image/png',
            transparent: true
          }
        },
        legendUrl: `http://18.130.18.23:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=${model.styleName}`
      })
      const modelIdx = this.availableModels.findIndex(m => m.label === model.label)
      if (modelIdx !== -1) {
        this.availableModels.splice(modelIdx, 1)
      }
    },
    reloadModels () {
      const savedModels = this.models
      this.models = []
      savedModels.forEach(this.addModel)
      // this.models.forEach(m => {
      //   m.param = {
      //     layerUrl: `http://18.130.18.23:8180/geoserver/${m.name}/ows`,
      //     layerParameters: {
      //       layers: `${m.name}:${m.name}_${this.variable}anom_${this.timePeriod}_${this.period}`,
      //       format: 'image/png',
      //       transparent: true
      //     }
      //   }
      // })
    },
    selectModel2Add (model) {
      if (model) {
        this.addModel(model)
        this.model2Add = false
      }
    },
    maximizeModel (model) {
      model.maximize = true
      this.$nextTick(function () {
        let map = new MapObj(`map-container${model.label}`)
        new AreaLayer(map, {id: 7552})
        new DisplayedLayer(map, model.param)
      })
    },
    minimizeModel (model) {
      model.maximize = false
    }
  },
  watch: {
    variable () {
      this.reloadModels()
    },
    period: 'reloadModels',
    timePeriod: 'reloadModels'
  }
}
</script>

<style lang="scss" scoped>

.model-card, .add-model {
  min-height: 200px;
  min-width: 200px;

  &.maximize {
    min-height: 400px;
    width: 400px;
  }
}

.add-model {
  border: 4px dashed var(--dark);
  opacity: 0.125;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
}
</style>
