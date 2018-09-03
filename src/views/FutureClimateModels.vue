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
            <MiniMap :minimapKey="key" v-bind:parameter="model.param" v-bind:interactive="model.maximize"></MiniMap>
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
import MiniMap from '@/components/Map/MiniMap'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import { faWindowMaximize, faWindowRestore } from '@fortawesome/free-regular-svg-icons'
import FutureClimateModels from '@/store/futureClimateModels'

export default {
  name: 'FutureClimateModels',
  components: {
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
    setParam (model) {
      model.param = {
        layerUrl: `http://18.130.18.23:8180/geoserver/${model.name}/wms`,
        layerParameters: {
          layers: `${model.name}:${this.variable.name}_${this.timePeriod.type}_${this.period.id}`,
          format: 'image/png',
          transparent: true
        },
        legendUrl: `http://18.130.18.23:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=${this.variable.styleName}`
      }
      if (this.timePeriod.value) {
        model.param.layerParameters.time = `${this.period.min}-${this.timePeriod.value}`
      }
    },
    addModel (model) {
      let newModel = {
        label: model.label,
        name: model.name,
        styleName: model.styleName,
        maximize: false
      }
      this.setParam(newModel)
      this.models.push(newModel)
      const modelIdx = this.availableModels.findIndex(m => m.label === model.label)
      if (modelIdx !== -1) {
        this.availableModels.splice(modelIdx, 1)
      }
    },
    reloadModels () {
      this.models.forEach(this.setParam)
    },
    selectModel2Add (model) {
      if (model) {
        this.addModel(model)
        this.model2Add = false
      }
    },
    maximizeModel (model) {
      model.maximize = true
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
