<template>
  <div class="container-fluid mx-3">
    <div class="row" :class="{'is-dragging': isDragging}">
      <div class="p-0" v-for="(col, key) in dashboard.layout.columns" :key="key" :class="col.class">
        <Container :group-name="`dashboard-${dashboard.id}`" drag-handle-selector=".drag-handler"
            @drag-start="onDragStart"
            @drag-end="onDragEnd"
            @drop="onDrop(key, $event)">
          <Draggable v-for="widget in colFilter(dashboard.widgets, key)" :key="widget.id">
            <div class="draggable-item" :widget-id="widget.id">
              <DashboardWidget v-bind:cardConfiguration="widget" :widget-id="`dashboard${dashboard.id}-widget${widget.id}`" @edit="$emit('edit', widget)" @delete="$emit('delete', widget)" v-bind:selectedArea="selectedArea"></DashboardWidget>
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

const applyDrag = (list, colIndex, widgetId, addedIndex) => {
  let from = list.findIndex(w => w.id === widgetId)
  list[from].colIndex = colIndex

  // Calculate the destination
  let to = 0
  // If no addedIndex ==> first
  if (addedIndex) {
    let curIndex = -1
    to = list.findIndex(w => {
      if (w.colIndex === colIndex) {
        curIndex++
      }
      return curIndex === addedIndex
    })
    if (to === -1) {
      to = list.length
    }
  }

  list.splice(to, 0, list.splice(from, 1)[0])
  return list
}

export default {
  name: 'DragDropWidgets',
  props: ['dashboard', 'selectedArea'],
  components: { Container, Draggable, DashboardWidget },
  data () {
    return {
      isEditable: true,
      isDragging: false
    }
  },
  methods: {
    onDrop (colIndex, dropResult) {
      const addedIndex = dropResult.addedIndex
      if (addedIndex !== null) {
        this.dashboard.widgets = applyDrag(this.dashboard.widgets, colIndex, Number.parseInt(dropResult.droppedElement.getAttribute('widget-id')), addedIndex)
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
    }
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
