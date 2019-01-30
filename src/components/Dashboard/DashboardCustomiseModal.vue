<template>
  <modal @close="close">
    <div slot="header">
      Customise dashboard
    </div>
    <div slot="body">
      <div class="form-group">
        <label>Layout</label>
        <div class="d-flex flex-wrap">
          <button v-for="(layout, key) in layouts" :key="key" @click="customisation.layout = layout" type="button" class="btn btn-secondary m-2" :class="{active: customisation.layout.id === layout.id}" style="width: 200px;height:100px;">
            <div class="d-flex h-100">
              <div v-for="(col, key) in layout.columns" :key="key" class="border p-1" :class="col.class">
                <small class="align-middle">{{ col.name }}</small>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div class="form-group">
        <label class="w-100">Theme</label>
        <button type="button" class="btn btn-primary">Primary</button>
        <button type="button" class="btn btn-secondary">Secondary</button>
        <button type="button" class="btn btn-success">Success</button>
        <button type="button" class="btn btn-danger">Danger</button>
        <button type="button" class="btn btn-warning">Warning</button>
        <button type="button" class="btn btn-info">Info</button>
        <button type="button" class="btn btn-light">Light</button>
        <button type="button" class="btn btn-dark">Dark</button>
      </div>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
      <button type="button" class="btn btn-success" @click="validate(customisation)"><font-awesome-icon icon="check" /> Validate</button>
    </div>
  </modal>
</template>

<script>
import Loading from '@/components/Loading/Loading'
import Modal from '@/components/Modal/Modal'

export default {
  name: 'DashboardCostumiseModal',
  components: {
    Loading,
    Modal
  },
  props: {
    dashboard: {
      required: true,
      type: Object
    }
  },
  data () {
    const sixtysix = {
      name: '66%',
      class: 'col-8'
    }
    const fifty = {
      name: '50%',
      class: 'col-6'
    }
    const thirtythree = {
      name: '33%',
      class: 'col-4'
    }
    const twentyfive = {
      name: '25%',
      class: 'col-3'
    }
    return {
      layouts: [
        {
          id: '100',
          columns: [
            {
              name: '100%',
              class: 'col-12'
            }
          ]
        },
        {
          id: '50-50',
          columns: [
            fifty,
            fifty
          ]
        },
        {
          id: '25-25-25-25',
          columns: [
            twentyfive,
            twentyfive,
            twentyfive,
            twentyfive
          ]
        },
        {
          id: '33-33-33',
          columns: [
            thirtythree,
            thirtythree,
            thirtythree
          ]
        },
        {
          id: '33-66',
          columns: [
            thirtythree,
            sixtysix
          ]
        },
        {
          id: '66-33',
          columns: [
            sixtysix,
            thirtythree
          ]
        }
      ],
      customisation: {}
    }
  },
  created () {
    this.customisation = {
      layout: this.dashboard.layout || this.layouts[0]
    }
  },
  methods: {
    validate (customisation) {
      this.$emit('validate', customisation)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
