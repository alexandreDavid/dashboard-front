import Vue from 'vue'

export const Modal = Vue.component('Modal', {
  template: '#modal-template',
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
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickOutside)
  }
})
