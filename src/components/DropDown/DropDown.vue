<template>
  <div class="dropdown-menu shadow show">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'DropDown',
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
