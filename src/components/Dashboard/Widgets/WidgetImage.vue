<template>
  <img class="w-100" :src="src">
</template>

<script>

export default {
  name: 'WidgetImage',
  props: [
    'src'
  ]
}
</script>
