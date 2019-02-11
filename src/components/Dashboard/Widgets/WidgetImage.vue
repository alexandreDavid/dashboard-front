<template>
  <div class="card-body p-0">
    <img class="w-100" :src="config.src">
    <pre v-if="config.description" class="widget-description px-3 py-1 mb-0">{{ config.description }}</pre>
  </div>
</template>

<script>

export default {
  name: 'WidgetImage',
  props: [
    'config'
  ]
}
</script>
