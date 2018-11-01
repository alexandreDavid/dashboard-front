<template>
  <modal @close="close()">
    <div slot="header" class="w-100">
      <input type="text" v-model="editedCard.title" class="form-control" id="title" placeholder="title">
    </div>
    <div slot="body">
      <div class="form-group">
        <label>Size</label>
        <div class="w-100 btn-group btn-group-sm change-selected-size" role="group">
          <button type="button" @click="changeSelectedSize(size)" class="btn btn-secondary" v-for="size in sizes" :key="size.id" v-bind:class="{active: size.id === activeSize.id}">
            {{size.label}}
          </button>
        </div>
      </div>
      <div class="form-group">
        <label>Height</label>
        <div class="w-100 btn-group btn-group-sm change-selected-height" role="group">
          <button type="button" @click="changeSelectedHeight(height)" class="btn btn-secondary" v-for="height in containerHeights" :key="height.id" v-bind:class="{active: height.id === activeHeight.id}">
            {{height.label}}
          </button>
        </div>
      </div>
      <div class="form-group">
        <label>Presentation format</label>
        <select class="form-control change-selected-widget" v-model="activeWidget" @change="changeSelectWidget(activeWidget)">
          <option v-for="widget in widgets" :key="widget.id" v-bind:value="widget">
            {{ widget.label }}
          </option>
        </select>
      </div>
      <div class="form-group" v-if="editedCard.widget && editedCard.widget.formFields" v-for="formField in editedCard.widget.formFields" :key="formField.id">
        <label>{{ formField.label }}</label>
        <select class="form-control" v-if="formField.type === 'select'" v-model="formField.value" @change="formField.onChange && formField.onChange(editedCard)">
          <option v-for="(option, key) in formField.options" :key="key" v-bind:value="option">
            {{ option.label }}
          </option>
        </select>
        <textarea class="form-control" v-if="formField.type === 'textarea'" v-model="formField.value"></textarea>
      </div>
      <button type="button" class="btn btn-danger delete" @click="$emit('delete')"><font-awesome-icon icon="trash" /> Delete</button>
      <button type="button" class="btn btn-success" @click="$emit('close')"><font-awesome-icon icon="check" /> Apply</button>
    </div>
  </modal>
</template>

<script>
import Loading from '@/components/Loading/Loading'
import Dashboard from '@/store/dashboard'
import Modal from '@/components/Modal/Modal'

export default {
  name: 'DashboardCardModal',
  components: {
    Loading,
    Modal
  },
  props: [
    'editedCard'
  ],
  data () {
    return {
      sizes: Dashboard.getCardWidths(),
      activeSize: {},
      containerHeights: Dashboard.getCardHeights(),
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
    changeSelectWidget (widget) {
      this.editedCard.widget = widget
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
