<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-dialog modal-dialog-scrollable modal-xl" role="dialog">
        <div class="modal-content shadow">
          <div class="modal-header" v-if="hasHeaderSlot">
            <slot name="header"></slot>
            <button type="button" class="close" aria-label="Close" @click="$emit('close')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body" v-if="hasBodySlot">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer" v-if="hasFooterSlot">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  computed: {
    hasHeaderSlot () {
      return !!this.$slots['header']
    },
    hasBodySlot () {
      return !!this.$slots['body']
    },
    hasFooterSlot () {
      return !!this.$slots['footer']
    }
  },
  methods: {
    handleClickOutside (evt) {
      if (this.$el === evt.target) {
        this.$emit('close')
      }
    }
  },
  mounted () {
    if (!this.$attrs.hasOwnProperty('required') || this.$attrs.required === false) {
      document.addEventListener('click', this.handleClickOutside)
    }
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
