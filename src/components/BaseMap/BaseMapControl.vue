<template>
  <div>
    <div class="h-100 d-flex flex-wrap" v-if="isLoaded">
      <div v-for="(baseMap, key) in allBaseMaps" :key="key" class="p-1 col-6" @click="selectBaseMap(baseMap)">
        <div class="card text-center" v-bind:class="{'bg-primary text-white': activeBaseMap.url === baseMap.url}">
          <div class="card-body p-1">
            <mini-map class="w-100 border position-relative base-map" :minimapKey="`basemap-${key}`" :areaLayer="areaLayer" :baseLayer="baseMap"></mini-map>
            <small>{{ baseMap.label }}</small>
          </div>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import mixin from './BaseMapMixin.js'

export default {
  name: 'BaseMapControl',
  mixins: [mixin]
}
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
}

.base-map {
  height: 100px;
}
</style>
