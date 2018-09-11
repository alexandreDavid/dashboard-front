<template>
  <transition name="sidebar">
    <div class="sidebar" v-bind:class="[{static: isStatic}, position]">
      <div class="d-flex flex-column h-100">
        <div class="p-2 flex-shrink-1 dismiss" v-if="!isStatic">
          <button type="button" class="close" aria-label="Close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="h-100 position-relative">
          <div class="sidebar-container p-2">
            <slot></slot>
          </div>
        </div>
      </div>
        <!-- <div class="dismiss flex-shrink-1 bg-secondary flex-shrink-1 order-1 sticky-top shadow">
          <button type="button" class="closeclose" aria-label="Close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="position-relative h-100 order-2">
          <div id="page-container"></div> -->
        <!-- <div class="sidebar-container p-2 h-100"> -->
          <!-- <slot></slot> -->
        <!-- </div> -->
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Sidebar',
  props: {
    position: {
      type: String,
      default: 'left'
    },
    isStatic: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickOutside (evt) {
      if (!this.$el.contains(evt.target)) {
        this.$emit('close')
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
