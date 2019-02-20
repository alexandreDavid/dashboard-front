<template>
  <div class="container">
    <div class="form-group">
      <label for="name">Name <small>(required)</small></label>
      <input type="text" v-model="value.title" class="form-control" id="name" placeholder="Name">
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea v-model="value.description" class="form-control" id="description" placeholder="description"></textarea>
    </div>
    <div class="form-group">
      <label>Template</label>
      <div class="d-flex flex-wrap">
        <button type="button" class="btn btn-secondary d-flex m-2" @click="selectTemplate('blank')" :class="{active: template === 'blank'}" style="height: 150px;">
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
        <button type="button" class="btn btn-secondary d-flex m-2" @click="selectTemplate('starter')" :class="{active: template === 'starter'}" style="height: 150px;">
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
</template>

<script>
import Dashboard from '@/store/dashboard'
import DashboardTemplates from '@/store/dashboardTemplates'

export default {
  name: 'DashboardNewContainer',
  props: {
    value: {
      required: true
    }
  },
  data () {
    return {
      template: 'blank'
    }
  },
  mounted () {
    this.value.layout = Dashboard.getLayouts().find(l => l.default)
  },
  methods: {
    selectTemplate (type) {
      this.template = type
      if (type === 'blank') {
        delete this.value.widgets
      } else {
        this.value.widgets = DashboardTemplates.getStarterDashboard().widgets
      }
    }
  }
}
</script>
