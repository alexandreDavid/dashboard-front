<template>
<div class="card-body">
  <div class="mb-0 widget-description">{{ config.description }}</div>
</div>
</template>

<script>

export default {
  name: 'WidgetTextArea',
  props: [
    'config'
  ]
}
</script>
