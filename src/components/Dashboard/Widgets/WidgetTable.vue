<template>
  <div class="card-body p-0">
    <grid-content
      :lines="config.lines"
      :columns="config.columns"
      :sortable="true">
    </grid-content>
    <div class="border-top mx-2 mt-1" v-if="config.description">
      <div class="widget-description px-3 py-1 mb-0">{{ config.description }}</div>
    </div>
  </div>
</template>

<script>
import GridContent from './../GridContent'

export default {
  name: 'WidgetTable',
  components: { GridContent },
  props: [
    'config'
  ]
}
</script>
