<template>
  <div class="graph-serie">
    <div class="d-flex border p-2 mb-2">
      <div class="flex-grow-1">
        <span class="align-middle">{{ serie.title || (serie.selectedParameter && serie.selectedParameter.displayName) }}</span>
      </div>
      <button type="button" class="btn btn-secondary btn-sm" @click="edit()">Edit</button>
    </div>
    <modal v-if="showModal" @close="stopEdition()">
      <div slot="header" class="w-100">
        <input type="text" v-model="serie.title" class="form-control" id="title" placeholder="title">
      </div>
      <div slot="body">
        <div class="form-group">
          <select class="form-control" v-model="serie.selectedParameter">
            <option v-for="(param, key) in allParameters" :key="key" v-bind:value="param">
              {{ param.displayName }}
            </option>
          </select>
        </div>
        <button type="button" class="btn btn-danger" @click="remove()"><font-awesome-icon icon="trash" /> Delete</button>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal/Modal'

export default {
  name: 'GraphSerie',
  inject: ['getParameters'],
  components: {
    Modal
  },
  props: {
    serie: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showModal: false,
      allParameters: []
    }
  },
  created () {
    this.allParameters = this.getParameters()
    this.serie.selectedParameter = this.serie.selectedParameter || this.allParameters[0]
    this.showModal = true
  },
  methods: {
    stopEdition () {
      this.showModal = false
      this.$emit('edited')
    },
    remove () {
      this.showModal = false
      this.$emit('remove')
    },
    edit () {
      this.showModal = true
    }
  }
}
</script>
