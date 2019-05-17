<template>
  <div class="container-fluid mx-3">
    <div class="row" :class="{'is-dragging': isDragging}">
      <div class="p-0" v-for="(col, key) in dashboard.layout.columns" :key="key" :class="col.class">
        <div v-if="readOnly">
          <DashboardWidget v-for="widget in colFilter(dashboard.widgets, key)" :key="widget.id"
              v-bind:cardConfiguration="widget"
              :widget-id="`dashboard${dashboard.id}-widget${widget.id}`"
              read-only="true">
          </DashboardWidget>
        </div>
        <Container :group-name="`dashboard-${dashboard.id}`" drag-handle-selector=".drag-handler"
            @drag-start="onDragStart"
            @drag-end="onDragEnd"
            @drop="onDrop(key, $event)"
            v-else>
          <Draggable v-for="widget in colFilter(dashboard.widgets, key)" :key="widget.id">
            <div class="draggable-item" :widget-id="widget.id">
              <DashboardWidget v-bind:cardConfiguration="widget" :widget-id="`dashboard${dashboard.id}-widget${widget.id}`" @edit="$emit('edit', widget)" @delete="$emit('delete', widget)"></DashboardWidget>
            </div>
          </Draggable>
        </Container>
      </div>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import DashboardWidget from '@/components/Dashboard/DashboardWidget'

import { mapActions } from 'vuex'

export default {
  name: 'DragDropWidgets',
  props: ['dashboard', 'readOnly'],
  components: { Container, Draggable, DashboardWidget },
  data () {
    return {
      isDragging: false
    }
  },
  methods: {
    onDrop (colIndex, dropResult) {
      const addedIndex = dropResult.addedIndex
      if (addedIndex !== null) {
        this.orderWidgets({colIndex, widgetId: Number.parseInt(dropResult.droppedElement.getAttribute('widget-id')), addedIndex})
      }
    },
    colFilter (list, col) {
      return list.filter(w => {
        w.colIndex = w.colIndex || 0
        return w.colIndex === col
      })
    },
    onDragStart (dragResult) {
      this.isDragging = true
    },
    onDragEnd (dragResult) {
      this.isDragging = false
    },
    ...mapActions('dashboards', [
      'orderWidgets'
    ])
  }
}
</script>

<style lang="scss">
.smooth-dnd-container {
  min-height: 100%;
}
.is-dragging {
  min-height: calc(100% + 300px);
}
</style>
