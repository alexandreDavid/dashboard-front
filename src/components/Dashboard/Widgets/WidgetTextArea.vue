<template>
<div class="card-body">
  <pre class="mb-0 widget-description">{{ config.description }}</pre>
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
