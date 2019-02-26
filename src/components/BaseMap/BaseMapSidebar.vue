<template>
  <SideBar @close="close()" position="bottom" title="Base map selection" class="p-0 shadow-top">
    <div class="h-100 d-flex" v-if="isLoaded">
      <div v-for="(baseMap, key) in allBaseMaps" :key="key" class="p-1 col-3 base-map-container" @click="selectBaseMap(baseMap)">
        <div class="card text-center h-100" v-bind:class="{'bg-primary text-white': activeBaseMap.url === baseMap.url}">
          <div class="card-body p-1 d-flex flex-column">
            <mini-map class="w-100 h-100 border position-relative base-map" :minimapKey="`basemap-${key}`" :areaLayer="areaLayer" :baseLayer="baseMap"></mini-map>
            <span class="p-1">{{ baseMap.label }}</span>
          </div>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </SideBar>
</template>

<script>
import mixin from './BaseMapMixin.js'

import SideBar from '@/components/SideBar/SideBar'

export default {
  name: 'BaseMapSidebar',
  components: { SideBar },
  mixins: [mixin],
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.base-map-container {
  min-width: 200px;

  .card {
    cursor: pointer;

    &:hover {
      background-color: var(--light);
    }
  }
}
</style>
