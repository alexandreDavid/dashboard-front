<template>
  <div class="card h-100">
    <div class="card-header">
      Models
    </div>
    <div class="card-body position-relative">
      <div class="btn-group ml-2 mb-2" role="group" aria-label="unit">
        <button type="button" @click="selectModelType(modelType)" class="btn btn-primary" v-for="modelType in modelTypes" :key="modelType.value" v-bind:class="{active: modelType === selectedModelType}">
          {{modelType.label}}
        </button>
      </div>
      <div class="d-flex flex-wrap justify-content-center justify-content-md-start" v-if="isLoaded">
        <div class="card h-100 m-2 model-card" v-for="(model, key) in models" :key="key" v-bind:class="{maximize: model.maximize}">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <span class="w-100">{{ model.label }}</span>
              </div>
              <div>
                <button type="button" v-if="model.maximize" class="btn btn-light btn-sm ml-2 edit" @click="minimizeModel(model)"><font-awesome-icon icon="window-restore" /></button>
                <button type="button" v-else class="btn btn-light btn-sm ml-2 edit" @click="maximizeModel(model)"><font-awesome-icon icon="window-maximize" /></button>
                </div>
            </div>
          </div>
          <div class="card-body position-relative">
            <MiniMap :minimapKey="key" v-bind:parameter="model.param" v-bind:interactive="model.maximize"  v-bind:areaLayer="areaLayer"></MiniMap>
          </div>
        </div>
        <div class="m-2">
          <button type="button" class="btn btn-primary" id="add-card" @click="openModelModal()"><font-awesome-icon icon="plus" /> Add a model</button>
          <modal v-if="displayModelModal === true" @close="displayModelModal = false">
            <div slot="body" class="graph-modal-content">
              <div class="form-group">
                <label for="add-model">Select a model to add</label>
                <select id="add-model" class="custom-select" v-model="model2Add">
                  <option v-for="(model, key) in availableModels" :key="key" :value="model">{{ model.label }}</option>
                </select>
              </div>
              <button type="button" class="btn btn-secondary" @click="displayModelModal = false">Cancel</button>
              <button type="button" class="btn btn-primary" v-bind:disabled="!model2Add" @click="selectModel2Add(model2Add)">Apply</button>
            </div>
          </modal>
        </div>
      </div>
      <Loading v-else/>
    </div>
  </div>
</template>

<script>
import MiniMap from '@/components/Map/MiniMap'
import FutureClimateModels from '@/store/futureClimateConfiguration'
import AreaLayer from '@/store/areaLayer'
import Loading from '@/components/Loading/Loading'
import Modal from '@/components/Modal/Modal'

export default {
  name: 'FutureClimateModels',
  components: {
    MiniMap,
    Loading,
    Modal
  },
  props: ['variable', 'period', 'timePeriod'],
  data () {
    return {
      model2Add: false,
      modelTypes: false,
      selectedModelType: false,
      availableModels: [],
      models: [],
      miniMap: [],
      areaLayer: false,
      isLoaded: false,
      displayModelModal: false
    }
  },
  async mounted () {
    this.modelTypes = FutureClimateModels.getAllModelTypes()
    this.selectModelType(this.modelTypes[0])
    this.areaLayer = new AreaLayer()
    await this.areaLayer.setSelectedArea({id: 7552})
    this.isLoaded = true
  },
  methods: {
    selectModelType (type) {
      this.selectedModelType = type
      this.models = []
      this.availableModels = FutureClimateModels.getAllModelsByType(type.value)
      this.availableModels.filter(m => m.default).forEach(this.addModel)
    },
    setParam (model) {
      model.param = {
        layerUrl: `${process.env.GEOSERVER_URL}/wms`,
        layerParameters: {
          layers: `${model.name}:${this.variable.name}_${this.timePeriod.type}_${this.period.id}`,
          format: 'image/png',
          transparent: true
        },
        legendUrl: `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=${this.variable.styleName}`
      }
      if (this.timePeriod.value) {
        model.param.layerParameters.time = `${this.period.min}-${this.timePeriod.value}`
      }
    },
    openModelModal () {
      this.model2Add = false
      this.displayModelModal = true
    },
    addModel (model) {
      this.displayModelModal = false
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
    variable: 'reloadModels',
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
