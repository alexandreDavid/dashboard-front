<template>
  <div>
    <div class="form-group">
      <label>Size</label>
      <div class="w-100 btn-group btn-group-sm" role="group">
        <button type="button" @click="changeSelectedSize(size)" class="btn btn-secondary" v-for="size in sizes" :key="size.id" v-bind:class="{active: size.id === activeSize.id}">
          {{size.label}}
        </button>
      </div>
    </div>
    <div class="form-group">
      <label>Height</label>
      <div class="w-100 btn-group btn-group-sm" role="group">
        <button type="button" @click="changeSelectedHeight(height)" class="btn btn-secondary" v-for="height in containerHeights" :key="height.id" v-bind:class="{active: height.id === activeHeight.id}">
          {{height.label}}
        </button>
      </div>
    </div>
    <div class="form-group">
      <label>Widget</label>
      <select class="form-control" v-model="activeWidget" @change="changeSelectWidget(activeWidget)">
        <option v-for="widget in widgets" :key="widget.id" v-bind:value="widget">
          {{ widget.label }}
        </option>
      </select>
    </div>
    <div class="form-group" v-if="editedCard.widget && editedCard.widget.formFields" v-for="formField in editedCard.widget.formFields" :key="formField.id">
      <label>{{ formField.label }}</label>
      <select class="form-control" v-if="formField.type === 'select'" v-model="formField.value">
        <option v-for="option in formField.options" :key="option.id" v-bind:value="option">
          {{ option.displayName }}
        </option>
      </select>
      <textarea class="form-control" v-if="formField.type === 'textarea'" v-model="formField.value"></textarea>
    </div>
    <button type="button" class="btn btn-danger" @click="$emit('delete')"><font-awesome-icon :icon="iconRemove" /> Delete</button>
  </div>
</template>

<script>
import Loading from '@/components/Loading/Loading'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
import Dashboard from '@/store/Dashboard'

export default {
  name: 'DashboardCardModal',
  components: {
    Loading,
    FontAwesomeIcon
  },
  props: [
    'allParameters',
    'editedCard'
  ],
  computed: {
    iconRemove() {
      return faTrash
    }
  },
  data() {
    const sizes = Dashboard.getCardWidths()
    const containerHeights = Dashboard.getCardHeights()
    return {
      sizes: sizes,
      activeSize: {},
      containerHeights: containerHeights,
      activeHeight: {},
      widgets: Dashboard.getCardWidgets(),
      activeWidget: {}
    }
  },
  mounted () {
    this.activeSize = this.sizes.find((s) => s.class === this.editedCard.widthClass)
    this.activeHeight = this.containerHeights.find((s) => s.class === this.editedCard.heightClass)
    this.activeWidget = this.widgets.find((w) => w.id === this.editedCard.widget.id)
  },
  methods: {
    changeSelectedSize (size) {
      this.activeSize = size
      this.editedCard.widthClass = size.class
    },
    changeSelectedHeight (height) {
      this.activeHeight = height
      this.editedCard.heightClass = height.class
    },
    changeSelectWidget(widget) {
      this.editedCard.widget = widget
    },
    removeWidget () {
      this.$emit('remove')
    }
  }
}
</script>
