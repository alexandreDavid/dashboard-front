<template>
<div class="card-body">
  <pre class="mb-0">{{ textArea }}</pre>
</div>
</template>

<script>

export default {
  name: 'WidgetTextArea',
  props: [
    'textArea'
  ]
}
</script>
