<template>
  <transition name="sidebar">
    <div class="sidebar d-flex flex-column" v-bind:class="[{static: isStatic}, position]">
      <div class="p-2 d-flex" v-if="!isStatic">
        <h4 class="flex-grow-1">{{ title }}</h4>
        <button type="button" class="close" aria-label="Close" @click="$emit('close')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="flex-grow-1 position-relative">
        <div class="sidebar-container p-2">
          <slot></slot>
        </div>
      </div>
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
    },
    title: {
      type: String
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
