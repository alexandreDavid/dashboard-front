<template>
  <div class="card-body p-0 m-auto">
    <img style="max-width: 100%; height: auto;" :src="config.src">
    <div v-if="config.description" class="widget-description px-3 py-1 mb-0">{{ config.description }}</div>
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
