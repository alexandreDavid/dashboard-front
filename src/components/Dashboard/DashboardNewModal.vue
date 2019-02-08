<template>
  <modal @close="close">
    <div slot="header">
      New dashboard
    </div>
    <div slot="body">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" v-model="title" class="form-control" id="name" placeholder="Name">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="description" class="form-control" id="description" placeholder="description"></textarea>
      </div>
      <div class="form-group">
        <label>Template</label>
        <div class="d-flex flex-wrap">
          <button type="button" class="btn btn-secondary d-flex m-2" @click="template = 'blank'" :class="{active: template === 'blank'}" style="height: 150px;">
            <div class="d-flex border" style="width: 150px; height: 100px;">
              <div class="p-1 col-6" style="height: 34px;">
                <div class="border h-100" style="border-style:dotted !important;"></div>
              </div>
              <div class="p-1 col-6" style="height: 34px;">
                <div class="border h-100" style="border-style:dotted !important;"></div>
              </div>
            </div>
            <span class="align-self-center ml-3">Blank canvas</span>
          </button>
          <button type="button" class="btn btn-secondary d-flex m-2" @click="template = 'starter'" :class="{active: template === 'starter'}" style="height: 150px;">
            <div class="d-flex align-content-start flex-wrap border" style="width: 150px; height: 100px;">
              <div class="p-1 col-6">
                <div class="border h-100">
                  <font-awesome-icon icon="map" />
                </div>
              </div>
              <div class="p-1 col-6">
                <div class="border h-100">
                  <font-awesome-icon icon="chart-bar" />
                </div>
              </div>
              <div class="p-1 col-6">
                <div class="border h-100">
                  <font-awesome-icon icon="chart-pie" />
                </div>
              </div>
              <div class="p-1 col-6">
                <div class="border h-100">
                  <font-awesome-icon icon="image" />
                </div>
              </div>
            </div>
            <span class="align-self-center ml-3">Starter dashboard</span>
          </button>
        </div>
      </div>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
      <button type="button" class="btn btn-success" @click="validate" :disabled="!title"><font-awesome-icon icon="check" /> Create</button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'

import Dashboard from '@/store/dashboard'

export default {
  name: 'DashboardNewModal',
  components: {
    Modal
  },
  data () {
    return {
      title: '',
      description: '',
      template: 'blank'
    }
  },
  mounted () {
  },
  methods: {
    validate () {
      let config = {
        title: this.title,
        description: this.description,
        layout: Dashboard.getLayouts().find(l => l.default)
      }

      if (this.template !== 'blank') {
        config.widgets = [
          {
            id: 1,
            colIndex: 0,
            heightClass: 'height-medium',
            resource: {
              id: 1,
              label: 'Temperature (2-day)'
            },
            title: 'Temperature (2-day)',
            type: 'map',
            widthClass: 'col-12'
          },
          {
            id: 2,
            colIndex: 1,
            heightClass: 'height-medium',
            resource: {
              id: 1,
              label: 'Temperature (2-day)'
            },
            title: 'Temperature (2-day)',
            type: 'graph',
            widthClass: 'col-12'
          },
          {
            id: 3,
            colIndex: 0,
            heightClass: 'height-medium',
            resource: {
              id: 2,
              label: 'Total rainfall Rate (2-day)'
            },
            title: 'Total rainfall Rate (2-day)',
            type: 'map',
            widthClass: 'col-12'
          },
          {
            id: 4,
            colIndex: 1,
            heightClass: 'height-medium',
            resource: {
              id: 2,
              label: 'Total rainfall Rate (2-day)'
            },
            title: 'Total rainfall Rate (2-day)',
            type: 'graph',
            widthClass: 'col-12'
          }
        ]
      }
      this.$emit('validate', config)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
