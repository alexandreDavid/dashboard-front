<template>
  <div id="dashboard-list" class="container mt-2">
    <div class="row border-bottom">
      <div class="p-2 col-12">
        <button type="button" id="add-dashboard-button" class="btn btn-secondary col-12" @click="$emit('newDashboard')"><font-awesome-icon icon="plus" /> Add a new dashboard</button>
      </div>
      <h5 class="col-12 my-2">
        My dashboards
      </h5>
      <ul class="nav flex-column nav-pills col-12 px-2 pb-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <li class="nav-item" v-for="dashboard in dashboards" :key="dashboard.id" @click="setActive(dashboard)">
          <a class="nav-link" href="#" v-bind:class="{active: (selectedDashboard.id === dashboard.id)}">{{ dashboard.title }}</a>
        </li>
      </ul>
    </div>
    <div class="row border-bottom">
      <h5 class="col-12 my-2">
        Shared with me
      </h5>
      <ul class="nav flex-column nav-pills col-12 px-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <li class="nav-link" v-if="!sharedDashboards.length">-</li>
        <li class="nav-item" v-for="dashboard in sharedDashboards" :key="dashboard.id" @click="setActive(dashboard)">
          <a class="nav-link" href="#" v-bind:class="{active: (selectedDashboard.id === dashboard.id)}">{{ dashboard.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DashboardList',
  computed: mapState({
    dashboards: state => state.dashboards.all,
    sharedDashboards: state => state.dashboards.shared,
    selectedDashboard: state => state.dashboards.active
  }),
  methods: {
    ...mapMutations('dashboards', ['setActive'])
  }
}
</script>
