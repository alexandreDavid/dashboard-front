<template>
  <div id="top-content" class="over-map">
    <div class="over-map-left">
      <SearchLocationResult v-if="searchLocationResult" v-bind:searchLocationResult="searchLocationResult"></SearchLocationResult>
      <div class="d-flex flex-nowrap position-relative">
        <div class="order-2 p-1 flex-grow-1"><SearchLocation @input="onSearchLocationSelected" v-bind:class="{shadow: !searchLocationResult}"></SearchLocation></div>
        <div class="order-1 p-1"><img src="@/assets/logo.png" style="height: 36px;"></div>
        <div class="order-3 p-1">
          <button type="button" class="btn btn-primary align-top" v-bind:class="{shadow: !searchLocationResult}" @click="zoomToCurrentLocation()" v-if="hasCurrentLocation"><font-awesome-icon :icon="iconLocate" /></button>
        </div>
        <div class="order-4 p-1 d-block d-sm-none">
          <button type="button" @click="showSidebar = true" class="btn btn-primary d-inline-block d-sm-none align-top" v-bind:class="{shadow: !searchLocationResult}"><font-awesome-icon :icon="iconMenu" /></button>
          <SideBar v-if="showSidebar" @close="showSidebar = false" position="right" class="p-2">
            <button @click="$router.push({ name: 'Settings' })" class="btn btn-secondary mb-2"><font-awesome-icon :icon="iconSettings" /> Settings</button>
            <div class="card">
              <h5 class="card-header">Forecast model parameters</h5>
              <div class="card-body">
                <ForecastSelection></ForecastSelection>
              </div>
            </div>
          </SideBar>
        </div>
      </div>
    </div>
    <div class="over-map-right d-none d-sm-block">
      <Managing/>
    </div>
  </div>
</template>

<script>
import SearchLocation from './SearchLocation/SearchLocation'
import Managing from './Managing/Managing'
import MapObj from '@/map'
import ForecastSelection from './Managing/ForecastSelection/ForecastSelection'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faLocationArrow from '@fortawesome/fontawesome-free-solid/faLocationArrow'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faCog from '@fortawesome/fontawesome-free-solid/faCog'

export default {
  name: 'TopContent',
  components: {
    SearchLocation,
    SearchLocationResult: () => import('./SearchLocationResult/SearchLocationResult'),
    Managing,
    FontAwesomeIcon,
    SideBar: () => import('@/components/SideBar/SideBar'),
    ForecastSelection
  },
  computed: {
    iconLocate () {
      return faLocationArrow
    },
    iconMenu () {
      return faBars
    },
    iconSettings () {
      return faCog
    }
  },
  async created () {
    this.hasCurrentLocation = await MapObj.setCurrentLocationLayer()
  },
  data () {
    return {
      searchLocationResult: '',
      hasCurrentLocation: false,
      showSidebar: false
    }
  },
  methods: {
    onSearchLocationSelected (newValue) {
      this.searchLocationResult = newValue
    },
    zoomToCurrentLocation () {
      MapObj.zoomToCurrentLocation()
    }
  }
}
</script>
