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
  }
})
