<template>
  <div class="card-body p-0">
    <img class="w-100" :src="src">
  </div>
</template>

<script>

export default {
  name: 'WidgetImage',
  props: [
    'src'
  ]
}
</script>
