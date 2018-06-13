<template>
  <div class="mb-2" v-bind:class="activeSize.class">
    <div v-bind:class="activeRatio.class">
    <div class="ratio-content">
      <div class="card h-100 flex-column">
        <div class="card-header">
          <div class="d-flex">
            <div class="flex-grow-1">
              <h5 v-if="!isEditing" class="w-100">{{title}}</h5>
              <input type="text" v-if="isEditing" v-model="title" class="form-control w-100" id="title" placeholder="title">
            </div>
            <div>
              <button type="button" class="btn btn-light ml-2" v-if="!isEditing" @click="edit()"><font-awesome-icon :icon="iconEdit" /></button>
              <button type="button" class="btn btn-light ml-2" v-if="isEditing" @click="remove()"><font-awesome-icon :icon="iconRemove" /></button>
            </div>
          </div>
        </div>
        <div class="card-body position-relative" style="overflow: auto;">
          <div v-if="isEditing">
            <div class="form-group">
              <label>Size</label>
              <div class="w-100 btn-group btn-group-sm" role="group">
                <button type="button" @click="changeSelectedSize(size)" class="btn btn-secondary" v-for="size in sizes" :key="size.id" v-bind:class="{active: size.id === activeSize.id}">
                  {{size.label}}
                </button>
              </div>
            </div>
            <div class="form-group">
              <label>Ratio</label>
              <div class="w-100 btn-group btn-group-sm" role="group">
                <button type="button" @click="changeSelectedRatio(ratio)" class="btn btn-secondary" v-for="ratio in ratios" :key="ratio.id" v-bind:class="{active: ratio.id === activeRatio.id}">
                  {{ratio.label}}
                </button>
              </div>
            </div>
            <div class="form-group">
              <label>Widget</label>
              <select class="form-control" v-model="selectedWidget">
                <option v-for="widget in widgets" :key="widget.id" v-bind:value="widget">
                  {{ widget.label }}
                </option>
              </select>
            </div>
            <div class="form-group" v-if="selectedWidget && selectedWidget.formFields" v-for="formField in selectedWidget.formFields" :key="formField.id">
              <label>{{ formField.label }}</label>
              <select class="form-control" v-if="formField.type === 'select'" v-model="formField.value">
                <option v-for="option in formField.options" :key="option.id" v-bind:value="option">
                  {{ option.displayName }}
                </option>
              </select>
            </div>
            <button @click="validEdition()" class="btn btn-primary">Validate</button>
          </div>
          <div v-else>
            <WidgetGraph v-if="selectedWidget.id === 'graph'" v-bind:area="area" v-bind:parameter="getValueForSelectedWidgetById('parameter')"></WidgetGraph>
            <WidgetMap v-if="selectedWidget.id === 'map'" v-bind:area="area" v-bind:parameter="getValueForSelectedWidgetById('parameter')" :widgetKey="widgetKey"></WidgetMap>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import WidgetGraph from './Widgets/WidgetGraph'
import WidgetMap from './Widgets/WidgetMap'
import Loading from '@/components/Loading/Loading'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'

export default {
  name: 'DashboardWidget',
  components: {
    Loading,
    WidgetGraph,
    WidgetMap,
    FontAwesomeIcon
  },
  props: [
    'allParameters',
    'selectedArea',
    'widgetKey'
  ],
  computed: {
    iconEdit() {
      return faEdit
    },
    iconRemove() {
      return faTrash
    }
  },
  data() {
    const sizes = [
      {
        id: 'XS',
        label: 'XS',
        class: 'col-md-4 col-lg-3'
      }, {
        id: 'S',
        label: 'S',
        class: 'col-md-4'
      }, {
        id: 'M',
        label: 'M',
        class: 'col-md-6'
      }, {
        id: 'L',
        label: 'L',
        class: 'col-md-8'
      }, {
        id: 'XL',
        label: 'XL',
        class: 'col-12'
      }
    ]
    const ratios = [
      {
        id: '1:1',
        label: '1:1',
        class: 'ratio-1-1'
      }, {
        id: '4:3',
        label: '4:3',
        class: 'ratio-4-3'
      }, {
        id: '3:2',
        label: '3:2',
        class: 'ratio-3-2'
      }, {
        id: '8:5',
        label: '8:5',
        class: 'ratio-8-5'
      }, {
        id: '16:9',
        label: '16:9',
        class: 'ratio-16-9'
      }
    ]
    const fieldParameter = {
      id: 'parameter',
      label: 'Parameter',
      type: 'select',
      options: this.allParameters,
      value: this.allParameters[0]
    }
    const widgets = [
      {
        id: 'graph',
        label: 'Graph',
        formFields: [fieldParameter]
      }, {
        id: 'map',
        label: 'Map',
        formFields: [fieldParameter]
      }
    ]
    return {
      isEditing: true,
      title: '',
      area: this.selectedArea,
      selectedParameter: this.allParameters[0],
      sizes: sizes,
      activeSize: sizes[2],
      ratios: ratios,
      activeRatio: ratios[0],
      widgets: widgets,
      selectedWidget: widgets[0]
    }
  },
  methods: {
    changeSelectedSize (size) {
      this.activeSize = size
    },
    changeSelectedRatio (ratio) {
      this.activeRatio = ratio
    },
    edit () {
      this.isEditing = true
    },
    remove () {},
    validEdition () {
      this.isEditing = false
    },
    getValueForSelectedWidgetById(id) {
      return this.selectedWidget.formFields.find(f => f.id === id).value
    }
  }
}
</script>

<style lang="scss" scoped>

@mixin ratio($w, $h) {
  position: relative;

  &:before {
    display: block;
    content: "";
    width: 100%;
    padding-top: ($w / $h) * 100%;
  }
  > .ratio-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
  }
}

$ratios: (1: 1, 4:3, 3:2, 8:5, 16:9);

@each $ratioH, $ratioW in $ratios {
  .ratio-#{$ratioH}-#{$ratioW} {
    @include ratio($ratioW, $ratioH);
  }
}
</style>

