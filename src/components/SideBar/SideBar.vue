<template>
  <transition name="sidebar">
    <div class="sidebar" v-bind:class="position">
        <div class="dismiss">
          <button type="button" class="close" aria-label="Close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="sidebar-container">
          <slot></slot>
        </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Sidebar',
  props: {
    position : {
      type: String,
      default: 'left'
    }
  },
  methods: {
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.$emit('close')
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
